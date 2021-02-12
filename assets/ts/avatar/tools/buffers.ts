import * as PIXI from 'pixi.js'

type TPoints = number[][]

// Creates a geometry with buffers from arrays of numbers
function createBuffers(id: string, geometry: PIXI.Geometry, values: TPoints[]) {
  for (let value = 0; value < values.length; value++) {
    const index = value * 2

    geometry
      .addAttribute(id + (index + 1), values[value][0])
      .addAttribute(id + (index + 2), values[value][1])
  }

  return geometry
}

interface IUpdateValues {
  currValue: number[]
  nextValue: number[]
}

// Updates buffers from a word-and-digit array
function updateBuffers(id: string, geometry: PIXI.Geometry, values: IUpdateValues[]) {
  for (let value = 0; value < values.length; value++) {
    const { currValue, nextValue } = values[value]
    const index = value * 2

    geometry.getBuffer(id + (index + 1)).update((currValue as unknown) as ArrayBuffer)
    geometry.getBuffer(id + (index + 2)).update((nextValue as unknown) as ArrayBuffer)
  }
}

export { createBuffers, updateBuffers }
