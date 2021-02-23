import * as PIXI from 'pixi.js'

import { checkColor, checkGlobals, checkProperty, checkSimpleMask } from '../tools/checking'
import { app } from '../avatar'

import { morphVec2, selectMorphType } from './morphing'
import { createMeshTyped, masksBuffers, layersPos } from './creating'
import { elements, masks, origins } from './config'

import { TAngleConditional, TColorConditional, TMasking, TPosConditional } from '~/types/graphics'

import { IObject } from '~/types/basic'

const AVATAR_WIDTH = 1024

const HEAD_MAX_ANGLE = 90
const PI_ANGLE = 180
const NORMAL_DEG_OF_PI2 = 1 / (PI_ANGLE / 2)
const WEIGHT_MUL_CORRECTING = 32

// Argument declaration function for nested functions
function initLibrary(self: IObject<any>) {
  const { ticker, renderer } = app

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

      selectMorphType(name, mesh, self)

      if (saveBuffer) renderer.render(mesh, masksBuffers[name])
    })

    return mesh
  }

  // Element used for the masking
  function Mask(name: string) {
    const mesh = createMeshTyped(name, [1, 1, 1, 1], false)

    mesh.blendMode = PIXI.BLEND_MODES.NORMAL_NPM

    masks[name] = mesh
    masksBuffers[name] = PIXI.RenderTexture.create({ width: AVATAR_WIDTH, height: AVATAR_WIDTH })

    ticker.add(() => {
      selectMorphType(name, mesh, self)

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

      selectMorphType(fullName(), mesh, self)

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

export { initLibrary }
