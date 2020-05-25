interface IDrawProps {
  male: boolean
  hair_name_en: string
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

type TPosition = [number, number]
type TClip = [string[] | string, TPosition]

interface IColor {
  h: number
  s: number
  l: number
  a?: number
}

type TAngle = [number, TPosition, number]

type IMirror = 1 | -1

export {
  IDrawProps,
  IWind,
  IWindPropers,
  IWindElemArray,
  IWindElem,
  IMirror,
  IColor,
  TAngle,
  TPosition,
  TClip
}