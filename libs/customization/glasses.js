import GlassesList from '@/configs/changeable/glasses.json'

const Glasses = {
  Color: { value: 'glasses_lenses', isColor: true },
  Frame: { value: 'glasses_frame', isColor: true },

  'Glass types': {
    folder: {
      'Types glass': {
        value: 'glasses',
        list: GlassesList,
        imgSrc: 'glasses/',
      },
    },
  },
}

export default Glasses
