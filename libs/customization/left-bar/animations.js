const SaveAnimation = {
  'Current anim save': {
    folder: {
      Import: { button: () => console.log('Import') },
      Export: { button: () => console.log('Export') },
      'To profile': { button: () => console.log('To profile') },
      Remove: { button: () => console.log('Remove') },
    },
  },
  'Local anim saves': {
    folder: {
      'Saves anim local': { importList: ['One', 'Two', 'Three'] },
    },
  },
}

export default SaveAnimation
