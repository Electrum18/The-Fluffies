import { IObject } from '~/types/basic'

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

import propers from '~/assets/json/configs/properties.json'

const globals: IObject[] = [globalsPony, globalsZebra, globalsDeer] as any

enum races {
  pony,
  zebra,
  deer
}

// Apply lists configs

globals[races.pony].hair_info = Hairs
globals[races.pony].horn_info = Horns
globals[races.pony].glasses_info = Glasses

globals[races.zebra].hair_info = Hairs
globals[races.zebra].horn_info = Horns
globals[races.zebra].glasses_info = Glasses

globals[races.deer].hair_info = Hairs
globals[races.deer].horn_info = Horns
globals[races.deer].glasses_info = Glasses

export default {
  frame: 0,
  globals,
  color: [colorPony, colorZebra, colorDeer],
  propers
}
