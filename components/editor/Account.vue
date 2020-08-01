<template lang="pug">
  v-dialog(v-model="opened" width="500")
    template(v-slot:activator="{ on, attrs }")
      v-btn#button-avatar(
        fab
        dark
        absolute
        left
        top
        v-bind="attrs"
        v-on="on"
      )
        v-badge(
          v-if="user.id"
          bottom
          overlap
          :content="user.level"
          :color="badgeColor(user.level)"
        )
          v-avatar(color="grey" size=48)
            img(
              :alt="user.nickname"
              :src="user.avatar"
            )

          v-progress-circular.abs-center(
            size=56
            rotate=45
            :value="100 - (timeLeft / 3)"
            :color="badgeColor(user.level)"
          )

        v-icon#avatar-icon(v-else) $vuetify.icons.values.pony

    v-card(v-if="user.id" dark :style="dialogPatronBorder")
      v-card-title {{ $t('editor.profile.title') }}
        v-spacer
        v-btn.mx-n2(
          fab
          small
          @click="opened = false"
          :light="!!patronageColor"
          :color="patronageColor"
          :aria-label="$t('editor.back')"
        )
          v-icon {{ icons.mdiKeyboardBackspace }}

      v-divider
      v-list-item.pt-2
        v-list-item-avatar(color="grey" size=84)
          img(
            :alt="user.nickname"
            :src="user.avatar"
          )

        v-list-item-content.mx-2
          v-text-field.mr-12.text-h6(
            v-model="user.nickname"
            :counter="30"
            :rules="nameRules"
            required
          )

          v-list-item-subtitle#opacity-lower.text-caption.mb-3 \#{{ user.id }}

          div
            v-chip(
              v-if="user.patron"
              small
              :color="patronageColor"
              text-color="black"
            ) {{ user.patron }}
              v-icon(right small) {{ icons.mdiPatreon }}

      v-list-item.mx-4.mt-n2
        v-row
          v-dialog(v-model="openedAvatars" max-width=600)
            template(v-slot:activator="{ on, attrs }")
              v-btn(
                text
                v-bind="attrs"
                v-on="on"
              ).px-1 {{ $t('editor.profile.accounts') }}

            v-card
              v-card-title {{ $t('editor.profile.accounts') }}
                v-spacer
                v-btn.mx-n2(
                  fab
                  small
                  @click="openedAvatars = false"
                  :aria-label="$t('editor.back')"
                )
                  v-icon {{ icons.mdiKeyboardBackspace }}

              v-divider

              v-list-item
                v-row(justify="center")
                  v-col(cols="6" sm="3")
                    p.text-center Google

                    div(v-if="user.avatars.google")
                      v-avatar(color="grey" size=64).horiz-center
                        v-img(:src="user.avatars.google")

                      v-row
                        v-spacer
                        v-btn.px-1(
                          v-if="user.current === 'google'"
                          text
                          small
                          disabled
                        ).mt-2 {{ $t('editor.profile.selected') }}

                        v-btn.px-1(
                          v-else
                          @click="accountSelect('google')"
                          text
                          small
                        ).mt-2 {{ $t('editor.profile.select') }}

                        v-btn(
                          @click="accountDelete('google')"
                          icon
                          tile
                          small
                          color="red"
                        ).mt-2
                          v-icon(small) {{ icons.mdiDelete }}

                        v-spacer

                    div(v-else)
                      v-avatar(color="grey" size=64).horiz-center
                        v-icon(color="white").pa-3 {{ icons.mdiGoogle }}

                      v-btn(
                        text
                        small
                        block
                        color="blue"
                        :href="authGoogle"
                      ).mt-2 {{ $t('editor.profile.connect') }}

                  v-col(cols="6" sm="3")
                    p.text-center {{ $t('editor.profile.vk') }}

                    div(v-if="user.avatars.vk")
                      v-avatar(color="grey" size=64).horiz-center
                        v-img(:src="user.avatars.vk")

                      v-row
                        v-spacer
                        v-btn.px-1(
                          v-if="user.current === 'vk'"
                          text
                          small
                          disabled
                        ).mt-2 {{ $t('editor.profile.selected') }}

                        v-btn.px-1(
                          v-else
                          @click="accountSelect('vk')"
                          text
                          small
                        ).mt-2 {{ $t('editor.profile.select') }}

                        v-btn(
                          @click="accountDelete('vk')"
                          icon
                          tile
                          small
                          color="red"
                        ).mt-2
                          v-icon(small) {{ icons.mdiDelete }}

                        v-spacer

                    div(v-else)
                      v-avatar(color="grey" size=64).horiz-center
                        v-icon(color="white").pa-3 {{ icons.mdiVk }}

                      v-btn(
                        text
                        small
                        block
                        color="blue"
                        :href="authVk"
                      ).mt-2 {{ $t('editor.profile.connect') }}

                  v-col(cols="6" sm="3")
                    p.text-center Twitter

                    v-avatar(color="grey" size=64).horiz-center
                      v-icon(color="white").pa-3 {{ icons.mdiTwitter }}

                    v-btn(
                      text
                      small
                      block
                      disabled
                    ).mt-2 {{ $t('editor.profile.connect') }}

                  v-col(cols="6" sm="3")
                    p.text-center Patreon

                    div(v-if="user.avatars.patreon")
                      v-avatar(color="grey" size=64).horiz-center
                        v-img(:src="user.avatars.patreon")

                      v-row
                        v-spacer
                        v-btn.px-1(
                          v-if="user.current === 'patreon'"
                          text
                          small
                          disabled
                        ).mt-2 {{ $t('editor.profile.selected') }}

                        v-btn.px-1(
                          v-else
                          @click="accountSelect('patreon')"
                          text
                          small
                        ).mt-2 {{ $t('editor.profile.select') }}

                        v-btn(
                          @click="accountDelete('patreon')"
                          icon
                          tile
                          small
                          color="red"
                        ).mt-2
                          v-icon(small) {{ icons.mdiDelete }}

                        v-spacer

                    div(v-else)
                      v-avatar(color="grey" size=64).horiz-center
                        v-icon(color="white").pa-3 {{ icons.mdiPatreon }}

                      v-btn(
                        text
                        small
                        block
                        color="blue"
                        :href="authPatreon"
                      ).mt-2 {{ $t('editor.profile.connect') }}

              v-divider.mt-2.mb-4.mx-6

              v-list-item
                v-row.px-6
                  div.text--secondary
                    p.text-body-2 {{ $t('editor.profile.warning.main') }}
                    p.text-caption {{ $t('editor.profile.warning.ps') }}

          v-spacer

          v-menu(:close-on-content-click="false")
            template(v-slot:activator="{ on, attrs }")
              v-btn(
                text
                v-bind="attrs"
                v-on="on"
              ).px-1 {{ $t('editor.profile.email.title') }}

            v-card
              v-list
                v-list-item
                  v-list-item-action
                    v-switch(v-model="user.allowMailing")

                  v-list-item-title {{ $t('editor.profile.email.switch') }}

          v-spacer
          v-btn.px-1(
            :href="url + '/auth/logout'"
            text
            color="red"
          ) {{ $t('editor.profile.logout') }}
            v-icon(right) {{ icons.mdiLogoutVariant }}

      v-divider

      v-list-item.py-2(v-if="user.patron !== 'Huge supporter'")
        v-spacer

        div.d-none.d-sm-flex
          v-btn.mx-3.my-1(
            v-if="user.patron !== 'Huge supporter' && user.patron !== 'Basic supporter'"
            small
            outlined
            color="blue-grey lighten-4"
            href="https://www.patreon.com/join/the_fluffies/checkout?rid=3797254"
            :title="$t('editor.saves.patreon.basic')"
            :aria-label="$t('editor.saves.patreon.basic')"
          ) Basic support
            v-icon(right) {{ icons.mdiPatreon }}

          v-btn.mx-3.my-1(
            v-if="user.patron !== 'Huge supporter'"
            small
            outlined
            color="yellow accent-4"
            href="https://www.patreon.com/join/the_fluffies/checkout?rid=3797257"
            :title="$t('editor.saves.patreon.huge')"
            :aria-label="$t('editor.saves.patreon.huge')"
          ) Huge support
            v-icon(right) {{ icons.mdiPatreon }}

        div.d-flex.d-sm-none
          v-btn.mx-3.my-1(
            v-if="user.patron !== 'Basic supporter' && user.patron !== 'Huge supporter'"
            small
            outlined
            color="blue-grey lighten-4"
            href="https://www.patreon.com/join/the_fluffies/checkout?rid=3797254"
            :title="$t('editor.saves.patreon.basic')"
            :aria-label="$t('editor.saves.patreon.basic')"
          ) Basic
            v-icon(right) {{ icons.mdiPatreon }}

          v-btn.mx-3.my-1(
            v-if="user.patron !== 'Huge supporter'"
            small
            outlined
            color="yellow accent-4"
            href="https://www.patreon.com/join/the_fluffies/checkout?rid=3797257"
            :title="$t('editor.saves.patreon.huge')"
            :aria-label="$t('editor.saves.patreon.huge')"
          ) Huge
            v-icon(right) {{ icons.mdiPatreon }}

        v-spacer

      v-divider

      v-list-item.mb-n4.text-center
        v-list-item-title {{ $t('editor.profile.level') }}

      v-list-item.pb-2
        v-col
          v-progress-linear.my-3(
            :value="(100 / 7) * user.level"
            height=16
            rounded
            striped
            :color="badgeColor(user.level)"
          )
            v-row.px-3
              v-spacer
              span |
              v-spacer
              span |
              v-spacer
              span |
              v-spacer
              span |
              v-spacer
              span |
              v-spacer
              span |
              v-spacer

          div(v-if="user.levelGiven && user.level === 7")
            v-alert.ma-0.pa-1.text-center(color="purple accent-2" text dense)
              div(style="color: white") {{ $t('editor.profile.maximum.title') }}
              div.text-caption {{ $t('editor.profile.maximum.subtitle') }}

          div(v-else)
            v-row.mx-0.my-1(v-if="timeLeft > 0")
              span.text-caption {{ $t('editor.profile.left') }}
              v-spacer
              span.text-caption {{ timeFormat }}

            v-row.mx-0.my-1(v-else)
              v-spacer
              span.text-caption {{ $t('editor.profile.timeleft') }}
              v-spacer

            v-progress-linear(
              :value="100 - (timeLeft / 3)"
              height=8
              rounded
              striped
              color="grey"
            )

        div#badge.mb-8
          div(
            v-for="i in cornersCount"
            :style="underBadgeStyle(cornersCount, i, user.level)"
          )

        v-list-item-avatar.text-h5.mb-10(
          :color="badgeColor(user.level)"
          size=52
        )
          span.white--text.abs-center {{ user.level }}

      v-divider

      v-list-item.py-2.py-0
        v-col
          v-list-item-title.mb-4.text-center {{ $t('editor.profile.limits.title') }}
          p {{ $t('editor.profile.limits.saves') }}
            span.px-2.py-1.mx-1.rounded(
              :style="[underBadgeColor(user.level), { color: '#222' }]"
            ) {{ savesSlotsCount }}

    v-card(v-else dark)
      v-card-title.text-subtitle-1 {{ $t('editor.profile.auth') }}
        v-spacer
        v-btn.mx-n2(
          fab
          small
          @click="opened = false"
          :aria-label="$t('editor.back')"
        )
          v-icon {{ icons.mdiKeyboardBackspace }}

      v-card-subtitle.text-caption {{ $t('editor.profile.require') }}
      v-divider
      v-list-item.py-2
        v-list-item-content.pa-6
          v-row
            v-spacer

            v-btn(icon large :href="authGoogle")
              v-icon(large) {{ icons.mdiGoogle }}

            v-spacer

            v-btn(icon large :href="authVk")
              v-icon(large) {{ icons.mdiVk }}

            v-spacer

            v-btn(icon large :href="authPatreon")
              v-icon(large) {{ icons.mdiPatreon }}

            v-spacer
</template>

<script>
import { reactive, ref, onMounted, computed, watch } from '@vue/composition-api'

import axios from 'axios'
import jwt from 'jwt-simple'

import {
  mdiKeyboardBackspace,
  mdiGoogle,
  mdiVk,
  mdiTwitter,
  mdiLogoutVariant,
  mdiPatreon,
  mdiDelete
} from '@mdi/js'

import secret from '~/assets/json/configs/secret.json'

export default {
  setup(_, { root: { _i18n } }) {
    const icons = reactive({
      mdiKeyboardBackspace,
      mdiGoogle,
      mdiLogoutVariant,
      mdiPatreon,
      mdiVk,
      mdiTwitter,
      mdiDelete
    })

    const opened = ref(false)
    const openedAvatars = ref(false)

    const user = reactive({
      id: '',
      nickname: '',
      avatar: '',
      current: '',
      avatars: {},
      badges: [],
      level: 1,
      allowMailing: undefined,
      levelGiven: false,
      patron: undefined
    })

    const cornersCount = ref(0)
    const timeLeft = ref(0)

    const timeFormat = computed(() => {
      let seconds = (timeLeft.value % 60) + ''

      const minutes = Math.floor(timeLeft.value / 60)

      if (seconds < 10) {
        seconds = '0' + seconds
      }

      return minutes + ':' + seconds
    })

    const locale = _i18n.locale

    const rulesLang = {
      en: {
        more: 'Name must be more than 5 characters',
        less: 'Name must be less than 31 characters'
      },

      ru: {
        more: 'Длина имени должна быть больше 5 символов',
        less: 'Длина имени должна быть меньше 31 символа'
      }
    }

    const nameRules = ref([
      (v) => (v && v.length > 5) || rulesLang[locale].more,
      (v) => (v && v.length <= 30) || rulesLang[locale].less
    ])

    const url = ref('')

    if (process.browser) {
      if (window.location.hostname === 'localhost') {
        url.value = 'http://localhost:5001'
      } else {
        url.value = 'https://the-fluffies.net'
      }
    }

    const authGoogle = ref(url.value + '/auth/google')
    const authVk = ref(url.value + '/auth/vkontakte')
    const authPatreon = ref(url.value + '/auth/patreon')

    function requestUser() {
      axios
        .get(url.value + '/user', { withCredentials: true })
        .then(({ data }) => {
          if (data.error) return

          const decoded = jwt.decode(data, secret.jwt || '')

          user.id = decoded.id
          user.nickname = decoded.nickname
          user.avatar = decoded.avatar
          user.current = decoded.current
          user.avatars = decoded.avatars
          user.badges = decoded.badges
          user.level = decoded.level
          user.allowMailing = decoded.allowMailing
          user.levelGiven = decoded.levelGiven
          user.patron = decoded.patron

          if (!user.levelGiven) {
            timeLeft.value = (decoded.left / 1000) | 0

            startCountDown()
          } else {
            clearInterval(requestUser)
          }

          if (user.level >= 3 && user.level < 5) {
            cornersCount.value = 1
          } else if (user.level >= 5 && user.level < 7) {
            cornersCount.value = 2
          } else if (user.level >= 7) {
            cornersCount.value = 3
          } else {
            cornersCount.value = 0
          }

          if (!firstchanges.user) {
            axios.post(url.value + '/user/lang', { lang: locale }, { withCredentials: true })

            firstchanges.user = true
          }
        })
        .catch(() => {})
    }

    function badgeColor(level) {
      if (level < 3) {
        return 'grey'
      } else if (level >= 3 && level < 5) {
        return 'cyan'
      } else if (level >= 5 && level < 7) {
        return 'indigo'
      } else if (level >= 7) {
        return 'purple'
      }
    }

    function underBadgeColor(level) {
      if (level < 3) {
        return { background: '#E0E0E0' }
      } else if (level >= 3 && level < 5) {
        return { background: '#00E5FF' }
      } else if (level >= 5 && level < 7) {
        return { background: '#3D5AFE' }
      } else if (level >= 7) {
        return { background: '#D500F9' }
      }
    }

    function underBadgeStyle(cornersCount, index, level) {
      return [
        { transform: 'rotate(' + ((90 / cornersCount) * (index + 1) + 45) + 'deg)' },
        underBadgeColor(level)
      ]
    }

    let ticker

    function startCountDown() {
      if (ticker) {
        clearInterval(ticker)
      }

      if (!user.levelGiven) {
        ticker = setInterval(() => {
          if (timeLeft.value < 1) {
            clearInterval(ticker)

            requestUser()
          } else {
            timeLeft.value = timeLeft.value - 1
          }
        }, 1000)
      } else {
        clearInterval(ticker)
      }
    }

    const firstchanges = {
      nickname: false,
      email: false,
      user: false
    }

    let nicknameTimeout

    watch(
      () => user.nickname,
      (newNickname) => {
        if (firstchanges.nickname) {
          if (nicknameTimeout) {
            clearTimeout(nicknameTimeout)
          }

          const nameLen = newNickname.length

          if (nameLen > 5 && nameLen <= 30) {
            nicknameTimeout = setTimeout(() => {
              axios.post(
                url.value + '/user/change/name',
                { nickname: newNickname },
                { withCredentials: true }
              )
            }, 3000)
          }
        } else {
          firstchanges.nickname = true
        }
      }
    )

    onMounted(() => {
      requestUser()
    })

    function visibilityChange() {
      if (!document.hidden) {
        requestUser()
      }
    }

    if (process.browser) {
      document.addEventListener('visibilitychange', visibilityChange, false)
    }

    function accountSelect(current) {
      axios
        .post(url.value + '/user/change/current', { current }, { withCredentials: true })
        .then(() => requestUser())
    }

    function accountDelete(account) {
      axios
        .post(url.value + '/user/unlink', { account }, { withCredentials: true })
        .then(() => requestUser())
    }

    watch(
      () => user.allowMailing,
      (mailing) => {
        if (firstchanges.email) {
          axios.post(url.value + '/user/change/mailing', { mailing }, { withCredentials: true })
        } else {
          firstchanges.email = true
        }
      }
    )

    const patronageColor = computed(() => {
      if (user.patron === 'Little supporter') {
        return 'deep-orange darken-3'
      } else if (user.patron === 'Basic supporter') {
        return 'blue-grey lighten-4'
      } else if (user.patron === 'Huge supporter') {
        return 'yellow accent-4'
      }
    })

    const dialogPatronBorder = computed(() => {
      if (user.patron === 'Little supporter') {
        return { border: '4px solid #D84315' }
      } else if (user.patron === 'Basic supporter') {
        return { border: '4px solid #CFD8DC' }
      } else if (user.patron === 'Huge supporter') {
        return { border: '4px solid #FFD600' }
      }
    })

    const savesSlotsCount = computed(() => {
      if (user.patron === 'Basic supporter') {
        return 4 + user.level * 3
      } else if (user.patron === 'Huge supporter') {
        return 8 + user.level * 6
      } else {
        return 3 + user.level
      }
    })

    return {
      opened,
      openedAvatars,
      user,
      url,
      nameRules,
      authGoogle,
      authVk,
      authPatreon,
      badgeColor,
      underBadgeColor,
      cornersCount,
      underBadgeStyle,
      timeLeft,
      timeFormat,
      startCountDown,
      requestUser,
      accountSelect,
      accountDelete,
      patronageColor,
      dialogPatronBorder,
      savesSlotsCount,
      icons
    }
  }
}
</script>

<style lang="sass">
.horiz-center
  left: 50%
  transform: translate(-50%)

.abs-center
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)

#badge
  height: 48px

  div
    width: 48px
    height: 48px
    position: absolute
    right: 17px

#avatar-icon
  height: 52px!important
  width: 38px!important
  left: 2px!important

#button-avatar
  top: -72px!important
  pointer-events: auto

  .v-badge
    margin-right: 1px!important

#opacity-lower
  opacity: 0.7!important
</style>
