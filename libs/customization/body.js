const Body = {
  Fur: { value: 'fur_basic', isColor: true },

  Stripes: {
    folder: {
      'Stripes enable': { value: 'stripes_enable' },
      'Stripes color': { value: 'stripes_basic', isColor: true },
    },
  },

  Freckles: {
    folder: {
      'Freckles enable': { value: 'freckles_nose' },
      'Freckles color': { value: 'freckles_basic', isColor: true },
    },
  },

  Fluff: {
    folder: {
      'Cheeks fluff': { value: 'fluff_cheeks' },
      Chest: { value: 'fluff_chest' },
      Neck: { value: 'fluff_neck' },
      Hooves: { value: 'fluff_hooves' },
      'Fluff color': { value: 'fluff_basic', isColor: true },
    },
  },

  'Second color': {
    folder: {
      Enable: { value: 'fur_second_color' },
      Color: { value: 'fur_second_basic', isColor: true },
    },
  },
}

export default Body
