const SavePerson = {
  'Current save': {
    folder: {
      Import: { button: () => console.log('Import') },
      Export: { button: () => console.log('Export') },
      'To profile': { button: () => console.log('To profile') },
      Remove: { button: () => console.log('Remove') },
    },
  },

  'Profile saves': {
    folder: {
      'Saves profile': { importList: ['One', 'Two', 'Three'] },
    },
  },

  'Local saves': {
    folder: {
      'Saves local': { importList: ['One', 'Two', 'Three'] },
    },
  },
}

export default SavePerson
