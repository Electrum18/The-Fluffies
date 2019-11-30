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
        style="pointer-events: auto"
        v-on="on"
        aria-label="Open chat"
      )
        v-badge.py-2.grad
          template(v-slot:badge) {{ chat.users }}

          v-icon mdi-message-text

    v-card
      v-btn.grad(
        absolute
        dark
        right
        small
        style="pointer-events: none; z-index: 1"
        aria-label="Users count"
      ) {{ chat.users }}

        v-icon(small right) mdi-account


      v-card(dark flat style="height: 500px; overflow: overlay" ref="chatSpace")
        v-list(dense)
          .py-3

          v-list-item(
            style="pointer-events: none; width: calc(100% - 16px)"
            v-for="(mes, i) in chat.content"
            :key="'chat' + i"
          )
            v-list-item-content
              v-card.my-n1(outlined)
                v-card-text.pa-2 #[kbd(v-if="mes.name") {{ mes.name }}] {{ mes.text }}

      v-card-actions
        v-text-field(
          v-model="chat.message"
          label="Type a message"
          :hint="chat.name"
          persistent-hint
          outlined
          counter="100"
          append-icon="mdi-send"
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
        placeholder="Enter your name"
        solo
        outlined
        counter="20"
        append-icon="mdi-send"

        @click:append="checkName"
        @keyup.enter="checkName"
      )
</template>

<script lang="coffee">
  import io from "socket.io-client"  # Comment on webpack command

  export default
    data: ->
      chat:
        opened: no

        name: ""
        prename: ""

        message: ""

        users: 0
        content: []

      socket: io(
        if window.location.hostname is "localhost"
             window.location.hostname + ":3000"
        else window.location.host
      )

    methods:
      submit: ->
        length = @chat.message.length

        if length > 0 and length <= 100
          @socket.emit "send message", { name: @chat.name, text: @chat.message }
          @chat.message = ""

      checkName: ->
        if @chat.prename
          @socket.emit("check name", @chat.prename)

          @chat.name = @chat.prename
          @chat.prename = ""

    watch:
      "chat.opened": (val) ->
        if val
          refs = @$refs

          setTimeout ->
            space = refs.chatSpace.$el

            space.scrollTop = space.scrollHeight
          , 100

      "chat.content": ->
        if @chat.opened
          refs = @$refs

          setTimeout ->
            space = refs.chatSpace.$el

            space.scrollTop = space.scrollHeight

    mounted: ->
      chat = @chat

      @socket.on "get first",    (msg) -> chat.content = msg
      @socket.on "get message",  (msg) -> chat.content.push msg
      @socket.on "get announce", (msg) -> chat.content.push msg
      @socket.on "get users",  (users) -> chat.users = users

      self = this

      @socket.on "isnt nickname", () ->
        self.text = ""
        self.name = ""
</script>