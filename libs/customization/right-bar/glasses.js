import GlassesList from '@/configs/changeable/glasses.json'

const Glasses = {
  Color: { color: 'glasses_lenses' },
  Frame: { color: 'glasses_frame' },

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
