import abs from 'abs-svg-path'
import parse from 'parse-svg-path'
import curvify from 'curvify-svg-path'
import Body from './dataMerge'
import Emotions from './emotionsMerge'

import HornEmpty from '~/assets/json/data/horn_front/empty.json'
import HornBasic from '~/assets/json/data/horn_front/basic.json'
import HornChangeling from '~/assets/json/data/horn_front/changeling.json'
import HornLong from '~/assets/json/data/horn_front/long.json'
import HornBugLong from '~/assets/json/data/horn_front/bug_long.json'

import HornsEmpty from '~/assets/json/data/horns/empty.json'
import HornsLong from '~/assets/json/data/horns/long.json'
import HornsDeer from '~/assets/json/data/horns/deer.json'

import GlassesEmpty from '~/assets/json/data/glasses/empty.json'
import GlassesClassic from '~/assets/json/data/glasses/classic.json'
import GlassesMonolens from '~/assets/json/data/glasses/monolens.json'
import GlassesTeashades from '~/assets/json/data/glasses/teashades.json'

import EarsBasic from '~/assets/json/data/ears/basic.json'
import EarsTassels from '~/assets/json/data/ears/tassels.json'
import EarsFluff from '~/assets/json/data/ears/fluff.json'
import EarsFluffTassels from '~/assets/json/data/ears/fluff_tassels.json'
import EarsWolf from '~/assets/json/data/ears/wolf.json'
import EarsCat from '~/assets/json/data/ears/cat.json'
import EarsBunny from '~/assets/json/data/ears/bunny.json'
import EarsGriffon from '~/assets/json/data/ears/griffon.json'

import ClothingEmpty from '~/assets/json/data/clothing/empty.json'
import ClothingHoodie from '~/assets/json/data/clothing/hoodie.json'
import ClothingShirt from '~/assets/json/data/clothing/shirt.json'
import ClothingSweater from '~/assets/json/data/clothing/sweater.json'

import PantsEmpty from '~/assets/json/data/pants/empty.json'
import PantsBasic from '~/assets/json/data/pants/basic.json'
import PantsShorts from '~/assets/json/data/pants/shorts.json'

import PiercingsEarsEmpty from '~/assets/json/data/piercings_ears/empty.json'
import PiercingsEarsRingsOne from '~/assets/json/data/piercings_ears/one_ring.json'
import PiercingsEarsRingsTwo from '~/assets/json/data/piercings_ears/two_rings.json'
import PiercingsEarsRingsThree from '~/assets/json/data/piercings_ears/three_rings.json'
import PiercingsEarsDotsOne from '~/assets/json/data/piercings_ears/one_dot.json'
import PiercingsEarsDotsTwo from '~/assets/json/data/piercings_ears/two_dots.json'
import PiercingsEarsDotsThree from '~/assets/json/data/piercings_ears/three_dots.json'
import PiercingsEarsDotsBig from '~/assets/json/data/piercings_ears/big_dot.json'
import PiercingsEarsStars from '~/assets/json/data/piercings_ears/stars.json'
import PiercingsEarsHearts from '~/assets/json/data/piercings_ears/hearts.json'

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
  keys: [],

  body: FormatSVGinJSON(Body),
  emotions: FormatSVGinJSON(Emotions),

  horn_front: {
    Empty: FormatSVGinJSON(HornEmpty),
    Basic: FormatSVGinJSON(HornBasic),
    Changeling: FormatSVGinJSON(HornChangeling),
    Long: FormatSVGinJSON(HornLong),
    "Bug long": FormatSVGinJSON(HornBugLong)
  },

  horn: {
    Empty: FormatSVGinJSON(HornsEmpty),
    Long: FormatSVGinJSON(HornsLong),
    Deer: FormatSVGinJSON(HornsDeer)
  },

  glasses: {
    Empty: FormatSVGinJSON(GlassesEmpty),
    Classic: FormatSVGinJSON(GlassesClassic),
    Monolens: FormatSVGinJSON(GlassesMonolens),
    Teashades: FormatSVGinJSON(GlassesTeashades)
  },

  ears: {
    Basic: FormatSVGinJSON(EarsBasic),
    Tassels: FormatSVGinJSON(EarsTassels),
    Fluff: FormatSVGinJSON(EarsFluff),
    "Fluff tassels": FormatSVGinJSON(EarsFluffTassels),
    Wolf: FormatSVGinJSON(EarsWolf),
    Cat: FormatSVGinJSON(EarsCat),
    Bunny: FormatSVGinJSON(EarsBunny),
    Griffon: FormatSVGinJSON(EarsGriffon)
  },

  clothing: {
    Empty: FormatSVGinJSON(ClothingEmpty),
    Hoodie: FormatSVGinJSON(ClothingHoodie),
    Shirt: FormatSVGinJSON(ClothingShirt),
    Sweater: FormatSVGinJSON(ClothingSweater)
  },

  pants: {
    Empty: FormatSVGinJSON(PantsEmpty),
    Basic: FormatSVGinJSON(PantsBasic),
    Shorts: FormatSVGinJSON(PantsShorts)
  },

  piercings_ears: {
    Empty: FormatSVGinJSON(PiercingsEarsEmpty),
    "One ring": FormatSVGinJSON(PiercingsEarsRingsOne),
    "Two rings": FormatSVGinJSON(PiercingsEarsRingsTwo),
    "Three rings": FormatSVGinJSON(PiercingsEarsRingsThree),
    "One dot": FormatSVGinJSON(PiercingsEarsDotsOne),
    "Two dots": FormatSVGinJSON(PiercingsEarsDotsTwo),
    "Three dots": FormatSVGinJSON(PiercingsEarsDotsThree),
    "Big dot": FormatSVGinJSON(PiercingsEarsDotsBig),
    "Stars": FormatSVGinJSON(PiercingsEarsStars),
    "Hearts": FormatSVGinJSON(PiercingsEarsHearts)
  },

  hairs: {},
  tails: {}
}

const keys = Object.keys(CompiledPaths)

keys.shift()

CompiledPaths.keys = keys

export { FormatSVGinJSON, CompiledPaths }
