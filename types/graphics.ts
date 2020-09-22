interface IDrawProps {
  eyes_brows_color: any
  male: boolean
  hair_name_en: string
  tail_name_en: string
  hooves_enable: boolean
}

interface IWindElemArray {
  [index: number]: number | null
}

interface IWindElem {
  [index: string]: IWindElemArray
}

interface IWind {
  [index: string]: IWindElem | IWindElemArray
}

interface IWindPropers {
  enabled: boolean
  cycle: number
}

type TPosition = [number, number] | undefined
type TClip = [string[] | string, TPosition]

interface IColor {
  h: number
  s: number
  l: number
  a?: number
}

interface IColors {
  [index: string]: IColor | undefined
}

type TAngle = [number, TPosition] | undefined

type IMirror = 1 | -1

export {
  IDrawProps,
  IWind,
  IWindPropers,
  IWindElemArray,
  IWindElem,
  IMirror,
  IColor,
  IColors,
  TAngle,
  TPosition,
  TClip
}