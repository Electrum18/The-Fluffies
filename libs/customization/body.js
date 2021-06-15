const Body = {
  Fur: {
    value: 'fur_basic',
    shade: 'fur_shade',
    isColor: true,
  },

  Stripes: {
    folder: {
      'Stripes enable': { value: 'stripes_enable' },
      'Stripes color': {
        value: 'stripes_basic',
        isColor: true,
      },
    },
  },

  Freckles: {
    folder: {
      Nose: { value: 'freckles_nose' },
      Cheeks: { value: 'freckles_cheeks' },
      'Freckles color': {
        value: 'freckles_basic',
        isColor: true,
      },
    },
  },

  Fluff: {
    folder: {
      'Cheeks fluff': { value: 'fluff_cheeks' },
      Chest: { value: 'fluff_chest' },
      Neck: { value: 'fluff_neck' },
      Hooves: { value: 'fluff_hooves' },
      'Fluff color': {
        value: 'fluff_basic',
        shade: 'fluff_shade',
        isColor: true,
      },
    },
  },

  'Second color': {
    folder: {
      Enable: { value: 'fur_second_color' },
      Color: {
        value: 'fur_second_basic',
        shade: 'fur_second_shade',
        isColor: true,
      },
    },
  },
}

export default Body
