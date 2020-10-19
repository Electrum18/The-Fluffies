import abs from 'abs-svg-path'
import parse from 'parse-svg-path'
import curvify from 'curvify-svg-path'
import Body from './dataMerge'
import Emotions from './emotionsMerge'

import HornLong from '~/assets/json/data/horns/long.json'
import HornDeer from '~/assets/json/data/horns/deer.json'

import GlassesClassic from '~/assets/json/data/glasses/classic.json'
import GlassesMonolens from '~/assets/json/data/glasses/monolens.json'
import GlassesTeashades from '~/assets/json/data/glasses/teashades.json'

import ClothingHoodie from '~/assets/json/data/clothing/hoodie.json'
import ClothingShirt from '~/assets/json/data/clothing/shirt.json'
import ClothingSweater from '~/assets/json/data/clothing/sweater.json'

import PantsBasic from '~/assets/json/data/pants/basic.json'
import PantsShorts from '~/assets/json/data/pants/shorts.json'


import { IObject } from '~/types/basic'
import { ICompiledPaths } from '~/types/paths'

function FormatSVGinJSON(json: IObject): IObject {
  const keys = Object.keys(json)

  json.keys = keys

  for (let i = 0; i < keys.length; i++) {
    const pathsArr = json[keys[i]]

    for (let j = 0; j < pathsArr.length; j++) {
      if (pathsArr[j][0] === 'M') {
        pathsArr[j] = curvify(abs(parse(pathsArr[j])))
      }
    }
  }

  return json
}

const CompiledPaths: ICompiledPaths = {
  keys: ['body', 'emotions', 'horn', 'glasses', 'clothing', 'pants', 'hairs', 'tails'],

  body: FormatSVGinJSON(Body),
  emotions: FormatSVGinJSON(Emotions),

  horn: {
    Long: FormatSVGinJSON(HornLong),
    Deer: FormatSVGinJSON(HornDeer)
  },

  glasses: {
    Classic: FormatSVGinJSON(GlassesClassic),
    Monolens: FormatSVGinJSON(GlassesMonolens),
    Teashades: FormatSVGinJSON(GlassesTeashades)
  },

  clothing: {
    Hoodie: FormatSVGinJSON(ClothingHoodie),
    Shirt: FormatSVGinJSON(ClothingShirt),
    Sweater: FormatSVGinJSON(ClothingSweater)
  },

  pants: {
    Basic: FormatSVGinJSON(PantsBasic),
    Shorts: FormatSVGinJSON(PantsShorts)
  },

  hairs: {},
  tails: {}
}

export { FormatSVGinJSON, CompiledPaths }
