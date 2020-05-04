import abs from 'abs-svg-path'
import parse from 'parse-svg-path'
import curvify from 'curvify-svg-path'

import Body from '~/assets/js/dataMerge'
import Emotions from '~/assets/js/emotionsMerge'

import HornLong from '~/assets/json/data/horns/long.json'
import HornDeer from '~/assets/json/data/horns/deer.json'

import GlassesClassic from '~/assets/json/data/glasses/classic.json'
import GlassesMonolens from '~/assets/json/data/glasses/monolens.json'
import GlassesTeashades from '~/assets/json/data/glasses/teashades.json'

export function FormatSVGinJSON(json) {
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

export const CompiledPaths = {
  keys: ['body', 'emotions', 'horn', 'glasses', 'hairs'],

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

  hairs: {}
}
