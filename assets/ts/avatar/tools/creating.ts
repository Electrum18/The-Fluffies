import * as PIXI from 'pixi.js'

import { createBuffers } from './buffers'
import { checkColor } from './checking'

import ShaderVertexBasic from '~/assets/json/shaders/vertex/basic.json'
import ShaderVertexSingle from '~/assets/json/shaders/vertex/morphing/single.json'
import ShaderVertexDouble from '~/assets/json/shaders/vertex/morphing/double.json'
import ShaderVertexQuadro from '~/assets/json/shaders/vertex/morphing/quadro.json'

import ShaderFragmentFill from '~/assets/json/shaders/fragment/fill.json'

import { IObject } from '~/types/basic'
import { IElement, TOptions, TRGBA } from '~/types/graphics'

// Element constructor
function createMesh({ points, ids }: IElement, color: TRGBA) {
  return new PIXI.Mesh(
    createBuffers('positions', new PIXI.Geometry(), [points]).addIndex(ids),

    PIXI.Shader.from(ShaderVertexSingle.join('\n'), ShaderFragmentFill.join('\n'), {
      phase: 0,
      normalX: 0,
      color
    }) as PIXI.MeshMaterial
  )
}

// Element constructor with double interpolation
function createMeshDouble({ points, ids }: IElement, { points: points2 }: IElement, color: TRGBA) {
  return new PIXI.Mesh(
    createBuffers('positions', new PIXI.Geometry(), [points, points2]).addIndex(ids),

    PIXI.Shader.from(ShaderVertexDouble.join('\n'), ShaderFragmentFill.join('\n'), {
      phase: 0,
      phase2: 0,
      normalX: 0,
      color
    }) as PIXI.MeshMaterial
  )
}

// Element constructor with power two interpolation
function createMeshQuad(
  { points, ids }: IElement,
  { points: points2 }: IElement,
  { points: points3 }: IElement,
  { points: points4 }: IElement,
  color: TRGBA
) {
  return new PIXI.Mesh(
    createBuffers('positions', new PIXI.Geometry(), [points, points2, points3, points4]).addIndex(
      ids
    ),

    PIXI.Shader.from(ShaderVertexQuadro.join('\n'), ShaderFragmentFill.join('\n'), {
      phase: 0,
      phase2: 0,
      phase3: 0,
      phase4: 0,
      normalX: 0,
      color
    }) as PIXI.MeshMaterial
  )
}

// Creates background as a square of two polygons
function createBackground(app: PIXI.Application, self: IObject<any>, { width, height }: TOptions) {
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

export { createMesh, createMeshDouble, createMeshQuad, createBackground }
