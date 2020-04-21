<template lang="pug">
  v-row.socials.my-md-n9.my-lg-n9(justify="center")
    v-card.ma-2(height=44)
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
        v-icon(large) {{ icons.mdiGithub }}

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
        v-icon(large) {{ icons.mdiTwitter }}

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
        v-icon(large) {{ icons.mdiPatreon }}

    v-card.mx-2(height=60)
      p.my-1.overline.text-center {{ $t('share.header') }}

      v-btn(
        icon
        tile
        target="_blank"
        title="VKontakte"
        :href="shareVKontakte"
        rel="noopener"
        aria-label="VKontakte"
      )
        v-icon(large color="indigo lighten-1") {{ icons.mdiVk }}

      v-btn(
        icon
        tile
        target="_blank"
        title="Facebook"
        :href="shareFacebook"
        rel="noopener"
        aria-label="Facebook"
      )
        v-icon(large color="indigo") {{ icons.mdiFacebook }}

      v-btn(
        icon
        tile
        target="_blank"
        title="Twitter"
        :href="shareTwitter"
        rel="noopener"
        aria-label="Twitter"
      )
        v-icon(large color="light-blue") {{ icons.mdiTwitter }}

    Locale.my-1
</template>

<script lang="ts">
import { computed, reactive } from '@vue/composition-api'

import { mdiGithub, mdiPatreon, mdiVk, mdiFacebook, mdiTwitter } from '@mdi/js'

import Locale from './Locale.vue'

function sharings({ share }) {
  const url = 'https://the-fluffies.net/'
  const img =
    'https://raw.githubusercontent.com/Electrum18/The-Fluffies/master/src/assets/img/announcement.png'

  const encode = encodeURIComponent

  // VKontakte

  const shareVKontakte = computed(() => {
    let request = 'http://vkontakte.ru/share.php?'

    request += 'url=' + encode(url)
    request += '&title=' + encode(share.title)
    request += '&description=' + encode(share.text)
    request += '&image=' + encode(img)
    request += '&noparse=true'

    return request
  })

  // Facebook

  const shareFacebook = computed(() => {
    let request = 'http://www.facebook.com/sharer.php?s=100'

    request += '&p[title]=' + encode(share.title)
    request += '&p[summary]=' + encode(share.text)
    request += '&p[url]=' + encode(url)
    request += '&p[images][0]=' + encode(img)

    return request
  })

  // Twitter

  const shareTwitter = computed(() => {
    let request = 'http://twitter.com/share?'

    request += 'text=' + encode(share.text)
    request += '&url=' + encode(url)
    request += '&counturl=' + encode(url)

    return request
  })

  return {
    shareVKontakte,
    shareFacebook,
    shareTwitter
  }
}

export default {
  setup(props, { root }) {
    const icons = reactive({
      mdiGithub,
      mdiPatreon,
      mdiVk,
      mdiFacebook,
      mdiTwitter
    })

    const { messages, locale } = root.$i18n

    return {
      ...sharings(messages[locale]),

      icons
    }
  },

  components: {
    Locale
  }
}
</script>

<style lang="sass">
.socials.row
  flex: unset
  margin: 0

  .v-card
    height: fit-content
</style>
