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
          template(v-slot:badge) {{ chat.users.count }}

          v-icon(
            :color="onlineStatus.color"
          ) {{ onlineStatus.icon }}

    v-card
      v-btn.grad.my-2(
        absolute
        dark
        right
        small
        style="pointer-events: none; z-index: 1"
        :aria-label="$t('editor.chat.users')"
      ) {{ chat.users.count }}

        v-icon(small right) {{ icons.mdiAccount }}

      v-menu(
        v-model="chat.users.opened"
        flat
        :close-on-content-click="false"
        transition="slide-x-transition"
        origin="left bottom"
      )
        template(v-slot:activator="{ on }")
          v-btn.ma-2(
            absolute
            small
            fab
            style="z-index: 1"
            v-on="on"
            :aria-label="$t('editor.chat.users')"
          )
            v-icon {{ icons.mdiAccountGroup }}

        v-card
          v-virtual-scroll(
            :items="chat.users.array"
            :item-height="50"
            width="100vw"
            height=600
            max-width=300
          )
            template(v-slot="{ item }")
              v-list-item
                v-list-item-avatar
                  v-avatar(color="grey" size=64)
                    v-icon(
                      color="grey lighten-3"
                      style="width: 31px; left: 1px"
                    ) $vuetify.icons.values.pony

                v-list-item-content
                  v-btn(
                    text
                    @click="openProfile(item)"
                  ) {{ item.nickname }}

      v-card.chat-space(dark flat)
        v-list(dense ref="chatSpace")
          .py-4

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

    v-dialog(v-model="profile.opened" width="500")
      v-card(dark)
        v-card-title {{ $t('editor.profile.title') }}
          v-spacer
          v-btn.mx-n2(
            fab
            small
            @click="profile.opened = false"
            :aria-label="$t('editor.back')"
          )
            v-icon {{ icons.mdiKeyboardBackspace }}

        v-divider
        v-list-item.py-2
          v-list-item-avatar(color="grey" size=84)
            v-icon(
              color="grey lighten-3"
              style="width: 60px; left: 3px"
            ) $vuetify.icons.values.pony

          v-list-item-content.mx-2
            v-list-item-title.headline.mb-2 {{ profile.user.nickname }}
            v-list-item-subtitle \#{{ profile.user.id }}
</template>

<script>
import { reactive, watch, ref, computed } from '@vue/composition-api'

import io from 'socket.io-client'

import {
  mdiAccount,
  mdiSend,
  mdiWifiOff,
  mdiMessageText,
  mdiAccountGroup,
  mdiKeyboardBackspace
} from '@mdi/js'

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

  socket.value.on('get users', (users) => {
    chat.users.array = users
  })

  socket.value.on('get users count', (users) => (chat.users.count = users))

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

  const list = computed(() => {
    return Array.from({ length: 10000 }, () => {
      return {
        nickname: Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
          .substr(0, 20),

        id:
          '#' +
          Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 10)
      }
    })
  })

  const profile = reactive({
    opened: false,
    user: {}
  })

  function openProfile(user) {
    profile.opened = true
    profile.user = user
  }

  return {
    chat,
    chatLength,
    submit,
    checkName,
    onlineStatus,
    list,
    profile,
    openProfile
  }
}

export default {
  setup(_, { refs }) {
    const icons = reactive({
      mdiAccount,
      mdiSend,
      mdiWifiOff,
      mdiMessageText,
      mdiAccountGroup,
      mdiKeyboardBackspace
    })

    const chat = reactive({
      opened: false,
      online: false,

      name: '',
      prename: '',

      message: '',

      content: [],

      users: {
        opened: false,
        count: 0,
        array: []
      }
    })

    const socket = defineSocket(chat)

    return {
      icons,
      chat,
      socket,

      ...Chat(refs, chat, icons, socket)
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
