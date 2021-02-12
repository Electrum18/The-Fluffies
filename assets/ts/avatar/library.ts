import * as PIXI from 'pixi.js'

import { morphVec2, morphMesh, morphMeshDouble, morphMeshQuad } from './tools/morphing'
import { createMesh, createMeshDouble, createMeshQuad } from './tools/creating'
import { isStringArray, checkColor, checkGlobals, checkProperty } from './tools/checking'

import Origins from '~/assets/json/configs/origins.json'
import CM from '~/assets/json/configs/cross-morphs.json'

import {
  TAngleConditional,
  TColorConditional,
  TElements,
  TPosConditional,
  TRGBA
} from '~/types/graphics'

import { IObject } from '~/types/basic'

const crossMorph: IObject<any> = CM
const origins: IObject<number[][]> = Origins

const HEAD_MAX_ANGLE = 90
const PI_ANGLE = 180
const NORMAL_DEG_OF_PI2 = 1 / (PI_ANGLE / 2)
const WEIGHT_MUL_CORRECTING = 32

const elements: TElements = {}

const masks: { [index: string]: PIXI.Mesh } = {}

// Creates a mesh by finded morph pattern
function createMeshTyped(name: string, elements: TElements, color: TRGBA) {
  let mesh = {} as PIXI.Mesh

  if (crossMorph[name]) {
    if (isStringArray(crossMorph[name][0])) {
      const [[name1, name2], [name3, name4]] = crossMorph[name]

      mesh = createMeshQuad(
        elements[name1],
        elements[name2],
        elements[name3],
        elements[name4],
        color
      )
    } else {
      const [name1, name2] = crossMorph[name]

      mesh = createMeshDouble(elements[name1], elements[name2], color)
    }
  } else {
    mesh = createMesh(elements[name], color)
  }

  mesh.interactive = false

  return mesh
}

// Interpolate a mesh by finded morph pattern
function selectMorphType(name: string, mesh: PIXI.Mesh, elements: TElements, self: IObject<any>) {
  if (
    crossMorph[name] &&
    name !== 'male_nose' &&
    name !== 'male_chin' &&
    name !== 'male_chin_outline'
  ) {
    if (isStringArray(crossMorph[name][0])) {
      const [[name1, name2, properName], [name3, name4, properName2], properName3] = crossMorph[
        name
      ]

      morphMeshQuad(
        name,
        self.properties,
        mesh,
        elements[name1],
        elements[name2],
        elements[name3],
        elements[name4],
        properName,
        properName2,
        properName3
      )
    } else {
      const [name1, name2, properName] = crossMorph[name]

      morphMeshDouble(name, self.properties, mesh, elements[name1], elements[name2], properName)
    }
  } else {
    morphMesh(name, self.properties, mesh, elements[name])
  }
}

// Argument declaration function for nested functions
function initLibrary({ ticker }: PIXI.Application, self: IObject<any>) {
  const global = self.getGlobal
  const colors = self.getColor

  // Getting sum of properties from an array multiplied by weights
  function getPropersSum(propersSeq: [string[], number[]], angle: number) {
    const [propers, weights] = propersSeq

    let value = 0

    for (let propId = 0; propId < propers.length; propId++) {
      const properName = propers[propId]
      const gettedProper = checkProperty(properName, angle).gettedProperty as string
      const proper: number = self.properties[gettedProper as string]

      if (proper === undefined) continue

      const sidedProper = gettedProper === 'eyes_position_horiz' && angle < 0 ? -proper : proper

      value += (sidedProper * weights[propId]) / WEIGHT_MUL_CORRECTING
    }

    return value
  }

  console.log('propers: ', self.getProper)
  console.log('globals: ', global)
  console.log('colors: ', colors)

  // Grouping of editor elements
  function Layer(
    position?: TPosConditional,
    angle?: TAngleConditional,
    ...childs: (PIXI.Mesh | PIXI.Container)[]
  ) {
    const container = new PIXI.Container()

    // If there is a position or angle
    if (position || angle) {
      let propersX: [string[], number[]]
      let propersY: [string[], number[]]

      let proper: string | [string, string, string], origin: string

      if (position) [propersX, propersY] = position
      if (angle) [proper, origin] = angle

      ticker.add(() => {
        const normalAngle = self.properties.degress / HEAD_MAX_ANGLE

        container.x = 0
        container.y = 0

        // Adding a position
        if (position) {
          container.x += getPropersSum(propersX, normalAngle)
          container.y += getPropersSum(propersY, normalAngle)
        }

        // Calculating angle and pivot
        if (angle) {
          const { gettedProperty, propertySide } = checkProperty(proper, normalAngle)

          if (!self.properties[gettedProperty as string] === undefined) return

          container.rotation =
            self.properties[gettedProperty as string] * NORMAL_DEG_OF_PI2 * propertySide

          const [X, Y] = morphVec2(origins[origin], normalAngle, origin)

          container.pivot.set(X, Y)

          container.x += X
          container.y += Y
        }
      })
    }

    container.addChild(...childs)

    return container
  }

  // The main part of the editor
  function Elem(
    name: string,
    colorName: string | TColorConditional,
    conditions: string[] = [],
    mask?: string
  ) {
    const mesh = createMeshTyped(name, elements, checkColor(colors, global, colorName))

    mesh.blendMode = PIXI.BLEND_MODES.NORMAL_NPM

    if (mask && masks[mask]) mesh.mask = masks[mask]

    ticker.add(() => {
      mesh.visible = checkGlobals(global, conditions)
      mesh.shader.uniforms.color = checkColor(colors, global, colorName)

      selectMorphType(name, mesh, elements, self)
    })

    return mesh
  }

  // Element used for the masking
  function Mask(name: string) {
    const mesh = createMeshTyped(name, elements, [1, 1, 1, 1])

    mesh.blendMode = PIXI.BLEND_MODES.NORMAL_NPM

    masks[name] = mesh

    ticker.add(() => selectMorphType(name, mesh, elements, self))

    return mesh
  }

  // An alias for stroke elements
  function Outline(
    name: string,
    color: string | TColorConditional,
    conditions: string[] = [],
    mask?: string
  ) {
    return Elem(name + '_outline', color, conditions, mask)
  }

  // Variable element by global value
  function VarElem(
    group: string,
    name: string,
    colorName: string | TColorConditional,
    conditions: string[] = [],
    mask?: string
  ) {
    let lastGlobal: string
    let lastName: string
    let changed: boolean

    function fullName() {
      const value = global[group + '_name_en']

      changed = lastGlobal !== value

      if (changed) {
        lastName = group + '_' + value.toLowerCase().replace(/ /g, '_') + '_' + name
        lastGlobal = value
      }

      return lastName
    }

    const mesh = createMeshTyped(fullName(), elements, checkColor(colors, global, colorName))

    mesh.blendMode = PIXI.BLEND_MODES.NORMAL_NPM

    if (mask && masks[mask]) mesh.mask = masks[mask]

    ticker.add(() => {
      mesh.visible = checkGlobals(global, conditions)
      mesh.shader.uniforms.color = checkColor(colors, global, colorName)

      selectMorphType(fullName(), mesh, elements as TElements, self)

      if (changed) {
        mesh.geometry.getIndex().update(new Uint16Array(elements[fullName()].ids)) // Creates correct indexes

        changed = true // failsafe
      }
    })

    return mesh
  }

  // An alias for stroke variable elements
  function VarOutline(
    group: string,
    name: string,
    color: string | TColorConditional,
    conditions: string[] = [],
    mask?: string
  ) {
    const outlineName = name === '' ? '' : name + '_'

    return VarElem(group, outlineName + 'outline', color, conditions, mask)
  }

  return { Elem, Mask, Layer, Outline, VarElem, VarOutline }
}

export { initLibrary, elements }
