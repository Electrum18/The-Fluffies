import * as PIXI from 'pixi.js'

import { checkColor, isStringArray } from '../tools/checking'
import { createBuffers } from '../tools/buffers'

import { crossMorph, elements } from './config'

import ShaderVertexBasic from '~/assets/json/shaders/vertex/basic.json'
import ShaderVertexSingle from '~/assets/json/shaders/vertex/morphing/single.json'
import ShaderVertexDouble from '~/assets/json/shaders/vertex/morphing/double.json'
import ShaderVertexQuadro from '~/assets/json/shaders/vertex/morphing/quadro.json'

import ShaderFragmentFill from '~/assets/json/shaders/fragment/fill.json'
import ShaderFragmentMaskedDouble from '~/assets/json/shaders/fragment/mask-double.json'
import ShaderFragmentMaskedInvert from '~/assets/json/shaders/fragment/mask-invert.json'

import { TMasking, TMaskingTexture, TOptions, TRGBA } from '~/types/graphics'
import { IObject } from '~/types/basic'

export const masksBuffers: { [index: string]: PIXI.RenderTexture } = {}
export const layersPos: { [index: string]: PIXI.Container } = {}

const AVATAR_WIDTH = 1024

type TMaskData = [
  false | PIXI.RenderTexture,
  false | PIXI.Container,
  false | PIXI.RenderTexture,
  false | PIXI.Container
]

// Returns a fragment buffer depending on the type
function findMaskTyped(mask: TMaskingTexture) {
  const type = mask[mask.length - 1]

  if (type === 'MASK_DOUBLE') {
    return ShaderFragmentMaskedDouble.join('\n')
  } else if (type === 'MASK_INVERT') {
    return ShaderFragmentMaskedInvert.join('\n')
  }
}

// Creates uniforms with additional options
function createUniformsTyped(
  color: TRGBA,
  [maskTexture, maskPosition, maskTexture2, maskPosition2]: TMaskData
) {
  const uniforms: IObject<any> = {
    phase: 0,
    normalX: 0,
    color
  }

  if (maskTexture) uniforms.mask = maskTexture
  if (maskTexture2) uniforms.mask2 = maskTexture2

  if (maskPosition) {
    uniforms.maskPos = [maskPosition.x / AVATAR_WIDTH, maskPosition.y / AVATAR_WIDTH]
  }

  if (maskPosition2) {
    uniforms.maskPos2 = [maskPosition2.x / AVATAR_WIDTH, maskPosition2.y / AVATAR_WIDTH]
  }

  return uniforms
}

// Checks for a mask and then returns textures and a fragment shader
function findFragmentBufferTyped(mask: false | TMaskingTexture) {
  return {
    fragmentBuffer: mask ? findMaskTyped(mask) : ShaderFragmentFill.join('\n'),
    maskData: [
      mask && mask[0],
      mask && mask[1],
      mask && mask[2] !== 'MASK_INVERT' && mask[2],
      mask && mask[2] !== 'MASK_INVERT' && mask[3]
    ] as TMaskData
  }
}

// Element constructor
function createMesh(name: string, color: TRGBA, maskBuffer: false | TMaskingTexture) {
  const { points, ids } = elements[name]

  const { fragmentBuffer, maskData } = findFragmentBufferTyped(maskBuffer)

  return new PIXI.Mesh(
    createBuffers('positions', new PIXI.Geometry(), [points]).addIndex(ids),

    PIXI.Shader.from(
      ShaderVertexSingle.join('\n'),
      fragmentBuffer,
      createUniformsTyped(color, maskData)
    ) as PIXI.MeshMaterial
  )
}

// Element constructor with double interpolation
function createMeshDouble(name: string, color: TRGBA, maskBuffer: false | TMaskingTexture) {
  const [name1, name2] = crossMorph[name]

  const { points, ids } = elements[name1]
  const { points: points2 } = elements[name2]

  const { fragmentBuffer, maskData } = findFragmentBufferTyped(maskBuffer)

  return new PIXI.Mesh(
    createBuffers('positions', new PIXI.Geometry(), [points, points2]).addIndex(ids),

    PIXI.Shader.from(
      ShaderVertexDouble.join('\n'),
      fragmentBuffer,
      createUniformsTyped(color, maskData)
    ) as PIXI.MeshMaterial
  )
}

// Element constructor with power two interpolation
function createMeshQuad(name: string, color: TRGBA, maskBuffer: false | TMaskingTexture) {
  const [[name1, name2], [name3, name4]] = crossMorph[name]

  const { points, ids } = elements[name1]
  const { points: points2 } = elements[name2]
  const { points: points3 } = elements[name3]
  const { points: points4 } = elements[name4]

  const { fragmentBuffer, maskData } = findFragmentBufferTyped(maskBuffer)

  return new PIXI.Mesh(
    createBuffers('positions', new PIXI.Geometry(), [points, points2, points3, points4]).addIndex(
      ids
    ),

    PIXI.Shader.from(
      ShaderVertexQuadro.join('\n'),
      fragmentBuffer,
      createUniformsTyped(color, maskData)
    ) as PIXI.MeshMaterial
  )
}

// Creates background as a square of two polygons
export function createBackground(
  app: PIXI.Application,
  self: IObject<any>,
  { width, height }: TOptions
) {
  const global = self.getGlobal
  const colors = self.getColor

  const colorName = 'background_basic'

  const mesh = new PIXI.Mesh(
    new PIXI.Geometry()
      .addAttribute('positions', [0, 0, width, 0, width, height, 0, height])
      .addIndex([0, 1, 2, 0, 2, 3]),

    PIXI.Shader.from(ShaderVertexBasic.join('\n'), ShaderFragmentFill.join('\n'), {
      phase: 0,
      normalX: 0,
      color: checkColor(colors, global, colorName)
    }) as PIXI.MeshMaterial
  )

  mesh.interactive = false

  app.ticker.add(() => {
    mesh.shader.uniforms.color = checkColor(colors, global, colorName)
  })

  return mesh
}

// Creates a mesh by finded morph pattern
export function createMeshTyped(name: string, color: TRGBA, maskBuffer: false | TMasking) {
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
      mesh = createMeshQuad(name, color, mask)
    } else {
      mesh = createMeshDouble(name, color, mask)
    }
  } else {
    mesh = createMesh(name, color, mask)
  }

  mesh.interactive = false

  return mesh
}
