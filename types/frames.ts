import { IObject } from "./basic"

interface IFrame {
  [index: string]: number
}

interface IFrames {
  readonly [index: number]: {
    duration: number
    frame: {
      angle: number
      horiz: number
      degress: number
    } & IFrame
  }

  length: number

  splice: (index: number, shift: number, content?: IObject) => void
}

export {
  IFrame,
  IFrames
}