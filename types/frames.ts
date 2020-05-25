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
}

export {
  IFrame,
  IFrames
}