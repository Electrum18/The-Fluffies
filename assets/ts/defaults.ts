import { IObject } from '~/types/basic'

import globalsPony from '~/assets/json/configs/defaults/pony/globals.json'
import colorPony from '~/assets/json/configs/defaults/pony/color.json'

import globalsZebra from '~/assets/json/configs/defaults/zebra/globals.json'
import colorZebra from '~/assets/json/configs/defaults/zebra/color.json'

import globalsDeer from '~/assets/json/configs/defaults/deer/globals.json'
import colorDeer from '~/assets/json/configs/defaults/deer/color.json'

// Import lists configs

import Hairs from '~/assets/json/configs/names/hair.json'
import Tails from '~/assets/json/configs/names/tail.json'
import Horns from '~/assets/json/configs/names/horn.json'
import Glasses from '~/assets/json/configs/names/glasses.json'
import Clothing from '~/assets/json/configs/names/clothing.json'
import Pants from '~/assets/json/configs/names/pants.json'

import propers from '~/assets/json/configs/properties.json'

const globals: IObject[] = [globalsPony, globalsZebra, globalsDeer]

enum races {
  Pony,
  Zebra,
  Deer
}

// Apply lists configs

globals[races.Pony].hair_info = Hairs
globals[races.Pony].tail_info = Tails
globals[races.Pony].horn_info = Horns
globals[races.Pony].glasses_info = Glasses
globals[races.Pony].clothing_info = Clothing
globals[races.Pony].pants_info = Pants

globals[races.Zebra].hair_info = Hairs
globals[races.Zebra].tail_info = Tails
globals[races.Zebra].horn_info = Horns
globals[races.Zebra].glasses_info = Glasses
globals[races.Zebra].clothing_info = Clothing
globals[races.Zebra].pants_info = Pants

globals[races.Deer].hair_info = Hairs
globals[races.Deer].tail_info = Tails
globals[races.Deer].horn_info = Horns
globals[races.Deer].glasses_info = Glasses
globals[races.Deer].clothing_info = Clothing
globals[races.Deer].pants_info = Pants

export default {
  frame: 0,
  globals,
  color: [colorPony, colorZebra, colorDeer],
  propers
}
