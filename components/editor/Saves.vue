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

        v-divider

        v-file-input.px-2.my-3(
          dense
          accept=".json"
          hide-details
          @change="upload"
          :disabled="savesLength >= maxLength"
          :prepend-icon="icons.mdiUpload"
          :label="$t('editor.saves.upload')"
        )

        v-divider

        v-card-title.py-1.subtitle-2 {{ $t('editor.saves.limit') }}
          v-spacer
          span {{ savesLength }} {{ $t('editor.saves.of') }} {{ maxLength }}

        v-row(justify="center")
          v-btn.mx-3.my-1(
            small
            outlined
            disabled
            color="blue-grey lighten-4"
            :title="$t('editor.saves.patreon.basic')"
            :aria-label="$t('editor.saves.patreon.basic')"
          ) + 15
            v-icon(right) {{ icons.mdiPatreon }}

          v-btn.mx-3.my-1(
            small
            outlined
            disabled
            color="yellow accent-4"
            :title="$t('editor.saves.patreon.huge')"
            :aria-label="$t('editor.saves.patreon.huge')"
          ) + 35
            v-icon(right) {{ icons.mdiPatreon }}

        v-divider

        v-card-title.py-1.subtitle-2 {{ $t('editor.saves.create') }}

        v-row(justify="center")
          v-btn.my-1(
            small
            text
            color="primary"
            @click="createSave(0)"
            :disabled="savesLength >= maxLength"
            :title="$t('editor.saves.pony')"
            :aria-label="$t('editor.saves.pony')"
          ) {{ $t('editor.saves.pony') }}

          v-btn.my-1(
            small
            text
            color="primary"
            @click="createSave(1)"
            :disabled="savesLength >= maxLength"
            :title="$t('editor.saves.zebra')"
            :aria-label="$t('editor.saves.zebra')"
          ) {{ $t('editor.saves.zebra') }}

          v-btn.my-1(
            small
            text
            color="primary"
            @click="createSave(2)"
            :disabled="savesLength >= maxLength"
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
                :disabled="i >= 10"
              )
                v-list-item-content
                  v-list-item-title {{ i + 1 }} • {{ save.globals.name }}

                v-list-item-action.mx-n2.my-0
                  v-row
                    v-btn(
                      icon
                      :href="encodeSave(saves[i])"
                      :download="saves[i].globals.name + '.json'"
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

import { mdiKeyboardBackspace, mdiDelete, mdiPatreon, mdiDownload, mdiUpload } from '@mdi/js'

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

      defaultIndex: 0,

      maxLength: 10,

      icons: {
        mdiKeyboardBackspace,
        mdiDelete,
        mdiPatreon,
        mdiDownload,
        mdiUpload
      }
    }
  },

  computed: {
    ...mapGetters('avatar', ['getGlobal', 'getDefault']),

    savesLength() {
      return this.saves !== null ? this.saves.length : 0
    }
  },

  watch: {
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
      return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(object))
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
    }
  }
}
</script>
