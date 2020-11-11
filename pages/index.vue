<template lang="pug">
  div.pa-3
    .image-container(:style="opacity")
      v-img(:src="require('~/assets/img/Defaulty_Zebra.png?webp')" :style="positions[1]")
      v-img(:src="require('~/assets/img/Defaulty_Deer.png?webp')" :style="positions[2]")
      v-img(:src="require('~/assets/img/Defaulty.png?webp')" :style="positions[0]")

    v-row
      Version.mx-3
      v-spacer
      NetworkStatus.mx-3

    v-container.max.text-center
      div.px-12.mb-2(@click="easter($refs)")
        v-img(:src="require('~/assets/svg/TheFluffiesLogo.svg')" ref="logo").logo.logo-hide

      noindex
        span.body-1.font-weight-bold.px-0(:style="tint") {{ $t('index.title') }}

    client-only
      v-row.row-bottom.my-4
        v-spacer

        v-btn.mx-4.my-auto.width.d-none.d-md-flex(
          rounded
          large
          :title="$t('index.about')"
          :to="localePath('about')"
          :aria-label="$t('index.about')"
          nuxt
          style="margin: auto 16px 24px 16px !important"
        ) {{ $t('index.about') }}

        v-btn.mx-4.my-auto(
          v-if="!saveMode"
          fab
          elevation=2
          @click="left"
          :title="$t('index.select.left')"
          :aria-label="$t('index.select.left')"
        )
          v-icon {{ icons.mdiArrowLeft }}

        v-btn(
          v-if="!haveSave"
          x-large
          rounded
          @click="createStartSave"
          :title="$t('index.start.title')"
          :href="localePath('editor')"
          :aria-label="$t('index.start.label')"
          ) {{ $t('index.start.title') }}

        v-card.card-rounded(v-if="haveSave && saveMode")
          v-container.pa-0
            v-col.py-0
              v-row
                v-img.ma-3.save.card-rounded(
                  :src="lastSaveImage"
                  max-width=400
                  style="width: 80vw !important"
                )

              v-row
                p.mx-4.mt-2.mb-0.body-2 {{ saveSlot + 1 }} • {{ save.globals ? save.globals.name : 'Noname' }}
                v-spacer
                v-icon.mx-2.mt-1(:color="gender.color") {{ gender.icon }}

              v-row
                v-btn.card-rounded(
                  x-large
                  text
                  block
                  :title="$t('index.continue.title')"
                  :href="localePath('editor')"
                  :aria-label="$t('index.continue.label')"
                ) {{ $t('index.continue.title') }}

              v-divider

              v-row
                v-btn.text--secondary.card-rounded(
                  flex
                  text
                  block
                  @click="saveMode = !saveMode"
                  :disabled="savesLength > 9"
                  :title="$t('index.create_more.title')"
                  :aria-label="$t('index.create_more.label')"
                ) {{ $t('index.create_more.title') }}
                  v-icon(right) {{ icons.mdiPlus }}

        v-card.card-rounded(v-if="haveSave && !saveMode")
          v-container.pa-0
            v-col.py-0
              v-row
                v-btn.card-rounded(
                  x-large
                  text
                  block
                  @click="createSave"
                  :title="$t('index.start.title')"
                  :href="localePath('editor')"
                  :aria-label="$t('index.start.label')"
                  ) {{ $t('index.start.title') }}

              v-divider

              v-row
                v-btn.text--secondary.card-rounded(
                  flex
                  text
                  block
                  @click="saveMode = !saveMode"
                  :title="$t('index.return.title')"
                  :aria-label="$t('index.return.label')"
                ) {{ $t('index.return.title') }}

        v-btn.mx-4.my-auto(
          v-if="!saveMode"
          fab
          elevation=2
          @click="right"
          :title="$t('index.select.right')"
          :aria-label="$t('index.select.right')"
          )
          v-icon {{ icons.mdiArrowRight }}

        v-btn.mx-4.my-auto.width.d-none.d-md-flex(
          rounded
          large
          :title="$t('index.support')"
          :to="localePath('support')"
          :aria-label="$t('index.support')"
          nuxt
          style="margin: auto 16px 24px 16px !important"
          ) {{ $t('index.support') }}

        v-spacer

    v-menu(transition="slide-x-reverse-transition")
      template(v-slot:activator="{ on }")
        v-btn.bottom.d-flex.d-sm-none(
          fab
          absolute
          left
          small
          v-on="on"
          :aria-label="$t('editor.list')"
        )
          v-icon {{ icons.mdiMenu }}

        v-btn.bottom.d-none.d-sm-flex.d-md-none(
          fab
          absolute
          left
          v-on="on"
          :aria-label="$t('editor.list')"
        )
          v-icon(large) {{ icons.mdiMenu }}

      v-list(dense)
        v-list-item(
          :title="$t('index.about')"
          :to="localePath('about')"
        )
          v-list-item-content
            v-list-item-title(v-text="$t('index.about')")

        v-list-item(
          :title="$t('index.support')"
          :to="localePath('support')"
        )
          v-list-item-content
            v-list-item-title(v-text="$t('index.support')")

        v-list-item(@click="clearing = !clearing" color="red")
          v-list-item-content.red--text
            v-list-item-title(v-text="$t('index.repair')")

          v-list-item-icon
            v-icon(color="error") {{ icons.mdiAlert }}

        v-list-item(
          :title="$t('index.terms')"
          href="termsofservice"
        )
          v-list-item-content
            v-list-item-title.text--secondary(v-text="$t('index.terms')")

        v-list-item(
          :title="$t('index.privacy')"
          href="privacypolicy"
        )
          v-list-item-content
            v-list-item-title.text--secondary(v-text="$t('index.privacy')")

    v-row.px-2.bottom.d-none.d-md-flex
      v-tooltip(right)
        template(v-slot:activator="{ on }")
          v-btn(
            icon
            color="red lighten-1"
            @click="clearing = !clearing"
            v-on="on"
            :title="$t('index.repair')"
            :aria-label="$t('index.repair')"
          )
            v-icon {{ icons.mdiAlert }}

        span {{ $t('index.repair') }}

      v-btn(
        icon
        target="_blank"
        title="Github"
        href="https://github.com/Electrum18/The-Fluffies"
        rel="noopener"
        aria-label="Github"
      )
        v-icon {{ icons.mdiGithub }}

      v-btn(
        icon
        target="_blank"
        title="Twitter"
        href="https://twitter.com/TFluffies"
        rel="noopener"
        aria-label="Twitter"
      )
        v-icon {{ icons.mdiTwitter }}

    v-dialog(v-model="clearing" width="500")
      v-card
        v-card-title.red--text {{ $t('index.repairing.title') }}
        v-card-text.pt-0 {{ $t('index.repairing.desc') }}
          v-container
            v-checkbox.ma-2(
              v-model="acceptClear"
              color="error"
              :label="$t('index.repairing.accept')"
              hide-details
            )

            v-row
              v-spacer
              v-btn(
                color="error"
                :disabled="!acceptClear"
                @click="clearSaves"
              ) {{ $t('index.repairing.button') }}

        v-divider

        v-card-actions
          v-spacer
          v-btn(text @click="clearing = false; acceptClear = false") {{ $t('index.repairing.back') }}

    v-img#easter(
      :src="require('~/assets/img/easterEgg.png?webp')"
      ref="easter"
      eager
    )

    v-img.fruit(
      :src="require('~/assets/img/apple.png?webp')"
      ref="apple"
      max-width=44
      eager
    )

    v-img.fruit(
      :src="require('~/assets/img/mango.png?webp')"
      ref="mango"
      max-width=44
      eager
    )
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'
import {
  mdiMenu,
  mdiArrowLeft,
  mdiArrowRight,
  mdiPlus,
  mdiGenderMale,
  mdiGenderFemale,
  mdiAlert,
  mdiGithub,
  mdiTwitter
} from '@mdi/js'

import i18nHead from '~/assets/ts/i18nHead.ts'

import Version from '~/components/Version'
import NetworkStatus from '~/components/NetworkStatus'

function easterEgg() {
  const active = ref(false)

  function easter(refs) {
    if (!active.value) {
      const fruitType = ['apple', 'mango'][(Math.random() * 2) | 0]

      const logo = refs.logo.$vnode.elm.style
      const easter = refs.easter.$vnode.elm.style
      const fruit = refs[fruitType].$vnode.elm.style

      logo.animation = 'logo 1s ease-in-out'
      easter.animation = 'easter 4s ease-in-out'
      fruit.animation = 'fruit 4s ease-in-out'

      active.value = true

      setTimeout(() => {
        logo.animation = easter.animation = fruit.animation = ''

        active.value = false
      }, 4000)
    }
  }

  return { easter }
}

function carousel(haveSave, saveMode) {
  const defaults = reactive({
    index: 0,
    length: 3
  })

  const side = ref('right')

  function left() {
    defaults.index -= 1

    if (defaults.index < 0) defaults.index = defaults.length - 1

    side.value = 'left'

    if (process.client) localStorage.setItem('defaultIndex', defaults.index)
  }

  function right() {
    defaults.index += 1

    if (defaults.index > defaults.length - 1) defaults.index = 0

    side.value = 'right'

    if (process.client) localStorage.setItem('defaultIndex', defaults.index)
  }

  const styles = [
    [
      { left: '50%', 'max-width': '512px', 'z-index': 3 },
      {
        left: 'calc(50% + 20vw)',
        'max-width': '448px',
        filter: 'brightness(0.8)',
        'z-index': side.value === 'left' ? 2 : 1
      },
      {
        left: 'calc(50% - 20vw)',
        'max-width': '448px',
        filter: 'brightness(0.8)',
        'z-index': side.value === 'left' ? 1 : 2
      }
    ],
    [
      {
        left: 'calc(50% - 20vw)',
        'max-width': '448px',
        filter: 'brightness(0.8)',
        'z-index': side.value === 'left' ? 1 : 2
      },
      { left: '50%', 'max-width': '512px', 'z-index': 3 },
      {
        left: 'calc(50% + 20vw)',
        'max-width': '448px',
        filter: 'brightness(0.8)',
        'z-index': side.value === 'left' ? 2 : 1
      }
    ],
    [
      {
        left: 'calc(50% + 20vw)',
        'max-width': '448px',
        filter: 'brightness(0.8)',
        'z-index': side.value === 'left' ? 2 : 1
      },
      {
        left: 'calc(50% - 20vw)',
        'max-width': '448px',
        filter: 'brightness(0.8)',
        'z-index': side.value === 'left' ? 1 : 2
      },
      { left: '50%', 'max-width': '512px', 'z-index': 3 }
    ]
  ]

  const positions = computed(() => styles[defaults.index])

  const opacity = computed(() => (haveSave.value && saveMode.value ? { opacity: 0 } : undefined))

  return {
    defaults,
    side,
    left,
    right,
    positions,
    opacity
  }
}

function Save(saveMode) {
  const haveSave = ref(false)
  const save = ref(false)
  const saveSlot = ref(0)
  const savesLength = ref(0)

  if (process.client) {
    const avatars = localStorage.getItem('avatars')
    const slot = localStorage.getItem('slot')

    haveSave.value = !!avatars

    if (avatars && slot) {
      const parsed = JSON.parse(avatars)

      save.value = parsed[slot]
      savesLength.value = parsed.length

      saveMode.value = true
      saveSlot.value = +slot
    }
  }

  const gender = computed(() => {
    if (!save.value) return

    return save.value.globals && save.value.globals.male
      ? { color: 'blue', icon: mdiGenderMale }
      : { color: 'pink', icon: mdiGenderFemale }
  })

  return {
    haveSave,
    save,
    saveSlot,
    gender,
    savesLength
  }
}

function CreateSave($store, defaults) {
  if (process.client) localStorage.setItem('defaultIndex', 0)

  const getDefault = computed(() => $store.getters['avatar/getDefault'])

  function createStartSave() {
    if (!process.client) return

    $store.commit('avatar/setSaveIndex', defaults.index)

    const { frame, globals, color } = getDefault.value

    const save = { frame, globals: globals[defaults.index], color: color[defaults.index] }

    localStorage.setItem('avatars', JSON.stringify([save]))
    localStorage.setItem('slot', 0)
  }

  function createSave() {
    if (!process.client) return

    const parsedData = JSON.parse(localStorage.getItem('avatars'))

    $store.commit('avatar/setSaveIndex', defaults.index)

    const { frame, globals, color } = getDefault.value

    const save = { frame, globals: globals[defaults.index], color: color[defaults.index] }

    parsedData.push(save)

    localStorage.setItem('avatars', JSON.stringify(parsedData))
    localStorage.setItem('slot', parsedData.length - 1)
  }

  function clearSaves() {
    localStorage.removeItem('avatars')
    localStorage.removeItem('animations')
    localStorage.removeItem('slot')

    location.reload()
  }

  return {
    getDefault,
    createStartSave,
    createSave,
    clearSaves
  }
}

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { refs, root: { $vuetify, $store } }) {
    const icons = reactive({
      mdiMenu,
      mdiArrowLeft,
      mdiArrowRight,
      mdiPlus,
      mdiAlert,
      mdiGithub,
      mdiTwitter
    })

    const saveMode = ref(false)

    const { haveSave, save, saveSlot, savesLength, gender } = Save(saveMode)
    const { defaults, side, left, right, positions, opacity } = carousel(haveSave, saveMode)

    const tint = computed(() =>
      !$vuetify.theme.isDark
        ? { 'text-shadow': '0 1px 0 white, 0 -1px 0 white, 1px 0 0 white, -1px 0 0 white' }
        : undefined
    )

    const clearing = ref(false)
    const acceptClear = ref(false)

    const lastSaveImage = computed(() =>
      process.client ? localStorage.getItem('lastImage') || '' : ''
    )

    return {
      ...CreateSave($store, defaults),

      ...easterEgg(),

      defaults,
      side,
      left,
      right,
      positions,
      opacity,
      icons,
      haveSave,
      save,
      saveMode,
      saveSlot,
      savesLength,
      gender,
      tint,
      clearing,
      acceptClear,
      lastSaveImage
    }
  },

  components: {
    Version,
    NetworkStatus
  },

  head() {
    return i18nHead(this, 'index')
  }
}
</script>

<style lang="sass">
html
  overflow: auto!important

div.max
  position: relative
  max-width: 700px

.size-by-content
  height: 100%

.logo
  background-image: linear-gradient(to right, #fa2, #f64)
  border-radius: 4vmin
  max-width: 400px
  cursor: pointer
  left: 50%
  transform: translate(-50%)

  .v-responsive__content
    padding-bottom: 40.6667%!important

#easter
  display: block
  position: fixed
  left: -200px
  bottom: 35px

.fruit
  position: fixed!important
  left: 140px
  bottom: -20px
  height: 50px

.image-container
  position: absolute
  overflow: hidden
  width: 100%
  height: 100%
  left: 50%
  bottom: 35px
  transform: translate(-50%)
  transition: opacity 0.3s ease

  .v-image
    position: absolute
    overflow: hidden
    transform: translate(-50%)
    left: 50%
    bottom: 0
    width: 90vmin
    transition: left 0.7s ease, max-width 0.7s ease, filter 0.7s ease

.row-bottom
  position: absolute
  bottom: 35px
  width: 100%

.width.v-btn
  width: 130px

.card-rounded
  border-radius: 14px!important

.v-btn--fab.bottom
  bottom: 48px

.row.bottom
  position: absolute
  bottom: 42px

@media (max-height: 600px)
  .logo-hide
    display: none!important

@media (min-width: 600px)
  .image-container
    .v-image.save
      transform: translate(-50%, 16%)

@media (max-width: 600px)
  .image-container
    .v-image.save
      transform: translate(-50%, 8%)

@keyframes logo
  0%
    transform: translate(-50%) rotate(0deg)

  33%
    transform: translate(-50%) rotate(-3deg)

  66%
    transform: translate(-50%) rotate(3deg)

  100%
    transform: translate(-50%) rotate(0deg)

@keyframes easter
  0%
    left: -200px
    bottom: 35px

  50%
    left: -200px
    bottom: 35px

  66%
    left: 55px
    bottom: 35px

  75%
    left: 55px
    bottom: 35px

  100%
    left: 55px
    bottom: -200px

@keyframes fruit
  0%
    bottom: -150px

  33%
    bottom: 75px

  75%
    bottom: 75px

  100%
    bottom: -150px
</style>
