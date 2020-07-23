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

    v-card(v-if="user.id" dark)
      v-card-title {{ $t('editor.profile.title') }}
        v-spacer
        v-btn.mx-n2(
          fab
          small
          @click="opened = false"
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

      v-list-item.mx-2.mt-n4
        v-row
          v-spacer
          v-btn(
            :href="url + '/auth/logout'"
            text
            color="red"
          ) {{ $t('editor.profile.logout') }}
            v-icon(right) {{ icons.mdiLogoutVariant }}

      v-divider

      v-list-item.pt-2.mb-n4.text-center
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

          div(v-if="!user.levelGiven || user.level < 7")
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

          div(v-else)
            v-alert.ma-0.pa-1.text-center(color="purple accent-2" text dense)
              div(style="color: white") {{ $t('editor.profile.maximum.title') }}
              div.text-caption {{ $t('editor.profile.maximum.subtitle') }}

        div#badge.mb-8
          div(
            v-for="i in cornersCount"
            :style="underBadgeStyle(cornersCount, i, user.level)"
          )

        v-list-item-avatar.text-h5.mb-10(
          :color="badgeColor(user.level)"
          size=52
        ) {{ user.level }}

    v-card(v-else dark)
      v-card-title.text-subtitle-1 {{ $t('editor.profile.require') }}
        v-spacer
        v-btn.mx-n2(
          fab
          small
          @click="opened = false"
          :aria-label="$t('editor.back')"
        )
          v-icon {{ icons.mdiKeyboardBackspace }}

      v-divider
      v-list-item.py-2
        v-list-item-content
          v-row
            v-spacer
            v-btn(fab small light :href="authGoogle")
              v-icon {{ icons.mdiGoogle }}
            v-spacer
</template>

<script>
import { reactive, ref, onMounted, computed, watch } from '@vue/composition-api'
import axios from 'axios'

import { mdiKeyboardBackspace, mdiGoogle, mdiLogoutVariant } from '@mdi/js'

export default {
  setup(_, { root: { _i18n } }) {
    const icons = reactive({
      mdiKeyboardBackspace,
      mdiGoogle,
      mdiLogoutVariant
    })

    const opened = ref(false)

    const user = reactive({
      id: '',
      nickname: '',
      avatar: '',
      badges: [],
      level: 1,
      allowMailing: true,
      saves: [],
      levelGiven: false
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
        url.value = 'https://the-fluffies.net:3001'
      }
    }

    const authGoogle = ref(url.value + '/auth/google')

    function requestUser() {
      axios
        .get(url.value + '/user', { withCredentials: true })
        .then(({ data }) => {
          if (data.error) return

          user.id = data.id
          user.nickname = data.nickname
          user.avatar = data.avatar
          user.badges = data.badges
          user.level = data.level
          user.allowMailing = data.allowMailing
          user.saves = data.saves
          user.levelGiven = data.levelGiven

          if (!user.levelGiven && user.level < 7) {
            timeLeft.value = (data.left / 1000) | 0

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
          }
        })
        .catch((_) => {
          return undefined
        })
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

    function startCountDown() {
      let ticker

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

    let firstchange = false
    let nicknameTimeout

    watch(
      () => user.nickname,
      (newNickname) => {
        if (firstchange) {
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
          firstchange = true
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

    return {
      opened,
      user,
      url,
      nameRules,
      authGoogle,
      badgeColor,
      underBadgeColor,
      cornersCount,
      underBadgeStyle,
      timeLeft,
      timeFormat,
      startCountDown,
      requestUser,
      icons
    }
  }
}
</script>

<style lang="sass">
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
