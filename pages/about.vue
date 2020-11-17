<template lang="pug">
  div
    v-app-bar(fixed app)
      v-toolbar-title.title.text-uppercase {{ $t('about.about') }}
      v-btn.d-none.d-sm-flex(
        large
        depressed
        :to="localePath('index')"
        :title="$t('about.back')"
        :aria-label="$t('about.back')"
        nuxt
      )
        v-icon(left) {{ icons.mdiChevronLeft }}
        | {{ $t('about.back') }}

      v-btn.d-flex.d-sm-none(
        small
        depressed
        :to="localePath('index')"
        fab
        :title="$t('about.back')"
        :aria-label="$t('about.back')"
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
          InfoIcons

          v-row(justify="center")
            v-col(v-for="(card, i) in t.content" :key="card + i" cols="12" md="5")
              v-card(class="align-center")
                v-card-title.gradient
                  | {{ card.title }}

                v-spacer
                v-card-text
                  p.font-weight-medium(v-for="(text, j) in card.text" :key="text + j" v-html="format(text)")

            v-col(cols="12" md="10")
              v-card(class="align-center")
                v-card-title.gradient
                  | {{ $t('about.contributors') }}

                v-item-group
                  v-container
                    v-row
                      v-col(v-for="(contributor, j) in contributors" :key="contributor + j" cols="12" sm="6" md="4")
                        v-card(outlined)
                          v-list-item(three-line)
                            v-list-item-avatar(
                              tile
                              size="56"
                              color="grey"
                            )
                              img(:src="contributor.avatar_url" :alt="contributor.login + ' avatar'")

                            v-list-item-content
                              v-list-item-title.headline {{ contributor.login }}
                              v-list-item-subtitle {{ $t('about.contributions') }} {{ contributor.contributions }}

                      v-col(cols="12" sm="6" md="4")
                        v-card(outlined)
                          v-list-item(three-line)
                            v-list-item-content
                              v-list-item-title.headline {{ $t('about.join.title') }}
                              v-list-item-subtitle {{ $t('about.join.subtitle') }}

            v-col(cols="12" md="10")
              v-card(class="align-center")
                v-card-title.gradient
                  | {{ $t('about.thanks.title') }}

                v-spacer
                v-card-text
                  p.font-weight-medium(v-for="(text, j) in t.thanks.list" :key="text + j" v-html="format(text)")
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'

import { mdiChevronLeft } from '@mdi/js'

import i18nHead from '~/assets/ts/i18nHead.ts'
import schemaOrg from '~/assets/ts/schema-org.ts'
import format from '~/assets/ts/format'

import Socials from '~/components/Socials'
import InfoIcons from '~/components/InfoIcons'
import NetworkStatus from '~/components/NetworkStatus'

function parseContributors({ $axios }) {
  const url =
    'https://api.github.com/repos/electrum18/the-fluffies/contributors?page=1&?access_token=fff'

  const contributors = ref([])

  $axios.$get(url).then((res) => (contributors.value = res))

  return { contributors }
}

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { root }) {
    const icons = reactive({
      mdiChevronLeft
    })

    const { messages, locale } = root.$i18n

    return {
      ...parseContributors(root),

      icons,
      format,

      t: computed(() => messages[locale].about)
    }
  },

  components: {
    Socials,
    InfoIcons,
    NetworkStatus
  },

  head() {
    const { messages, locale } = this.$i18n
    const { htmlAttrs, meta, link } = this.$nuxtI18nSeo()
    const { title, newMeta } = i18nHead(messages[locale], 'about')

    const lang = locale === 'ru' ? '/ru' : ''

    return {
      htmlAttrs,
      title,
      meta: [...newMeta, ...meta],
      link: [{ rel: 'canonical', href: `https://the-fluffies.net${lang}/about/` }, ...link],
      script: [schemaOrg(messages[locale], 'about', lang + '/about/')],
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
