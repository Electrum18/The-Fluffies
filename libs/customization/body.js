const Body = {
  Fur: { color: 'fur_basic' },

  Stripes: {
    folder: {
      'Stripes enable': { boolean: 'stripes_enable' },
      'Stripes color': { color: 'stripes_basic' },
    },
  },

  Freckles: {
    folder: {
      'Freckles enable': { boolean: 'freckles_nose' },
      'Freckles color': { color: 'freckles_basic' },
    },
  },

  Fluff: {
    folder: {
      'Cheeks fluff': { boolean: 'fluff_cheeks' },
      Chest: { boolean: 'fluff_chest' },
      Neck: { boolean: 'fluff_neck' },
      Hooves: { boolean: 'fluff_hooves' },
      'Fluff color': { color: 'fluff_basic' },
    },
  },

  'Second body color': {
    folder: {
      'Body enable': { boolean: 'fur_second_color' },
      'Body color': { color: 'fur_second_basic' },
    },
  },
}

export default Body
