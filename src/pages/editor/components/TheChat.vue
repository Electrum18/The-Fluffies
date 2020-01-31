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
        :aria-label="lang.chat.open"
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
        :aria-label="lang.chat.users"
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
          :label="lang.chat.type"
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
        :placeholder="lang.chat['enter name']"
        solo
        outlined
        counter="20"
        append-icon="mdi-send"

        @click:append="checkName"
        @keyup.enter="checkName"
      )
</template>

<script lang="ts">
import io from "socket.io-client"

import en from "../../../assets/json/locales/en/editor.json"
import ru from "../../../assets/json/locales/ru/editor.json"

import Vue from 'vue'
import {
  VMenu,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VBtn,
  VIcon,
  VList,
  VListItem,
  VListItemContent,
  VBadge,
  VTextField,
  VOverlay
} from 'vuetify/lib'


export default Vue.extend({
  data() {
    return {
      chat: {
        opened: false,

        name: "",
        prename: "",

        message: "",

        users: 0,
        content: []
      },

      locales: { en, ru },

      socket: io(
        window.location.hostname == "localhost" ?
          window.location.hostname + ":3000"
        : window.location.host
      )
    }
  },

  watch: {
    "chat.opened"(val) {
      if (val) {
        const refs = this.$refs;

        setTimeout(() => {
          let space = (refs.chatSpace as any).$el;

          space.scrollTop = space.scrollHeight
        }, 100)
      }
    },

    "chat.content"() {
      if (this.chat.opened) {
        const refs = this.$refs;

        setTimeout(() => {
          let space = (refs.chatSpace as any).$el;

          space.scrollTop = space.scrollHeight
        })
      }
    }
  },

  computed: {
    lang(): object {
      return (this.locales as any)[(this.$root as any).locale];
    }
  },

  methods: {
    submit() {
      const length = this.chat.message.length;

      if (length > 0 && length <= 100) {
        this.socket.emit(
          "send message", {
            name: this.chat.name,
            text: this.chat.message
        });

        this.chat.message = "";
      }
    },

    checkName() {
      if (this.chat.prename) {
        this.socket.emit("check name", this.chat.prename);

        this.chat.name = this.chat.prename;
        this.chat.prename = "";
      }
    }
  },

  mounted() {
    let chat = this.chat;

    const socket = this.socket;

    socket.on("get first",    (msg: string) => chat.content = msg as any);
    socket.on("get message",  (msg: string) => (chat.content as any).push(msg));
    socket.on("get announce", (msg: string) => (chat.content as any).push(msg));
    socket.on("get users",  (users: number) => chat.users = users);

    const self: any = this;

    socket.on("isnt nickname", () => {
      self.text = "";
      self.name = "";
    });
  },

  components: {
    VMenu,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VBtn,
    VIcon,
    VList,
    VListItem,
    VListItemContent,
    VBadge,
    VTextField,
    VOverlay
  }
});
</script>