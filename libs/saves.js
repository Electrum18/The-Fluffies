import Booleans from '@/configs/default/booleans.json'
import PreColors from '@/configs/default/color.json'
import Names from '@/configs/default/names.json'

const Colors = {}

for (const key in PreColors) {
  if (!key.match(/_shade/)) Colors[key] = PreColors[key]
}

function renameNames(names) {
  for (const key in names) {
    if (/_name_en/.test(key)) {
      names[key.replace('_name_en', '')] = names[key]

      delete names[key]
    } else if (/_name_ru/.test(key)) {
      delete names[key]
    }
  }
}

function validate(ref, checking) {
  for (const key in checking) {
    if (ref[key] === undefined) ref[key] = checking[key]
  }

  for (const key in ref) {
    if (!checking[key] === undefined) delete ref[key]
  }
}

export function parsePersonSave({ names, booleans, globals, color, colors }) {
  const preNames = names || {}
  const preBooleans = booleans || {}
  const preColors = color || colors || {}

  if (globals) {
    for (const key in globals) {
      switch (typeof globals[key]) {
        case 'string':
          preNames[key] = globals[key]
          break
        case 'boolean':
          preBooleans[key] = globals[key]
          break
        default:
          break
      }
    }
  }

  renameNames(preNames)

  validate(preNames, Names)
  validate(preBooleans, Booleans)
  validate(preColors, Colors)

  return { names: preNames, booleans: preBooleans, color: preColors }
}

export function validateSaves(saves) {
  const array = []

  for (const save of saves) {
    const { names, booleans, color } = parsePersonSave(save)

    array.push({ names, booleans, colors: color })
  }

  return array
}

export function getSaves(state) {
  const { saves } = state.profile.selected ? state.profile : state

  return saves
}

export function getSave(state) {
  const { saves, slot } = state.profile.selected ? state.profile : state

  return saves[slot]
}

export function getSaveValue(state, name) {
  const { saves, slot } = state.profile.selected ? state.profile : state

  return saves[slot][name]
}

export function getSaveSlot(state) {
  const { slot } = state.profile.selected ? state.profile : state

  return slot
}

export function getSaveValueInner(state, type, name) {
  const { saves, slot } = state.profile.selected ? state.profile : state

  return saves[slot][type][name]
}

export function getProfileStoredSlot() {
  try {
    const slot = +localStorage.getItem('profile_slot')

    if (!isNaN(slot) && typeof slot === 'number') return slot
  } catch {
    return 0
  }
}

export function getProfileStoredSelected() {
  try {
    const boolean = !!+localStorage.getItem('profile_selected')

    if (typeof boolean === 'boolean') return boolean
  } catch {
    return false
  }
}
