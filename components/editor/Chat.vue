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
import io from 'socket.io-client'

import { mdiAccount, mdiSend, mdiWifiOff, mdiMessageText } from '@mdi/js'

export default {
  data() {
    return {
      chat: {
        opened: false,
        online: false,

        name: '',
        prename: '',

        message: '',

        users: 0,
        content: [],

        socket: undefined
      },

      icons: {
        mdiAccount,
        mdiSend,
        mdiWifiOff,
        mdiMessageText
      }
    }
  },

  computed: {
    onlineStatus() {
      const online = this.chat.online
      const { mdiMessageText, mdiWifiOff } = this.icons

      return {
        color: online ? 'white' : 'red lighten-1',
        icon: online ? mdiMessageText : mdiWifiOff
      }
    }
  },

  watch: {
    'chat.opened'(val) {
      if (val) this.chatLength(100)
    },

    'chat.content'() {
      if (this.chat.opened) this.chatLength()
    }
  },

  mounted() {
    const { host, hostname } = window.location

    this.socket = io(hostname === 'localhost' ? hostname + ':5000' : host)

    const socket = this.socket

    const chat = this.chat

    socket.on('connect', () => {
      chat.online = socket.connected
    })

    socket.on('disconnect', () => {
      chat.online = socket.connected
    })

    socket.on('get first', (msg) => (chat.content = msg))
    socket.on('get message', (msg) => chat.content.push(msg))
    socket.on('get announce', (msg) => chat.content.push(msg))
    socket.on('get users', (users) => (chat.users = users))

    socket.on('isnt nickname', () => {
      this.text = ''
      this.name = ''
    })
  },

  methods: {
    submit() {
      const length = this.chat.message.length

      if (length > 0 && length <= 100) {
        this.socket.emit('send message', {
          name: this.chat.name,
          text: this.chat.message
        })

        this.chat.message = ''
      }
    },

    checkName() {
      if (this.chat.prename && this.chat.prename.length > 2) {
        this.socket.emit('check name', this.chat.prename)

        this.chat.name = this.chat.prename
        this.chat.prename = ''
      }
    },

    chatLength(interval = undefined) {
      const self = this

      setTimeout(() => {
        const { $refs } = self
        const { content } = this.chat

        let length = 0

        for (let i = 0; i < content.length; i++) {
          const element = $refs['ChatSpace' + i][0]

          length += element.$el.offsetHeight
        }

        $refs.chatSpace.$el.scrollTop = length
      }, interval)
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
