import * as PIXI from 'pixi.js'

import { IObject } from './basic'

import { options } from '~/assets/ts/avatar/index'
import { initLibrary } from '~/assets/ts/avatar/library'
interface IElement {
  points: number[][]
  ids: number[]
}

type TElements = IObject<IElement>
type TRGB = [number, number, number]
type TRGBA = [number, number, number, number]

type TPosConditional = [[string[], number[]], [string[], number[]]]
type TAngleConditional = [string | [string, string, string], string]
type TColorConditional = [string[], string, string]

const { Elem, Outline, Mask, VarElem, VarOutline, Layer } = initLibrary(new PIXI.Application(), {})
interface ILibrary {
  Elem: typeof Elem
  VarElem: typeof VarElem
  Mask: typeof Mask
  Outline: typeof Outline
  VarOutline: typeof VarOutline
  Layer: typeof Layer
}

type TOptions = typeof options
interface IShortcutsJSON {
  Is: IObject<string[]>
  Pos: IObject<TPosConditional>
  Angle: IObject<TAngleConditional>
  Color: IObject<string | TColorConditional>
}

export {
  IElement,
  TElements,
  TRGB,
  TRGBA,
  TPosConditional,
  TAngleConditional,
  TColorConditional,
  TOptions,
  ILibrary,
  IShortcutsJSON
}
