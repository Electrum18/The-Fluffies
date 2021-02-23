import * as PIXI from 'pixi.js'

import { checkProperty, isStringArray } from '../tools/checking'
import { updateBuffers } from '../tools/buffers'

import { crossMorph, elements } from './config'

import { IObject } from '~/types/basic'

import Powers from '~/assets/json/configs/power.json'

const powers: IObject<number> = Powers

const SAFE_RANGE_VALUE = 0.99
const HEAD_MAX_ANGLE = 90
const PERCENT_MAXIMUM = 100

export function interpolate(A: number, B: number, range: number): number {
  return A + (B - A) * range
}

// Finds local data from global
function morphData(
  array: number[][],
  value: number,
  powerName: string
): {
  currValue: number[]
  nextValue: number[]
  range: number
} {
  const power = powers[powerName] || 1

  const summaryRange = (1 - Math.abs(value) ** power) * (array.length - 1) * SAFE_RANGE_VALUE
  const index = summaryRange | 0

  return {
    currValue: array[index],
    nextValue: array[index + 1],
    range: summaryRange - index
  }
}

// Updating one shader buffer
function morphMesh(
  name: string,
  propers: IObject<any>,
  { geometry, shader: { uniforms } }: PIXI.Mesh
) {
  const normalDegress = propers.degress / HEAD_MAX_ANGLE
  const data = morphData(elements[name].points, normalDegress, name)

  updateBuffers('positions', geometry, [data])

  // Shader uniforms
  uniforms.phase = data.range
  uniforms.normalX = normalDegress
}

// Updating two shader buffers
function morphMeshDouble(
  name: string,
  propers: IObject<any>,
  { geometry, shader: { uniforms } }: PIXI.Mesh
) {
  const [name1, name2, properName] = crossMorph[name]

  const normalDegress = propers.degress / HEAD_MAX_ANGLE
  const data = morphData(elements[name1].points, normalDegress, name)

  updateBuffers('positions', geometry, [
    data,
    morphData(elements[name2].points, normalDegress, name)
  ])

  // Shader uniforms
  uniforms.phase = data.range
  uniforms.phase2 =
    propers[checkProperty(properName, normalDegress).gettedProperty as string] / PERCENT_MAXIMUM

  uniforms.normalX = normalDegress
}

// Updating four shader buffers
function morphMeshQuadro(
  name: string,
  propers: IObject<any>,
  { geometry, shader: { uniforms } }: PIXI.Mesh
) {
  const [[name1, name2, properName], [name3, name4, properName2], properName3] = crossMorph[name]

  const normalDegress = propers.degress / HEAD_MAX_ANGLE
  const data = morphData(elements[name1].points, normalDegress, name)

  updateBuffers('positions', geometry, [
    data,
    morphData(elements[name2].points, normalDegress, name),
    morphData(elements[name3].points, normalDegress, name),
    morphData(elements[name4].points, normalDegress, name)
  ])

  // Shader uniforms
  uniforms.phase = data.range

  uniforms.phase2 =
    propers[checkProperty(properName, normalDegress).gettedProperty as string] / PERCENT_MAXIMUM

  uniforms.phase3 =
    propers[checkProperty(properName2, normalDegress).gettedProperty as string] / PERCENT_MAXIMUM

  uniforms.phase4 =
    propers[checkProperty(properName3, normalDegress).gettedProperty as string] / PERCENT_MAXIMUM

  uniforms.normalX = normalDegress
}

// Getting a vector between two vectors
export function morphVec2(array: number[][], value: number, powerName: string) {
  const { currValue, nextValue, range } = morphData(array, value, powerName)

  return [
    interpolate(currValue[0], nextValue[0], range),
    interpolate(currValue[1], nextValue[1], range)
  ]
}

// Interpolate a mesh by finded morph pattern
export function selectMorphType(name: string, mesh: PIXI.Mesh, self: IObject<any>) {
  if (
    crossMorph[name] &&
    name !== 'male_nose' &&
    name !== 'male_chin' &&
    name !== 'male_chin_outline'
  ) {
    if (isStringArray(crossMorph[name][0])) {
      morphMeshQuadro(name, self.properties, mesh)
    } else {
      morphMeshDouble(name, self.properties, mesh)
    }
  } else {
    morphMesh(name, self.properties, mesh)
  }
}
