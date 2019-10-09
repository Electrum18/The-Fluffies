<template lang="pug">
  #chat
    #content(:style="open")
      ul#messages(ref="messages")
        li.message(v-for="mes in content" :style="{ background: mes.notMessage ? false : '#444' }")
          span.nickname(v-if="mes.name") {{ mes.name }} #[span.id # {{ mes.id }}]
          span.time(v-if="mes.time") {{ mes.time }}
          br(v-if="mes.name || mes.time")
          span.text {{ mes.text }}

      svg(viewBox="-8 -8 16 16" v-if="!content").loader
        circle(r="5" stroke="#fa0" stroke-width="2"
          fill-opacity=0
          style="pointer-events: stroke"
        )

      #bar
        span#name(v-if="name") {{ name }}
        input#text(placeholder="type a message" maxlength="99"
          @keyup.enter.prevent="submit" v-model="text")

        #send(v-if="text" @click="submit")
          svg(viewBox="0 0 448 448")
            path.transition(fill="#888"
              d="M439 209L23 17c-7-3-15-1-19 5-5 6-5 14-1 20l137 182L3 406a16 16 0 0 0 20 25l416-192a16 16 0 0 0 0-30z")

      #block(v-if="!name")
        input#text.name(placeholder="type a your nickname" maxlength="15" v-model.lazy="name")

      span#length {{ users }}

    #button
      svg.transition(viewBox="-140 -140 750 750" :style="buttonOpen" @click="opened = true")
        path(fill="#ccc"
          d="M404 69a235 235 0 0 0-335 0c-86 87-92 225-15 318-7 16-20 33-38 42-8 5-13 14-12 24s9 17 19 18l18 2c21 0 52-5 84-28a235 235 0 0 0 279-41 235 235 0 0 0 0-335zm-20 316c-67 67-172 81-254 32-5-3-12-2-16 2l-1 1c-27 21-54 26-72 26 21-15 33-37 41-54l1-9-4-8a210 210 0 1 1 305 10z")

        circle(cx="236" cy="237" r="25" fill="#ccc")
        circle(cx="322" cy="237" r="25" fill="#ccc")
        circle(cx="151" cy="237" r="25" fill="#ccc")

      svg.transition(viewBox="-24 -24 88 88" :style="buttonClose" @click="opened = false")
        path(fill="#ccc" d="M28 21L40 9a5 5 0 1 0-7-8L21 14 9 1a5 5 0 0 0-8 8l13 12L1 33a5 5 0 1 0 8 7l12-12 12 12a5 5 0 0 0 7 0c2-2 2-5 0-7L28 21z")
</template>

<script lang="coffee">
  import io from "socket.io-client"  # Comment on webpack command

  export default
    data: ->
      name: ""
      text: ""
      opened: no
      users: 0

      socket: io(
        if window.location.hostname is "localhost"
             window.location.hostname + ":3000"
        else window.location.host
      )

      content: []

      button:
        open:  {}
        close: {}

    watch:
      name: (val) ->
        if val then @socket.emit("check name", @name)

    computed:
      open: ->
        if @opened
          opacity: 1
          width: "40vmin"
          height: "50vmin"

        else
          opacity: 0
          width: "7vmin"
          height: "7vmin"

      buttonOpen: ->
        opacity: if @opened then 0 else 1
        transform: if @opened then "scale(0)" else "scale(1)"

      buttonClose: ->
        opacity: if @opened then 1 else 0
        transform: if @opened then "scale(1)" else "scale(0)"

    methods:
      submit: ->
        @socket.emit "send message", { name: @name, text: @text }
        @text = ""

    mounted: ->
      self = this
      el   = @$refs.messages

      setTimeout (-> el.scrollTop = el.scrollHeight - el.clientHeight), 1e3

      sticky = ->
        setTimeout (->
          isScrolledToBottom = el.scrollHeight - el.clientHeight <= el.scrollTop + 100

          if isScrolledToBottom
            el.scrollTop = el.scrollHeight - el.clientHeight
        )

      @socket.on "get first",    (msg) -> sticky(); self.content = msg
      @socket.on "get message",  (msg) -> sticky(); self.content.push msg
      @socket.on "get announce", (msg) -> sticky(); self.content.push msg
      @socket.on "get users",  (users) -> self.users = users

      @socket.on "isnt nickname" , () ->
        self.text = ""
        self.name = ""
</script>

<style lang="sass">
  #chat
    position: fixed
    background: #333
    pointer-events: all

    #button
      left: 0
      bottom: 0
      margin: 1vmin
      border-radius: 100vmax
      width: 7vmin
      height: 7vmin
      cursor: pointer
      background: #333
      box-shadow: 0 0 2vmin #0008

    #content
      left: 0
      bottom: 0
      margin: 1vmin
      border-radius: 3vmin
      width: 7vmin
      height: 7vmin
      background: #333
      box-shadow: 0 0 2vmin #0008

      #length
        position: absolute
        right: 1vmin
        top: -1vmin
        background: #eee
        color: #222
        padding: 0 .5vmin
        border-radius: 1vmin
        box-shadow: 0 0 1vmin #0008

      #messages
        width: 100%
        height: 43vmin
        position: absolute
        overflow-y: scroll
        border-radius: 3vmin 3vmin 0 0
        word-break: break-all
        margin: 0
        padding: 0
        list-style: none

        .message
          height: auto
          margin: 1vmin
          position: relative
          border-radius: 1vmin

          .nickname
            color: #aaa
            font-size: 1.5vmin
            padding: 1vmin 2vmin

          .id
            font-size: 1vmin
            padding: 1.2vmin .5vmin
            color: #888
            position: absolute

          .text
            font-size: 1.38vmin
            padding: 1vmin 2vmin
            display: inline-block

          .time
            color: #888
            font-size: 1.25vmin
            padding: 1vmin 2vmin
            float: right

      #name
        position: absolute
        font-size: 1.85vmin
        font-variant: none
        left: 10vmin
        top: .25vmin
        color: #333
        padding: 0

      span
        color: #ccc
        margin: 0
        font-size: 2.5vmin

      .loader
        width: 8vmin
        height: 8vmin
        left: 16vmin
        top: 17vmin

      #bar
        bottom: 0
        width: 100%
        height: 7vmin
        background: #eee
        position: absolute
        border-radius: 0 0 3vmin 3vmin

        input
          font-size: 2.5vmin
          top: 2.5vmin
          height: 2vmin

        #send
          right: 0
          bottom: 0
          position: absolute
          width: 3vmin
          height: 3vmin
          margin: 1.5vmin 1.25vmin
          cursor: pointer

        #send:hover svg path
          fill: #fa0

        #send:active svg path
          fill: #888

      #block
        width: 100%
        height: 100%
        background: #0008
        position: absolute
        border-radius: 3vmin

    svg
      width: 100%
      height: 100%

    .name
      background: #eee
      font-size: 2.5vmin
      left: 7vmin
      top: 18vmin
</style>