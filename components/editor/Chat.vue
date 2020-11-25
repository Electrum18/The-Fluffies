<template lang="pug">
  v-menu(
    v-model="chat.opened"
    flat
    :close-on-content-click="false"
    transition="slide-x-transition"
    origin="left bottom"
    max-width=400
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

          v-icon(:color="onlineStatus.color") {{ onlineStatus.icon }}

    v-card(width="100vw")
      v-btn.grad.my-2.mr-10(
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

        v-card(light tile)
          v-card-title {{ $t('editor.chat.users') }}

          v-divider

          v-virtual-scroll(
            :items="chat.users.array"
            :item-height="50"
            width="100vw"
            height=600
            max-width=300
          )
            template(v-slot="{ item }")
              v-list-item
                v-badge(
                  :content="item.level"
                  bottom
                  offset-x="30"
                  offset-y="20"
                  :color="badgeColor(item.level)"
                  bordered
                )
                  v-list-item-avatar.ml-0
                    v-avatar(color="grey" size=42)
                      img(
                        :alt="item.name"
                        :src="item.avatar"
                      )

                v-list-item-content
                  v-list-item-title {{ item.name }}

      v-menu(
        flat
        transition="slide-x-transition"
        origin="bottom"
      )
        template(v-slot:activator="{ on }")
          v-btn.ma-2(
            absolute
            x-small
            fab
            v-on="on"
            style="z-index: 1; margin-left: 64px!important"
          )
            v-icon {{ icons.mdiPin }}

        v-card(light tile)
          v-card-text
            div.font-weight-bold {{ $t('editor.chat.pin.welcome') }}

            v-divider.my-2

            div.text-subtitle-2 {{ $t('editor.chat.pin.text') }}

            v-divider.my-2

            div.text-subtitle-2 {{ $t('editor.chat.pin.issue') }}

            v-row.mt-2
              v-spacer

              v-btn.mx-1(
                small
                dark
                style="pointer-events: auto"
                color="blue"
                target="_blank"
                :title="$t('editor.vk')"
                href="https://vk.com/board187679567"
                rel="noopener"
                :aria-label="$t('editor.vk')"
              )
                | {{ $t('editor.vk') }}
                v-icon(right) {{ icons.mdiVk }}

              v-btn.mx-1(
                small
                dark
                style="pointer-events: auto"
                color="black"
                target="_blank"
                title="Github"
                href="https://github.com/Electrum18/The-Fluffies/issues"
                rel="noopener"
                aria-label="Github"
              )
                | GitHub
                v-icon(right) {{ icons.mdiGithub }}

              v-spacer

      v-btn.mt-2(
        absolute
        right
        x-small
        fab
        style="z-index: 6"
        @click="chat.opened = false"
      )
        v-icon {{ icons.mdiCloseThick }}

      v-card.chat-space(dark flat)
        v-list(dense two-line ref="chatSpace")
          .py-5

          v-list-item(
            v-for="(mes, i) in chat.content"
            :key="'chat' + i"
            :ref="'ChatSpace' + i"
          )
            v-badge(
              :content="mes.level"
              bottom
              offset-x="30"
              offset-y="20"
              :color="badgeColor(mes.level)"
              bordered
            )
              v-list-item-avatar.my-2
                v-img(:src="mes.avatar")

            v-list-item-content
              v-list-item-title {{ mes.name }}
                v-icon(
                  v-if="mes.patron !== ''"
                  right
                  small
                  :color="patronageColor(mes.patron)"
                ) {{ icons.mdiPatreon }}

              v-list-item-subtitle {{ mes.text }}

      v-card-actions
        v-text-field(
          v-model="chat.message"
          :label="$t('editor.chat.type')"
          outlined
          counter="100"
          :append-icon="icons.mdiSend"
          @click:append="submit"
          @keyup.enter="submit"
        )

      v-overlay(absolute :value="!chat.logged")
        v-col
          v-row
            v-spacer
            p.title-text.text-caption {{ $t('editor.chat.login') }}
            v-spacer

          v-row
            v-spacer
            v-btn(icon :href="authGoogle")
              v-icon {{ icons.mdiGoogle }}

            v-spacer

            v-btn(icon :href="authVK")
              v-icon {{ icons.mdiVk }}

            v-spacer

            v-btn(icon :href="authPatreon")
              v-icon {{ icons.mdiPatreon }}
            v-spacer

      v-overlay(absolute :value="!chat.online")
        v-icon(large color="red lighten-1") {{ icons.mdiWifiOff }}
</template>

<script>
import { reactive, watch, ref, computed, onMounted } from '@vue/composition-api'

import io from 'socket.io-client'

import {
  mdiAccount,
  mdiSend,
  mdiWifiOff,
  mdiMessageText,
  mdiAccountGroup,
  mdiKeyboardBackspace,
  mdiGoogle,
  mdiPatreon,
  mdiVk,
  mdiCloseThick,
  mdiPin,
  mdiGithub
} from '@mdi/js'

function defineSocket(chat) {
  const socket = ref({ on: () => undefined })

  if (process.browser) {
    const { host, hostname } = window.location

    socket.value = io(hostname === 'localhost' ? hostname + ':5000' : host)
  }

  socket.value.on('disconnect', () => (chat.logged = false))
  socket.value.on('is authorized', (val) => (chat.logged = val))

  socket.value.on('get messages', (msg) => (chat.content = msg))
  socket.value.on('get message', (msg) => chat.content.push(msg))

  socket.value.on('get users', (users) => {
    chat.users.array = users
  })

  socket.value.on('get users count', (users) => (chat.users.count = users))

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
      socket.value.emit('send message', chat.message)

      chat.message = ''
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
    onlineStatus
  }
}

function OnlineStatus(chat) {
  function handleNetworkChange() {
    chat.online = navigator.onLine
  }

  onMounted(() => {
    handleNetworkChange()
  })

  if (process.browser) {
    window.addEventListener('online', handleNetworkChange)
    window.addEventListener('offline', handleNetworkChange)
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
      mdiKeyboardBackspace,
      mdiGoogle,
      mdiPatreon,
      mdiVk,
      mdiCloseThick,
      mdiPin,
      mdiGithub
    })

    const chat = reactive({
      opened: false,
      online: false,
      logged: false,

      name: '',

      message: '',

      content: [],

      users: {
        opened: false,
        count: 0,
        array: []
      }
    })

    OnlineStatus(chat)

    const socket = defineSocket(chat)

    const popup = reactive({
      windowObjectReference: null,
      previousUrl: null
    })

    let url

    if (process.browser) {
      if (window.location.hostname === 'localhost') {
        url = 'http://localhost:5001'
      } else {
        url = 'https://the-fluffies.net'
      }
    }

    const authGoogle = ref(url + '/auth/google')
    const authVK = ref(url + '/auth/vkontakte')
    const authPatreon = ref(url + '/auth/patreon')

    function patronageColor(patron) {
      if (patron === 'Little supporter') {
        return 'deep-orange darken-3'
      } else if (patron === 'Basic supporter') {
        return 'blue-grey lighten-4'
      } else if (patron === 'Huge supporter') {
        return 'yellow accent-4'
      }
    }

    function badgeColor(level) {
      if (level < 3) {
        return 'grey'
      } else if (level >= 3 && level < 5) {
        return 'cyan'
      } else if (level >= 5 && level < 7) {
        return 'indigo'
      } else if (level >= 7) {
        return 'purple'
      }
    }

    return {
      icons,
      chat,
      socket,
      authGoogle,
      authVK,
      authPatreon,
      popup,
      badgeColor,
      patronageColor,

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
      width: calc(100% - 48px)

      .v-list-item__subtitle
        white-space: normal

.title-text
  min-width: min-content
  opacity: 0.7
</style>
