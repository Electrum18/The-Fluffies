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
  TMasking,
  TMaskingTexture,
  TPosConditional,
  TRGBA
} from '~/types/graphics'

import { IObject } from '~/types/basic'

const AVATAR_WIDTH = 1024

const crossMorph: IObject<any> = CM
const origins: IObject<number[][]> = Origins

const HEAD_MAX_ANGLE = 90
const PI_ANGLE = 180
const NORMAL_DEG_OF_PI2 = 1 / (PI_ANGLE / 2)
const WEIGHT_MUL_CORRECTING = 32

const elements: TElements = {}

const masks: { [index: string]: PIXI.Mesh } = {}
const masksBuffers: { [index: string]: PIXI.RenderTexture } = {}

const layersPos: { [index: string]: PIXI.Container } = {}

// Creates a mesh by finded morph pattern
function createMeshTyped(
  name: string,
  elements: TElements,
  color: TRGBA,
  maskBuffer: false | TMasking
) {
  let mesh = {} as PIXI.Mesh
  let mask: false | TMaskingTexture = false

  if (Array.isArray(maskBuffer)) {
    // eslint-disable-next-line no-magic-numbers
    if (maskBuffer.length > 4) {
      mask = [
        masksBuffers[maskBuffer[0]],
        layersPos[maskBuffer[1]],
        masksBuffers[maskBuffer[2]],
        layersPos[maskBuffer[3] as string],
        maskBuffer[4] as 'MASK_DOUBLE'
      ]
    } else {
      mask = [masksBuffers[maskBuffer[0]], layersPos[maskBuffer[1]], maskBuffer[2] as 'MASK_INVERT']
    }
  }

  if (crossMorph[name]) {
    if (isStringArray(crossMorph[name][0])) {
      const [[name1, name2], [name3, name4]] = crossMorph[name]

      mesh = createMeshQuad(
        elements[name1],
        elements[name2],
        elements[name3],
        elements[name4],
        color,
        mask
      )
    } else {
      const [name1, name2] = crossMorph[name]

      mesh = createMeshDouble(elements[name1], elements[name2], color, mask)
    }
  } else {
    mesh = createMesh(elements[name], color, mask)
  }

  mesh.interactive = false

  return mesh
}

// Creates a mask for the mesh if it is a regular PIXI type
function checkSimpleMask(mesh: PIXI.Mesh, mask?: string | TMasking) {
  if (mask) {
    if (!Array.isArray(mask)) {
      if (masks[mask]) mesh.mask = masks[mask]
    }
  }
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
function initLibrary({ ticker, renderer }: PIXI.Application, self: IObject<any>) {
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
    positionAndCache?: TPosConditional | [TPosConditional, string],
    angle?: TAngleConditional,
    ...childs: (PIXI.Mesh | PIXI.Container)[]
  ) {
    const container = new PIXI.Container()

    if (positionAndCache) {
      if (!Array.isArray(positionAndCache[1])) {
        layersPos[(positionAndCache[1] as unknown) as string] = container
      }
    }

    // If there is a position or angle
    if (positionAndCache || angle) {
      let propersX: [string[], number[]]
      let propersY: [string[], number[]]

      let proper: string | [string, string, string], origin: string

      if (positionAndCache) {
        if (!Array.isArray(positionAndCache[1])) {
          ;[propersX, propersY] = positionAndCache[0] as TPosConditional
        } else {
          ;[propersX, propersY] = positionAndCache as TPosConditional
        }
      }

      if (angle) [proper, origin] = angle

      ticker.add(() => {
        const normalAngle = self.properties.degress / HEAD_MAX_ANGLE

        container.x = 0
        container.y = 0

        // Adding a position
        if (positionAndCache) {
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
    mask?: string | TMasking,
    saveBuffer?: boolean
  ) {
    const mesh = createMeshTyped(
      name,
      elements,
      checkColor(colors, global, colorName),
      Array.isArray(mask) && mask
    )

    mesh.blendMode = PIXI.BLEND_MODES.NORMAL_NPM

    if (saveBuffer) {
      masksBuffers[name] = PIXI.RenderTexture.create({
        width: AVATAR_WIDTH,
        height: AVATAR_WIDTH
      })
    }

    checkSimpleMask(mesh, mask)

    ticker.add(() => {
      mesh.visible = checkGlobals(global, conditions)
      mesh.shader.uniforms.color = checkColor(colors, global, colorName)

      selectMorphType(name, mesh, elements, self)

      if (saveBuffer) renderer.render(mesh, masksBuffers[name])
    })

    return mesh
  }

  // Element used for the masking
  function Mask(name: string) {
    const mesh = createMeshTyped(name, elements, [1, 1, 1, 1], false)

    mesh.blendMode = PIXI.BLEND_MODES.NORMAL_NPM

    masks[name] = mesh
    masksBuffers[name] = PIXI.RenderTexture.create({ width: AVATAR_WIDTH, height: AVATAR_WIDTH })

    ticker.add(() => {
      selectMorphType(name, mesh, elements, self)

      renderer.render(mesh, masksBuffers[name])
    })

    return mesh
  }

  // An alias for stroke elements
  function Outline(
    name: string,
    color: string | TColorConditional,
    conditions: string[] = [],
    mask?: string | TMasking,
    saveBuffer?: boolean
  ) {
    return Elem(name + '_outline', color, conditions, mask, saveBuffer)
  }

  // Variable element by global value
  function VarElem(
    group: string,
    name: string,
    colorName: string | TColorConditional,
    conditions: string[] = [],
    mask?: string | TMasking,
    saveBuffer?: boolean
  ) {
    let lastGlobal: string
    let lastName: string
    let changed: boolean

    const shortName = group + '_' + name

    function fullName() {
      const value = global[group + '_name_en']

      changed = lastGlobal !== value

      if (changed) {
        lastName = group + '_' + value.toLowerCase().replace(/ /g, '_') + '_' + name
        lastGlobal = value
      }

      return lastName
    }

    const mesh = createMeshTyped(
      fullName(),
      elements,
      checkColor(colors, global, colorName),
      Array.isArray(mask) && mask
    )

    mesh.blendMode = PIXI.BLEND_MODES.NORMAL_NPM

    if (saveBuffer) {
      masksBuffers[shortName] = PIXI.RenderTexture.create({
        width: AVATAR_WIDTH,
        height: AVATAR_WIDTH
      })
    }

    checkSimpleMask(mesh, mask)

    ticker.add(() => {
      mesh.visible = checkGlobals(global, conditions)
      mesh.shader.uniforms.color = checkColor(colors, global, colorName)

      selectMorphType(fullName(), mesh, elements as TElements, self)

      if (changed) {
        mesh.geometry.getIndex().update(new Uint16Array(elements[fullName()].ids)) // Creates correct indexes

        changed = true // failsafe
      }

      if (saveBuffer) renderer.render(mesh, masksBuffers[shortName])
    })

    return mesh
  }

  // An alias for stroke variable elements
  function VarOutline(
    group: string,
    name: string,
    color: string | TColorConditional,
    conditions: string[] = [],
    mask?: string | TMasking,
    saveBuffer?: boolean
  ) {
    const outlineName = name === '' ? '' : name + '_'

    return VarElem(group, outlineName + 'outline', color, conditions, mask, saveBuffer)
  }

  return { Elem, Mask, Layer, Outline, VarElem, VarOutline }
}

export { initLibrary, elements }
