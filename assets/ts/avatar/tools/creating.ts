import * as PIXI from 'pixi.js'

import { createBuffers } from './buffers'
import { checkColor } from './checking'

import ShaderVertexBasic from '~/assets/json/shaders/vertex/basic.json'
import ShaderVertexSingle from '~/assets/json/shaders/vertex/morphing/single.json'
import ShaderVertexDouble from '~/assets/json/shaders/vertex/morphing/double.json'
import ShaderVertexQuadro from '~/assets/json/shaders/vertex/morphing/quadro.json'

import ShaderFragmentFill from '~/assets/json/shaders/fragment/fill.json'
import ShaderFragmentMaskedDouble from '~/assets/json/shaders/fragment/mask-double.json'
import ShaderFragmentMaskedInvert from '~/assets/json/shaders/fragment/mask-invert.json'

import { IObject } from '~/types/basic'
import { IElement, TMaskingTexture, TOptions, TRGBA } from '~/types/graphics'

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
export function createMesh(
  { points, ids }: IElement,
  color: TRGBA,
  maskBuffer: false | TMaskingTexture
) {
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
export function createMeshDouble(
  { points, ids }: IElement,
  { points: points2 }: IElement,
  color: TRGBA,
  maskBuffer: false | TMaskingTexture
) {
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
export function createMeshQuad(
  { points, ids }: IElement,
  { points: points2 }: IElement,
  { points: points3 }: IElement,
  { points: points4 }: IElement,
  color: TRGBA,
  maskBuffer: false | TMaskingTexture
) {
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
