import colors from 'vuetify/es5/util/colors'
import AvatarPonyIcon from '~/components/editor/IconPony.vue'

export default {
  theme: {
    themes: {
      light: {
        primary: colors.amber.accent4,
        url: colors.indigo.darken1
      },

      dark: {
        primary: colors.amber.accent4,
        url: colors.blue.lighten2
      }
    }
  },

  icons: {
    iconfont: 'mdiSvg',
    values: {
      pony: {
        component: AvatarPonyIcon
      }
    }
  }
}
