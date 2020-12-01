import colors from 'vuetify/es5/util/colors'

import EngilshIcon from '~/components/editor/IconEnglish.vue'
import RussianIcon from '~/components/editor/IconRussian.vue'

import AvatarPonyIcon from '~/components/editor/IconPony.vue'
import AvatarPonyIconTalking from '~/components/editor/IconPonyTalking.vue'

export default {
  theme: {
    themes: {
      light: {
        primary: colors.amber.accent4,
        url: colors.indigo.darken1,
        lang: colors.purple.darken1
      },

      dark: {
        primary: colors.amber.accent4,
        url: colors.blue.lighten2,
        lang: colors.deepPurple.accent1
      }
    },

    options: { variations: false }
  },

  icons: {
    iconfont: 'mdiSvg',
    values: {
      english: { component: EngilshIcon },
      russian: { component: RussianIcon },
      pony: { component: AvatarPonyIcon },
      ponyTalking: { component: AvatarPonyIconTalking }
    }
  }
}
