import * as PIXI from 'pixi.js'

import { checkProperty } from './checking'
import { updateBuffers } from './buffers'

import { IObject } from '~/types/basic'
import { IElement } from '~/types/graphics'

import Powers from '~/assets/json/configs/power.json'

const powers: IObject<number> = Powers

const SAFE_RANGE_VALUE = 0.99
const HEAD_MAX_ANGLE = 90
const VALUE_MAXIMUM = 100

function interpolate(A: number, B: number, range: number): number {
  return A + (B - A) * range
}

// Compute morphing values
interface TMorphData {
  currValue: number[]
  nextValue: number[]
  range: number
}

function morphData(array: number[][], value: number, name: string): TMorphData {
  const absVal = Math.abs(value)
  const power = powers[name] || 1

  const summaryRange = (1 - absVal ** power) * (array.length - 1) * SAFE_RANGE_VALUE
  const index = Math.floor(summaryRange)

  return {
    currValue: array[index],
    nextValue: array[index + 1],
    range: summaryRange - index
  }
}

// Getting a vector between two vectors
function morphVec2(array: number[][], value: number, name: string) {
  const { currValue, nextValue, range } = morphData(array, value, name) as TMorphData

  return [
    interpolate(currValue[0], nextValue[0], range),
    interpolate(currValue[1], nextValue[1], range)
  ]
}

// Updating one shader buffer
function morphMesh(
  name: string,
  { degress }: IObject<any>,
  { geometry, shader: { uniforms } }: PIXI.Mesh,
  { points }: IElement
) {
  const normalDegress = degress / HEAD_MAX_ANGLE
  const data = morphData(points, normalDegress, name)

  updateBuffers('positions', geometry, [data])

  // Shader uniforms
  uniforms.phase = data.range
  uniforms.normalX = normalDegress
}

// Updating two shader buffers
function morphMeshDouble(
  name: string,
  propers: IObject<any>,
  { geometry, shader: { uniforms } }: PIXI.Mesh,
  { points }: IElement,
  { points: points2 }: IElement,
  properName: string
) {
  const normalDegress = propers.degress / HEAD_MAX_ANGLE
  const data = morphData(points, normalDegress, name)

  updateBuffers('positions', geometry, [data, morphData(points2, normalDegress, name)])

  // Shader uniforms
  uniforms.phase = data.range
  uniforms.phase2 =
    propers[checkProperty(properName, normalDegress).gettedProperty as string] / VALUE_MAXIMUM

  uniforms.normalX = normalDegress
}

// Updating four shader buffers
function morphMeshQuad(
  name: string,
  propers: IObject<any>,
  { geometry, shader: { uniforms } }: PIXI.Mesh,
  { points }: IElement,
  { points: points2 }: IElement,
  { points: points3 }: IElement,
  { points: points4 }: IElement,
  properName: string,
  properName2: string,
  properName3: string
) {
  const normalDegress = propers.degress / HEAD_MAX_ANGLE
  const data = morphData(points, normalDegress, name)

  updateBuffers('positions', geometry, [
    data,
    morphData(points2, normalDegress, name),
    morphData(points3, normalDegress, name),
    morphData(points4, normalDegress, name)
  ])

  // Shader uniforms
  uniforms.phase = data.range

  uniforms.phase2 =
    propers[checkProperty(properName, normalDegress).gettedProperty as string] / VALUE_MAXIMUM

  uniforms.phase3 =
    propers[checkProperty(properName2, normalDegress).gettedProperty as string] / VALUE_MAXIMUM

  uniforms.phase4 =
    propers[checkProperty(properName3, normalDegress).gettedProperty as string] / VALUE_MAXIMUM

  uniforms.normalX = normalDegress
}

export { interpolate, morphData, morphVec2, morphMesh, morphMeshDouble, morphMeshQuad }
