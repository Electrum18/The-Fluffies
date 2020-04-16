<template lang="pug">
  v-card(light :disabled="enable")
    v-list(two-line)
      v-list-item-group(
        v-model="selected"
        mandatory
        active-class="primary--text"
      )
        template(v-if="list.length" v-for="(element, i) in list")
          v-list-item(
            @click="setElementName(element.name)"
            :key="element.name[locLang]"
            :disabled="isHairList && offline && !getCached(element)"
          )
            v-list-item-content(:style="style(element)")
              v-list-item-title {{ element.name[locLang] }}
              v-list-item-subtitle {{ locale.by[locLang] }} {{ element.author }}
                v-icon.mx-2(
                  v-if="getCached(element)"
                  color="green"
                  small
                ) {{ icons.mdiCloudCheck }}

              v-list-item-action(v-if="element.warning").mx-0.my-1
                v-chip(
                  small
                  outlined
                  label
                  color="yellow darken-2"
                ) {{ element.warning[locLang] }}

          v-divider.border--light(
            v-if="i < list.length - 1"
            :key="i"
          )
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import { mdiCloudCheck } from '@mdi/js'

export default {
  props: {
    target: {
      type: String,
      default: '',
      required: true
    },

    isHairList: {
      type: Boolean,
      default: false
    },

    off: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      selected: 0,

      locale: {
        by: {
          en: 'author: ',
          ru: 'автор: '
        }
      },

      icons: {
        mdiCloudCheck
      }
    }
  },

  computed: {
    ...mapGetters('avatar', ['getGlobal', 'getHairsList']),

    enable() {
      return this.off ? !this.getGlobal[this.off] : false
    },

    locLang() {
      return this.$i18n.locale
    },

    list() {
      return this.getGlobal[this.target + '_info']
    },

    hairList() {
      if (this.isHairList) {
        return this.getHairsList
      } else {
        return []
      }
    },

    offline() {
      return this.$root.isOffline
    }
  },

  watch: {
    list(val) {
      this.setIndex(val)
    }
  },

  mounted() {
    const list = this.getGlobal[this.target + '_info']

    this.setIndex(list)
  },

  methods: {
    ...mapMutations('avatar', ['setGlobal']),

    setIndex(list) {
      const rootElementName = this.getGlobal[this.target + '_name_en']

      for (let i = 0, len = list.length; i < len; i++) {
        const element = list[i]

        if (element.name.en === rootElementName) {
          this.selected = i
        }
      }
    },

    setElementName(name) {
      this.setGlobal({
        path: this.target + '_name_en',
        value: name.en
      })

      this.setGlobal({
        path: this.target + '_name_ru',
        value: name.ru
      })
    },

    getCached(elemName) {
      return this.hairList.includes(elemName.name.en)
    },

    style(elem) {
      if (elem.warning) {
        return { 'padding-bottom': '4px' }
      } else {
        return { 'padding-bottom': '12px' }
      }
    }
  }
}
</script>

<style lang="sass">
hr.border--light
  border-color: rgba(0, 0, 0, 0.12)!important
</style>
