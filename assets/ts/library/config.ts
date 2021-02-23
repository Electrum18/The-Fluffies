import * as PIXI from 'pixi.js'

import CM from '~/assets/json/configs/cross-morphs.json'
import Origins from '~/assets/json/configs/origins.json'

import { IObject } from '~/types/basic'
import { TElements } from '~/types/graphics'

export const crossMorph: IObject<any> = CM
export const origins: IObject<number[][]> = Origins
export const masks: { [index: string]: PIXI.Mesh } = {}
export const elements: TElements = {}
