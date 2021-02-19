import { hslToRgb } from './HSLtoRGB'

import { IObject } from '~/types/basic'
import { TColorConditional, TRGBA } from '~/types/graphics'

const EIGHTH = 0.125
const LIGHT_GRAY = 0.87

const isLeft = (value: string) => value === 'left'
const isRight = (value: string) => value === 'right'

export const isStringArray = (value: string[]) => value[1] && value[1][1]

// Checking for all matching global values
export function checkGlobals(globals: IObject<any>, conditions: string[]) {
  let condition = true

  for (let i = 0; i < conditions.length; i++) {
    if (conditions[i] === 'not') continue

    const global = globals[conditions[i]]

    condition = condition && (conditions[i - 1] === 'not' ? !global : global)
  }

  return condition
}

// Validation of properties
export function checkProperty(property: string | [string, string, string], normalAngle: number) {
  let gettedProperty = property
  let propertySide = 1

  if (isLeft(property[1]) || isRight(property[1])) {
    const [firstValuePart, side, secondValuePart] = property

    let correctSide = normalAngle < 0 ? 'right' : 'left' // Initially for the left side

    if (isRight(side)) correctSide = normalAngle < 0 ? 'left' : 'right'

    gettedProperty = firstValuePart + '_' + correctSide + '_' + secondValuePart
    propertySide = normalAngle < 0 ? -1 : 1
  }

  return { gettedProperty, propertySide }
}

const constantColors = {
  white: [1, 1, 1, 1],
  light_gray: [LIGHT_GRAY, LIGHT_GRAY, LIGHT_GRAY, 1],
  dark: [EIGHTH, EIGHTH, EIGHTH, 1],
  black: [0, 0, 0, 0]
}

interface IHSLA {
  [index: string]: {
    h: number
    s: number
    l: number
    a: number
  }
}

const findColor = (colors: IHSLA, name: string) => {
  return ((constantColors as IObject<number[]>)[name] || hslToRgb(colors[name])) as TRGBA
}

// Getting a color by name or with a condition
export function checkColor(colors: IHSLA, globals: IObject<any>, name: string | TColorConditional) {
  if (isStringArray(name as string[])) {
    const [global, trueColor, falseColor] = name as TColorConditional

    return findColor(colors, checkGlobals(globals, global) ? trueColor : falseColor)
  } else {
    return findColor(colors, name as string)
  }
}
