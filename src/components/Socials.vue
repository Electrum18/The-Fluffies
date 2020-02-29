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
        v-icon(large) {{ icons.github }}

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
        v-icon(large) {{ icons.twitter }}

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
        v-icon(large) {{ icons.patreon }}

    v-card.mx-2
      p.my-1.overline.text-center {{ header[locale] }}

      v-btn.ma-0(
        icon
        tile
        target="_blank"
        title="VKontakte"
        :href="shareVKontakte"
        rel="noopener"
        aria-label="VKontakte"
      )
        v-icon(large color="indigo lighten-1") {{ icons.vk }}

      v-btn.ma-0(
        icon
        tile
        target="_blank"
        title="Facebook"
        :href="shareFacebook"
        rel="noopener"
        aria-label="Facebook"
      )
        v-icon(large color="indigo") {{ icons.fb }}

      v-btn.ma-0(
        icon
        tile
        target="_blank"
        title="Twitter"
        :href="shareTwitter"
        rel="noopener"
        aria-label="Twitter"
      )
        v-icon(large color="light-blue") {{ icons.twitter }}
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
import {
  mdiVk,
  mdiFacebookBox,
  mdiTwitter,
  mdiGithubCircle,
  mdiPatreon
} from '@mdi/js';

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

    const icons = {
      vk: mdiVk,
      fb: mdiFacebookBox,
      twitter: mdiTwitter,
      github: mdiGithubCircle,
      patreon: mdiPatreon
    }

    return {
      icons,
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