<template lang="pug">
  div
    v-app-bar(fixed app)
      v-toolbar-title.title.text-uppercase {{ $t('support.support') }}
      v-btn.d-none.d-sm-flex(
        large
        depressed
        :to="localePath('index')"
        :title="$t('support.back')"
        :aria-label="$t('support.back')"
        nuxt
      )
        v-icon(left) {{ icons.mdiChevronLeft }}
        | {{ $t('support.back') }}

      v-btn.d-flex.d-sm-none(
        small
        depressed
        :to="localePath('index')"
        fab
        :title="$t('support.back')"
        :aria-label="$t('support.back')"
        nuxt
      )
        v-icon {{ icons.mdiChevronLeft }}

      v-spacer

      NetworkStatus

    v-main
      .my-12

      Socials

      .my-2

      v-item-group
        v-container(fluid)
          v-row(justify="center")
            v-col(v-for="(card, i) in t.content" :key="card + i" cols="12" md="5")
              v-card(class="align-center")
                v-card-title.gradient
                  | {{ card.title }}

                v-spacer
                v-card-text
                  p.font-weight-medium(v-for="(text, j) in card.text" :key="text + j" v-html="format(text)")

                  v-divider(v-if="card.href")
                  .py-2(v-if="card.href")

                  v-item-group
                    v-row.py-1(v-for="(href, j) in card.href" :key="href + j" )
                      v-badge(overlap color="transparent")
                        template(v-slot:badge)
                          v-icon(small color="url") {{ icons.mdiOpenInNew }}

                        v-btn.body-2.font-weight-medium(
                          text
                          target="_blank"
                          color="url"
                          :title="href.text"
                          :href="href.url"
                          rel="noopener"
                          :aria-label="href.text"
                        ) {{ href.text }}
</template>

<script>
import { reactive, computed } from '@vue/composition-api'

import { mdiChevronLeft, mdiOpenInNew } from '@mdi/js'

import i18nHead from '~/assets/ts/i18nHead.ts'
import schemaOrg from '~/assets/ts/schema-org.ts'
import format from '~/assets/ts/format'

import Socials from '~/components/Socials'
import NetworkStatus from '~/components/NetworkStatus'

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { root }) {
    const icons = reactive({
      mdiChevronLeft,
      mdiOpenInNew
    })

    const { messages, locale } = root.$i18n

    return {
      icons,
      format,

      t: computed(() => messages[locale].support)
    }
  },

  components: {
    Socials,
    NetworkStatus
  },

  head() {
    const { messages, locale } = this.$i18n
    const { htmlAttrs, meta, link } = this.$nuxtI18nSeo()
    const { title, newMeta } = i18nHead(messages[locale], 'support')

    const lang = locale === 'ru' ? '/ru' : ''

    return {
      htmlAttrs,
      title,
      meta: [...newMeta, ...meta],
      link: [{ rel: 'canonical', href: `https://the-fluffies.net${lang}/support/` }, ...link],
      script: [schemaOrg(messages[locale], 'support', lang + '/support/')],
      __dangerouslyDisableSanitizers: ['script']
    }
  }
}
</script>

<style lang="sass">
.v-toolbar__title.title
  width: 100%
  left: 0
  position: absolute
  text-align: center

.gradient
  background-image: linear-gradient(to right, #fa2, #f64)
</style>
