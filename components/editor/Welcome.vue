<template lang="pug">
  div
    v-btn#button-guide(
      fab
      dark
      absolute
      left
      top
      small
      @click="opened = true; openedGuide = false"
    )
      v-icon(large color="primary") {{ icons.mdiInformationOutline }}

    v-dialog(v-model="opened" width="600")
      v-card(dark)
        v-img.white--text.align-end(
          height=250
          :src="require('~/assets/img/welcome.png?webp')"
        )
          v-card-title {{ $t('editor.welcome.title') }}

        v-card-text.pt-6 {{ $t('editor.welcome.desc') }}
        v-card-text {{ $t('editor.welcome.desc2') }}

        v-divider.pb-4

        v-card-subtitle.text-subtitle-1.pb-0 {{ $t('editor.welcome.choose.title') }}
        v-container(fluid).px-6
          v-row
            v-col(cols="12")
              v-btn(block color="primary" @click="page = 0") {{ $t('editor.welcome.choose.main') }}
            v-col(cols="12" sm="6")
              v-btn(block outlined color="primary" @click="page = 1") {{ $t('editor.welcome.choose.editor') }}
            v-col(cols="12" sm="6")
              v-btn.justify-space-between(block outlined color="purple accent-3" @click="page = 2")
                div.mx-2
                | {{ $t('editor.welcome.choose.animation') }}
                v-icon(right) {{ icons.mdiStar }}
            v-col(cols="12" sm="6")
              v-btn(block outlined color="primary" @click="page = 3") {{ $t('editor.welcome.choose.saves') }}
            v-col(cols="12" sm="6")
              v-btn(block outlined color="primary" @click="page = 4") {{ $t('editor.welcome.choose.upgrade') }}

        v-divider

        v-card-actions
          v-spacer
          v-btn(text color="red" @click="opened = false") {{ $t('editor.welcome.close') }}

    v-dialog(v-model="openedGuide" width="600")
      v-card(dark)
        v-tabs(
          v-model="page"
          grow
          show-arrows
          center-active
          :color="tabColor"
        )
          v-tab {{ $t('editor.welcome.tabs.main') }}
          v-tab {{ $t('editor.welcome.tabs.editor') }}
          v-tab {{ $t('editor.welcome.tabs.animation') }}
            v-icon(right small) {{ icons.mdiStar }}
          v-tab {{ $t('editor.welcome.tabs.saves') }}
          v-tab {{ $t('editor.welcome.tabs.upgrade') }}

        v-tabs-items(v-model="page")
          v-tab-item
            v-card(flat)
              v-img(:src="require('~/assets/img/welcome/example.png?webp')")
              v-card-title {{ $t('editor.welcome.main.title') }}
              v-card-text {{ $t('editor.welcome.main.subtitle') }}

              v-divider

              v-list-item(three-line)
                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.main.character.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.main.character.text') }}

                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/character.png?webp')")

              v-divider

              v-list-item(three-line)
                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/editing.png?webp')")

                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.main.editor.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.main.editor.text') }}

              v-row.mx-4.mb-0.mt-n4.pb-4
                v-spacer
                v-btn(text color="primary" @click="page = 1") {{ $t('editor.welcome.main.editor.button') }}

              v-divider

              v-list-item(three-line)
                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.main.animation.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.main.animation.text') }}

                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/animate.png?webp')")

              v-row.mx-4.mb-0.mt-n4.pb-4
                v-btn(text color="purple accent-3" @click="page = 2") {{ $t('editor.welcome.main.animation.button') }}
                  v-icon(right small) {{ icons.mdiStar }}

              v-divider

              v-list-item(three-line)
                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/social.png?webp')")

                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.main.social.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.main.social.text') }}

              v-divider

              v-card-actions
                v-spacer
                v-btn(text color="red" @click="openedGuide = false") {{ $t('editor.welcome.close') }}

          v-tab-item
            v-card(flat)
              v-list-item(three-line)
                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.editor.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.editor.subtitle') }}

                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/editing_opened.png?webp')")

              v-divider

              v-list-item(three-line)
                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/editing_1.png?webp')")

                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.editor.view.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.editor.view.text') }}

              v-divider

              v-list-item(three-line)
                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.editor.save.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.editor.save.text') }}

                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/editing_2.png?webp')")

              v-divider

              v-list-item(three-line)
                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/editing_3.png?webp')")

                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.editor.wind.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.editor.wind.text') }}

              v-divider

              v-list-item(three-line)
                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.editor.image.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.editor.image.text') }}

                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/editing_4.png?webp')")

              v-divider

              v-card-actions
                v-spacer
                v-btn(text color="red" @click="openedGuide = false") {{ $t('editor.welcome.close') }}

          v-tab-item
            v-card(flat)
              v-img(:src="require('~/assets/img/welcome/animator.png?webp')")
              v-card-title {{ $t('editor.welcome.animation.title') }}
              v-card-text {{ $t('editor.welcome.animation.subtitle') }}

              v-divider

              v-list-item(three-line)
                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.animation.how.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.animation.how.text') }}

              v-divider

              v-list-item(three-line)
                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.animation.lips.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.animation.lips.text') }}

                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/animator_1.png?webp')")

              v-divider

              v-list-item(three-line)
                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/animator_2.png?webp')")

                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.animation.save.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.animation.save.text') }}

              v-divider

              v-card-actions
                v-spacer
                v-btn(text color="red" @click="openedGuide = false") {{ $t('editor.welcome.close') }}

          v-tab-item
            v-card(flat)
              v-img(:src="require('~/assets/img/welcome/saves.png?webp')")
              v-card-title {{ $t('editor.welcome.save.title') }}
              v-card-text {{ $t('editor.welcome.save.subtitle') }}

              v-divider

              v-list-item(three-line)
                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.save.main.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.save.main.text') }}

                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/saves_1.png?webp')")

              v-divider

              v-list-item(three-line)
                v-list-item-avatar(rounded size='128' color='grey')
                  v-img(:src="require('~/assets/img/welcome/saves_2.png?webp')")

                v-list-item-content
                  v-list-item-title.headline.mb-1 {{ $t('editor.welcome.save.cloud.title') }}
                  v-list-item-subtitle.no-clamp {{ $t('editor.welcome.save.cloud.text') }}

              v-divider

              v-card-actions
                v-spacer
                v-btn(text color="red" @click="openedGuide = false") {{ $t('editor.welcome.close') }}

          v-tab-item
            v-card(flat)
              v-card-title {{ $t('editor.welcome.upgrade.title') }}
              v-card-text {{ $t('editor.welcome.upgrade.subtitle') }}

              v-row.mx-4.my-0.pb-4
                v-spacer
                v-btn(text color="primary" :href="url") {{ $t('editor.welcome.upgrade.button') }}

              v-divider

              v-card-title {{ $t('editor.welcome.upgrade.artists.title') }}
              v-card-text {{ $t('editor.welcome.upgrade.artists.text') }}

              v-divider

              v-card-title {{ $t('editor.welcome.upgrade.coders.title') }}
              v-card-text {{ $t('editor.welcome.upgrade.coders.text') }}

              v-row.mx-4.my-0.pb-4
                v-spacer
                v-btn(dark color="black" href="https://github.com/Electrum18/The-Fluffies") GitHub
                  v-icon(right small) {{ icons.mdiGithub }}

              v-divider

              v-card-title {{ $t('editor.welcome.upgrade.patreon.title') }}
              v-card-text {{ $t('editor.welcome.upgrade.patreon.text') }}

              v-row.mx-4.my-0.pb-4
                v-spacer
                v-btn(dark color="#f96854" href="https://www.patreon.com/the_fluffies") Patreon
                  v-icon(right small) {{ icons.mdiPatreon }}

              v-divider

              v-card-actions
                v-spacer
                v-btn(text color="red" @click="openedGuide = false") {{ $t('editor.welcome.close') }}
</template>

<script>
import { ref, watch, reactive, computed } from '@vue/composition-api'

import { mdiStar, mdiGithub, mdiPatreon, mdiInformationOutline } from '@mdi/js'

export default {
  setup(_, { root: { $i18n } }) {
    const icons = reactive({
      mdiStar,
      mdiGithub,
      mdiPatreon,
      mdiInformationOutline
    })

    const opened = ref(false)
    const openedGuide = ref(false)

    const page = ref(undefined)

    const tabs = ref(['Устройство сайта', 'Редактирование', 'Анимации', 'Сохранения', 'Улучшение'])
    const tabColor = ref('primary')

    const url = computed(() => {
      return $i18n.locale === 'ru' ? '/ru/support' : '/support'
    })

    watch(
      () => page.value,
      (val) => {
        if (val !== undefined) {
          opened.value = false
          openedGuide.value = true

          if (tabs.value[val] === 'Анимации') {
            tabColor.value = 'purple accent-3'
          } else {
            tabColor.value = 'primary'
          }
        }
      }
    )

    if (process.browser) {
      if (localStorage.getItem('firstGuide') === null) {
        setTimeout(() => {
          opened.value = true

          localStorage.setItem('firstGuide', true)
        })
      }
    }

    return {
      icons,

      opened,
      openedGuide,

      page,

      tabs,
      tabColor,

      url
    }
  }
}
</script>

<style lang="sass">
#button-guide
  top: -128px!important
  pointer-events: auto

.no-clamp
  -webkit-line-clamp: inherit!important
</style>
