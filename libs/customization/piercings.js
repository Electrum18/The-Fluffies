import PiercingsList from '@/configs/changeable/piercings/ears.json'

const Piercings = {
  'Piercing color': { value: 'piercings_basic', isColor: true },

  'Piercing types': {
    folder: {
      'Piercing list': {
        value: 'piercing_ears',
        list: PiercingsList,
        imgSrc: 'piercing_ears/',
      },
    },
  },
}

export default Piercings
