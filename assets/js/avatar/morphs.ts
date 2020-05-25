import {
  IPaths,
  ICalculated,
  IScheme,
  IProperties,
  IObjectProps
} from '~/types/paths'

export function morph(a: IPaths, b: IPaths, range: number): IPaths {
  const newPath = []

  for (let i = 0; i < a.length; i++) {
    const part = a[i]
    const newPart = []

    for (let j = 0; j < part.length; j++) {
      const point = part[j] as number

      // Avoiding the move command
      if (j > 0) {
        newPart[j] = (point + (b[i][j] as number - point) * range) | 0
      } else {
        newPart[j] = point // Setting move command
      }
    }

    newPath[i] = newPart
  }

  return newPath
}

function emotionMorph(
  emotions: ICalculated,
  scheme: IScheme,
  paths: IPaths,
  frame: number,
  range: number,
  getProper: IProperties
) {
  const path1 = emotions[scheme[0][0] as string] || paths
  const path2 = emotions[scheme[0][1] as string] || paths

  return morph(
    morph(path1[frame] as IPaths, path1[frame + 1] as IPaths, range),
    morph(path2[frame] as IPaths, path2[frame + 1] as IPaths, range),

    getProper[scheme[1] as string] / 100
  )
}

export function schemeMorph(
  { paths, frame, range, key }: IObjectProps,

  emotions: ICalculated,
  scheme: IScheme,
  calculated: ICalculated,
  getProper: IProperties
) {
  const nested = !scheme[0][0][3]

  if (!nested) {
    calculated[key] = emotionMorph(emotions, scheme, paths, frame, range, getProper)
  } else {
    calculated[key] = morph(
      emotionMorph(emotions, scheme[0][0] as any, paths, frame, range, getProper),
      emotionMorph(emotions, scheme[0][1] as any, paths, frame, range, getProper),

      getProper[scheme[1] as string] / 100
    )
  }
}
