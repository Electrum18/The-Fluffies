<template lang="pug">
  v-navigation-drawer(
    v-model="open"
    dark
    fixed
    right
    temporary
    touchless
    :permanent="open"
    hide-overlay
  )
    v-container
      v-card(outlined)
        v-card-title {{ $t('editor.saves.save') }}
          v-spacer
          v-btn.mx-n2(
            fab
            small
            @click="close()"
            :aria-label="$t('editor.menu.close')"
          )
            v-icon {{ icons.mdiKeyboardBackspace }}

        v-divider.mb-2

        v-card-title.py-1.subtitle-2 {{ $t('editor.saves.cloud.title') }}
          v-spacer
          v-btn(small dark color="purple accent-2")
            v-icon(left) {{ icons.mdiCloud }}
            | {{ count }}

        v-row(v-if="online" justify="center")
          v-btn(
            @click="cloudDownload"
            text
            small
            color="purple accent-2"
          ) {{ $t('editor.saves.cloud.download') }}

          v-btn(
            @click="cloudUpload"
            text
            small
            color="purple accent-2"
          ) {{ $t('editor.saves.cloud.upload') }}

        v-row.ma-0(v-else justify="center")
          v-alert.ma-1(type="error" dense outlined) {{ $t('editor.saves.cloud.not_found') }}

        v-divider.my-2

        v-file-input.px-2.my-3(
          dense
          accept=".json"
          hide-details
          @change="upload"
          :disabled="savesLength >= savesLimits"
          :prepend-icon="icons.mdiUpload"
          :label="$t('editor.saves.upload')"
        )

        v-divider.my-2

        v-card-title.py-1.subtitle-2 {{ $t('editor.saves.limit') }}
          v-spacer
          span {{ savesLength }} {{ $t('editor.saves.of') }}
          span.px-1.py-0.mx-1.rounded(
            :style="underBadgeColor(level)"
          ) {{ savesLimits }}

        v-row(justify="center")
          v-btn.mx-3.my-1(
            v-if="patronage !== 'Basic supporter' && patronage !== 'Huge supporter'"
            small
            outlined
            color="blue-grey lighten-4"
            href="https://www.patreon.com/join/the_fluffies/checkout?rid=3797254"
            :title="$t('editor.saves.patreon.basic')"
            :aria-label="$t('editor.saves.patreon.basic')"
          ) + 15
            v-icon(right) {{ icons.mdiPatreon }}

          v-btn.mx-3.my-1(
            v-if="patronage !== 'Huge supporter'"
            small
            outlined
            color="yellow accent-4"
            href="https://www.patreon.com/join/the_fluffies/checkout?rid=3797257"
            :title="$t('editor.saves.patreon.huge')"
            :aria-label="$t('editor.saves.patreon.huge')"
          ) + 35
            v-icon(right) {{ icons.mdiPatreon }}

        v-divider.my-2

        v-card-title.py-1.subtitle-2 {{ $t('editor.saves.create') }}
        v-row(justify="center")
          v-btn.my-1(
            small
            text
            color="primary"
            @click="createSave(0)"
            :disabled="savesLength >= savesLimits"
            :title="$t('editor.saves.pony')"
            :aria-label="$t('editor.saves.pony')"
          ) {{ $t('editor.saves.pony') }}

          v-btn.my-1(
            small
            text
            color="primary"
            @click="createSave(1)"
            :disabled="savesLength >= savesLimits"
            :title="$t('editor.saves.zebra')"
            :aria-label="$t('editor.saves.zebra')"
          ) {{ $t('editor.saves.zebra') }}

          v-btn.my-1(
            small
            text
            color="primary"
            @click="createSave(2)"
            :disabled="savesLength >= savesLimits"
            :title="$t('editor.saves.deer')"
            :aria-label="$t('editor.saves.deer')"
          ) {{ $t('editor.saves.deer') }}

      v-card(light).my-4
        v-list
          v-list-item-group(
            v-model="slot"
            mandatory
            active-class="orange--text"
          )
            template(v-for="(save, i) in saves")
              v-list-item(
                :key="save.globals.name + i"
                :disabled="i >= savesLimits"
              )
                v-list-item-content
                  v-list-item-title {{ i + 1 }} • {{ save.globals.name }}

                v-list-item-action.mx-n2.my-0
                  v-row
                    v-btn(
                      icon
                      :href="encodeSave(save)"
                      :download="save.globals.name + '.json'"
                      :title="$t('editor.saves.download')"
                      :aria-label="$t('editor.saves.download')"
                    )
                      v-icon {{ icons.mdiDownload }}

                    v-btn.mr-2(
                      v-if="saves.length > 1 && i < 10"
                      icon
                      @click="removeSave(i)"
                      :title="$t('editor.saves.delete')"
                      :aria-label="$t('editor.saves.delete')"
                    )
                      v-icon {{ icons.mdiDelete }}

              v-divider.light(
                v-if="i + 1 < saves.length"
                :key="i"
              )
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

import axios from 'axios'
import jwt from 'jwt-simple'

import {
  mdiKeyboardBackspace,
  mdiDelete,
  mdiPatreon,
  mdiDownload,
  mdiUpload,
  mdiCloud
} from '@mdi/js'

import secret from '~/assets/json/configs/secret.json'

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      saves: null,
      slot: 0,

      level: 0,
      count: 0,
      patronage: undefined,

      defaultIndex: 0,

      online: true,

      icons: {
        mdiKeyboardBackspace,
        mdiDelete,
        mdiPatreon,
        mdiDownload,
        mdiUpload,
        mdiCloud
      }
    }
  },

  computed: {
    ...mapGetters('avatar', ['getGlobal', 'getDefault']),

    savesLength() {
      return this.saves !== null ? this.saves.length : 0
    },

    url() {
      if (process.browser) {
        if (window.location.hostname === 'localhost') {
          return 'http://localhost:5001'
        } else {
          return 'https://the-fluffies.net'
        }
      } else {
        return null
      }
    },

    savesLimits() {
      if (this.patronage === 'Basic supporter') {
        return 4 + this.level * 3
      } else if (this.patronage === 'Huge supporter') {
        return 8 + this.level * 6
      } else {
        return 3 + this.level
      }
    }
  },

  watch: {
    open() {
      this.cloudLimits()
    },

    slot(val) {
      const avatars = JSON.parse(localStorage.getItem('avatars'))

      if (avatars[val]) {
        this.setAvatar(avatars[val])

        localStorage.setItem('slot', val + '')
      } else if (val !== 0) {
        this.slot = 0
      }
    },

    'getGlobal.name'(name) {
      this.saves[this.slot].name = name
    }
  },

  mounted() {
    this.slot = this.getSlot()
    this.saves = this.getSave()

    const self = this

    function handleNetworkChange() {
      self.online = navigator.onLine
    }

    handleNetworkChange()

    function visibilityChange() {
      if (!document.hidden && self.open) self.cloudLimits()
    }

    if (process.browser) {
      window.addEventListener('online', handleNetworkChange)
      window.addEventListener('offline', handleNetworkChange)

      document.addEventListener('visibilitychange', visibilityChange, false)
    }
  },

  methods: {
    ...mapMutations('interface', ['setPage']),
    ...mapActions('avatar', ['setAvatar']),

    close() {
      this.setPage(false)
    },

    isEmpty(val) {
      return val === undefined || val === null
    },

    getSlot() {
      const slot = +localStorage.getItem('slot')

      if (slot && slot <= this.maxLength) {
        return slot
      } else {
        localStorage.setItem('slot', '0')

        return 0
      }
    },

    compability(target, reference) {
      const object = {}
      const keys = Object.keys(reference)

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]

        if (target[key] === undefined) {
          object[key] = reference[key]
        } else {
          object[key] = target[key]
        }

        if (typeof object[key] === 'object') {
          object[key] = this.compability(object[key], reference[key])
        }
      }

      return object
    },

    getSave() {
      let avatars = localStorage.getItem('avatars')

      if (avatars && avatars.length) {
        avatars = JSON.parse(avatars)

        const { globals, color } = this.getDefault

        for (let i = 0; i < avatars.length; i++) {
          const avatar = avatars[i]

          avatar.globals = this.compability(avatar.globals, globals[this.defaultIndex])
          avatar.color = this.compability(avatar.color, color[this.defaultIndex])
        }

        localStorage.setItem('avatars', JSON.stringify(avatars))

        this.setAvatar(avatars[this.slot])

        return avatars
      } else {
        const { frame, globals, color } = this.getDefault

        const save = { frame, globals: globals[this.defaultIndex], color: color[this.defaultIndex] }

        localStorage.setItem('avatars', JSON.stringify([save]))

        this.setAvatar(save)

        return [save]
      }
    },

    createSave(index) {
      const parsedData = JSON.parse(localStorage.getItem('avatars'))

      const { frame, globals, color } = this.getDefault

      const save = { frame, globals: globals[index], color: color[index] }

      parsedData.push(save)

      localStorage.setItem('avatars', JSON.stringify(parsedData))

      // Apply changes

      this.defaultIndex = index
      this.slot = parsedData.length - 1
      this.saves = this.getSave()
    },

    removeSave(slot) {
      const parsedData = JSON.parse(localStorage.getItem('avatars'))

      parsedData.splice(slot, 1)

      localStorage.setItem('avatars', JSON.stringify(parsedData))

      // Fix slot (index)

      this.slot = 0

      localStorage.setItem('slot', this.slot + '')

      // Apply changes

      this.saves = this.getSave()
    },

    encodeSave(object) {
      const tempObj = JSON.parse(JSON.stringify(object))

      tempObj.globals.hair_info = {}
      tempObj.globals.tail_info = {}
      tempObj.globals.glasses_info = {}
      tempObj.globals.horn_info = {}

      return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tempObj))
    },

    upload(file) {
      if (file) {
        const reader = new FileReader()

        reader.onload = () => {
          const parsedData = JSON.parse(localStorage.getItem('avatars'))

          parsedData.push(JSON.parse(reader.result))

          localStorage.setItem('avatars', JSON.stringify(parsedData))

          // Apply changes

          this.slot = parsedData.length - 1
          this.saves = this.getSave()
        }

        reader.readAsText(file)
      }
    },

    cloudLimits() {
      if (!this.open) return

      const self = this

      axios
        .get(self.url + '/user/saves/limits', { withCredentials: true })
        .then(({ data }) => {
          if (data.error) return

          const decoded = jwt.decode(data, secret.jwt || '')

          self.level = decoded.level
          self.count = decoded.count
          self.patronage = decoded.patron
        })
        .catch(() => {})
    },

    cloudDownload() {
      const self = this

      axios
        .get(self.url + '/user/saves', { withCredentials: true })
        .then(({ data }) => {
          if (data.error) return

          localStorage.setItem('avatars', JSON.stringify(data.saves))

          self.slot = 0
          self.saves = self.getSave()
        })
        .catch((_) => {
          return undefined
        })
    },

    cloudUpload() {
      const self = this

      axios
        .post(
          self.url + '/user/saves/characters',
          { saves: self.saves.slice(0, 50) },
          { withCredentials: true }
        )
        .then(() => self.cloudLimits())
    },

    underBadgeColor(level) {
      if (level < 3) {
        return { background: '#9E9E9E' }
      } else if (level >= 3 && level < 5) {
        return { background: '#00BCD4' }
      } else if (level >= 5 && level < 7) {
        return { background: '#3F51B5' }
      } else if (level >= 7) {
        return { background: '#9C27B0' }
      }
    }
  }
}
</script>
