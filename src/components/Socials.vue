<template lang="pug">
  v-row(justify="center")
    .py-2

    v-card.ma-2(:dark="dark")
      v-btn(
        icon
        large
        tile
        target="_blank"
        title="Github"
        href="https://github.com/Electrum18/The-Fluffies"
        rel="noopener"
        aria-label="Github"
      )
        v-icon mdi-github-circle

      v-btn(
        icon
        large
        tile
        target="_blank"
        title="Twitter"
        href="https://twitter.com/TFluffies"
        rel="noopener"
        aria-label="Twitter"
      )
        v-icon mdi-twitter

      v-btn(
        icon
        large
        tile
        target="_blank"
        title="Patreon"
        href="https://www.patreon.com/the_fluffies"
        rel="noopener"
        aria-label="Patreon"
      )
        v-icon mdi-patreon

    v-card.mx-2
      p.my-1.overline.text-center {{ header[locale] }}

      v-btn.white-in.ma-0(
        icon
        tile
        target="_blank"
        title="VKontakte"
        :href="shareVKontakte"
        rel="noopener"
        aria-label="VKontakte"
      )
        v-icon(x-large color="indigo lighten-1") mdi-vk-box

      v-btn.white-in.ma-0(
        icon
        tile
        target="_blank"
        title="Facebook"
        :href="shareFacebook"
        rel="noopener"
        aria-label="Facebook"
      )
        v-icon(x-large color="indigo") mdi-facebook-box

      v-btn.white-in.ma-0(
        icon
        tile
        target="_blank"
        title="Twitter"
        :href="shareTwitter"
        rel="noopener"
        aria-label="Twitter"
      )
        v-icon(x-large color="light-blue") mdi-twitter-box
</template>

<script lang="ts">
import Share from '../assets/json/locales/share.json';

import Vue from 'vue';
import {
  VRow,
  VCard,
  VBtn,
  VIcon,
  VDivider
} from 'vuetify/lib';

import { computed } from '@vue/composition-api';

import { getLocale } from '../assets/ts/language';

// Functions

function sharings() {
  const { locale } = getLocale();

  const { title, text } = Share;

  const url = 'https://the-fluffies.net/';
  const img = 'https://raw.githubusercontent.com/Electrum18/The-Fluffies/master/src/assets/img/announcement.png';

  const encode = encodeURIComponent;

  // VKontakte

  const shareVKontakte = computed(() => {
    let request = 'http://vkontakte.ru/share.php?';

    request += 'url='          + encode(url);
    request += '&title='       + encode(title[locale.value]);
    request += '&description=' + encode(text[locale.value]);
    request += '&image='       + encode(img);
    request += '&noparse=true';

    return request;
  });

  // Facebook

  const shareFacebook = computed(() => {
    let request = 'http://www.facebook.com/sharer.php?s=100';

    request += '&p[title]='     + encode(title[locale.value]);
    request += '&p[summary]='   + encode(text[locale.value]);
    request += '&p[url]='       + encode(url);
    request += '&p[images][0]=' + encode(img);

    return request;
  });

  // Twitter

  const shareTwitter = computed(() => {
    let request = 'http://twitter.com/share?';

    request += 'text='      + encode(text[locale.value]);
    request += '&url='      + encode(url);
    request += '&counturl=' + encode(url);

    return request;
  });

  return {
    shareVKontakte,
    shareFacebook,
    shareTwitter
  }
}

export default Vue.extend({
  props: {
    dark: Boolean
  },

  setup() {
    const { locale } = getLocale();

    const { header } = Share;

    const {
      shareVKontakte,
      shareFacebook,
      shareTwitter
    } = sharings();

    return {
      locale,
      header,
      shareVKontakte,
      shareFacebook,
      shareTwitter
    }
  },

  components: {
    VRow,
    VCard,
    VBtn,
    VIcon,
    VDivider
  }
});
</script>

<style lang="sass">
  a.white-in span
    background: white
    margin: 6px
    min-height: 30px!important
</style>