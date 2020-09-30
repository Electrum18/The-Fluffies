import preOrigins from '~/assets/json/configs/origins.json'

interface IObject<T> {
  [index: string]: T
}

type XY = [number, number]

const origins: IObject<number[][]> = preOrigins

function Interpolate(A: number, B: number, range: number) {
  return A + (B - A) * range
}

function InterpolateXY(A: XY, B: XY, range: number): XY {
  return [
    (Interpolate(A[0], B[0], range) | 0) - 512,
    (Interpolate(A[1], B[1], range) | 0) - 512
  ]
}

export default function(percent: number) {
  const keys = Object.keys(origins)

  const coordsMap: IObject<XY> = {}

  for (let i = 0; i < keys.length; i++) {
    const coords: XY[] = origins[keys[i]] as any

    const fullRange = (1 - (percent * 0.99)) * (coords.length - 1)

    const frame = fullRange | 0
    const range = fullRange - frame

    coordsMap[keys[i]] = InterpolateXY(coords[frame], coords[frame + 1], range)
  }

  return coordsMap
}