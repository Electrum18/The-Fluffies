<template lang="pug">
  v-menu(
    v-model="chat.opened"
    flat
    :close-on-content-click="false"
    transition="slide-x-transition"
    origin="left bottom"
  )
    template(v-slot:activator="{ on }")
      v-btn(
        fab
        dark
        style="pointer-events: auto"
        v-on="on"
        :aria-label="$t('editor.chat.open')"
      )
        v-badge.py-2.grad
          template(v-slot:badge) {{ chat.users }}

          v-icon(
            :color="onlineStatus.color"
          ) {{ onlineStatus.icon }}

    v-card
      v-btn.grad(
        absolute
        dark
        right
        small
        style="pointer-events: none; z-index: 1"
        :aria-label="$t('editor.chat.users')"
      ) {{ chat.users }}

        v-icon(small right) {{ icons.mdiAccount }}

      v-card.chat-space(dark flat)
        v-list(dense ref="chatSpace")
          .py-3

          v-list-item(
            v-for="(mes, i) in chat.content"
            :key="'chat' + i"
            :ref="'ChatSpace' + i"
          )
            v-list-item-content
              v-card.my-n1(outlined)
                v-card-text.pa-2 #[kbd(v-if="mes.name") {{ mes.name }}] {{ mes.text }}

      v-card-actions
        v-text-field(
          v-model="chat.message"
          :label="$t('editor.chat.type')"
          :hint="chat.name"
          persistent-hint
          outlined
          counter="100"
          :append-icon="icons.mdiSend"
          @click:append="submit"
          @keyup.enter="submit"
        )

      v-overlay(
        absolute
        :value="!chat.name"
      )
        v-text-field(
          v-model="chat.prename"
          label="Outlined"
          :placeholder="$t('editor.chat.enter_name')"
          solo
          outlined
          counter="20"
          :rules="[(val) => (val || '').length > 2 || 'This field is too short']"
          :append-icon="icons.mdiSend"
          @click:append="checkName"
          @keyup.enter="checkName"
        )

      v-overlay(
        absolute
        :value="!chat.online"
      )
        v-icon(
          large
          color="red lighten-1"
        ) {{ icons.mdiWifiOff }}
</template>

<script>
import { reactive, watch, ref, computed, toRefs } from '@vue/composition-api'

import io from 'socket.io-client'

import { mdiAccount, mdiSend, mdiWifiOff, mdiMessageText } from '@mdi/js'

function defineSocket(chat) {
  const socket = ref({ on: () => undefined })

  if (process.browser) {
    const { host, hostname } = window.location

    socket.value = io(hostname === 'localhost' ? hostname + ':5000' : host)
  }

  socket.value.on('connect', () => {
    chat.online = socket.value.connected
  })

  socket.value.on('disconnect', () => {
    chat.online = socket.value.connected
  })

  socket.value.on('get first', (msg) => (chat.content = msg))
  socket.value.on('get message', (msg) => chat.content.push(msg))
  socket.value.on('get announce', (msg) => chat.content.push(msg))
  socket.value.on('get users', (users) => (chat.users = users))

  socket.value.on('isnt nickname', () => {
    chat.prename = ''
    chat.name = ''
  })

  return socket
}

function Chat(refs, chat, icons, socket) {
  function chatLength(interval = undefined) {
    setTimeout(() => {
      let length = 0

      for (let i = 0; i < chat.content.length; i++) {
        const element = refs['ChatSpace' + i][0]

        length += element.$el.offsetHeight
      }

      refs.chatSpace.$el.scrollTop = length
    }, interval)
  }

  function submit() {
    const length = chat.message.length

    if (length > 0 && length <= 100) {
      socket.value.emit('send message', {
        name: chat.name,
        text: chat.message
      })

      chat.message = ''
    }
  }

  function checkName() {
    if (chat.prename && chat.prename.length > 2) {
      socket.value.emit('check name', chat.prename)

      chat.name = chat.prename
      chat.prename = ''
    }
  }

  watch(
    () => chat.opened,
    (val) => {
      if (val) chatLength(100)
    }
  )

  watch(
    () => chat.content,
    () => {
      if (chat.opened) chatLength()
    }
  )

  const onlineStatus = computed(() => {
    return chat.online
      ? { color: 'white', icon: icons.mdiMessageText }
      : { color: 'red lighten-1', icon: icons.mdiWifiOff }
  })

  return {
    chat,
    chatLength,
    submit,
    checkName,
    onlineStatus
  }
}

export default {
  setup(_, { refs }) {
    const icons = reactive({
      mdiAccount,
      mdiSend,
      mdiWifiOff,
      mdiMessageText
    })

    const chat = reactive({
      opened: false,
      online: false,

      name: '',
      prename: '',

      message: '',

      users: 0,
      content: []
    })

    const socket = defineSocket(chat)

    return {
      icons,
      chat,
      socket,

      ...toRefs(Chat(refs, chat, icons, socket))
    }
  }
}
</script>

<style lang="sass">
.grad .v-badge__badge, button.grad
  background-image: linear-gradient(to right, #fa2, #f64)

.chat-space
  height: 75vh!important
  overflow: overlay!important

  .v-list
    height: 100%
    overflow: auto

    .v-list-item
      pointer-events: none
      width: calc(100% - 16px)
</style>
