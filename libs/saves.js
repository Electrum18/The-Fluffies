import Names from '@/configs/default/names.json'
import Booleans from '@/configs/default/booleans.json'
import PreColors from '@/configs/default/color.json'

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

export function parsePersonSave({ names, booleans, globals, color }) {
  const preNames = names || {}
  const preBooleans = booleans || {}
  const preColors = color || {}

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
