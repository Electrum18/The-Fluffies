import globalsPony from '~/assets/json/configs/defaults/pony/globals.json'
import colorPony from '~/assets/json/configs/defaults/pony/color.json'

import globalsZebra from '~/assets/json/configs/defaults/zebra/globals.json'
import colorZebra from '~/assets/json/configs/defaults/zebra/color.json'

import globalsDeer from '~/assets/json/configs/defaults/deer/globals.json'
import colorDeer from '~/assets/json/configs/defaults/deer/color.json'

// Import lists configs

import Hairs from '~/assets/json/configs/names/hair.json'
import Horns from '~/assets/json/configs/names/horn.json'
import Glasses from '~/assets/json/configs/names/glasses.json'

// Apply lists configs

globalsPony.hair_info = Hairs
globalsPony.horn_info = Horns
globalsPony.glasses_info = Glasses

globalsZebra.hair_info = Hairs
globalsZebra.horn_info = Horns
globalsZebra.glasses_info = Glasses

globalsDeer.hair_info = Hairs
globalsDeer.horn_info = Horns
globalsDeer.glasses_info = Glasses

export default {
  frame: 0,
  globals: [globalsPony, globalsZebra, globalsDeer],
  color: [colorPony, colorZebra, colorDeer]
}
