import * as PIXI from 'pixi.js'

import { IObject } from './basic'

import { options } from '~/assets/ts/avatar'
import { initLibrary } from '~/assets/ts/library'

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

type TMasking = [string, string, string, string, 'MASK_DOUBLE'] | [string, string, 'MASK_INVERT']
type TMaskingTexture =
  | [PIXI.RenderTexture, PIXI.Container, PIXI.RenderTexture, PIXI.Container, 'MASK_DOUBLE']
  | [PIXI.RenderTexture, PIXI.Container, 'MASK_INVERT']

const { Elem, Outline, Mask, VarElem, VarOutline, Layer } = initLibrary({})

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
  Masking: IObject<TMasking>
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
  TMasking,
  TMaskingTexture,
  ILibrary,
  IShortcutsJSON
}
