<template lang="pug">
  div
    h1.header {{ $t('meta.title.support') }}

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

    v-content
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
    return i18nHead(this, 'support')
  }
}
</script>

<style lang="sass">
.v-toolbar__title.title
  width: 100%
  left: 0
  position: absolute
  text-align: center

.header
  position: fixed
  opacity: 0
  pointer-events: none
  width: 0
  height: 0

.gradient
  background-image: linear-gradient(to right, #fa2, #f64)
</style>
