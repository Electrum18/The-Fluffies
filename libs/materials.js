import { Vector3, Color, UniformsUtils, ShaderMaterial, Texture } from 'three'

import MeshShaderVertex from '@/libs/glsl/basic.vert'

import MeshOpacityToonShaderFragment from '@/libs/glsl/opacityToon.frag'

import MeshDoubleBasicShaderFragment from '@/libs/glsl/doubleBasic.frag'
import MeshDoubleToonShaderFragment from '@/libs/glsl/doubleToon.frag'

const shaders = {
  basic: {
    uniforms: {
      color: { value: new Color(0xeeeeee) },
      color2: { value: new Color(0x888888) },
      textureMask: { value: new Texture() },
      secondEnabled: { value: true },
    },
    vertexShader: MeshShaderVertex,
    fragmentShader: MeshDoubleBasicShaderFragment,
  },
  toon: {
    uniforms: {
      uDirLightPos: { value: new Vector3() },
      uDirLightPower: { value: new Color(0xeeeeee) },
      uAmbientLightPower: { value: new Color(0x050505) },
      color: { value: new Color(0xeeeeee) },
      color2: { value: new Color(0x888888) },
      textureMask: { value: new Texture() },
      secondEnabled: { value: true },
    },
    vertexShader: MeshShaderVertex,
    fragmentShader: MeshDoubleToonShaderFragment,
  },
  transparentToon: {
    uniforms: {
      uDirLightPos: { value: new Vector3() },
      uDirLightPower: { value: new Color(0xeeeeee) },
      uAmbientLightPower: { value: new Color(0x050505) },
      color: { value: new Color(0xeeeeee) },
      alpha: { value: 1 },
    },
    vertexShader: MeshShaderVertex,
    fragmentShader: MeshOpacityToonShaderFragment,
    transparent: true,
  },
}

function createShaderMaterial(shaderType) {
  const shader = shaders[shaderType]

  return new ShaderMaterial({
    uniforms: UniformsUtils.clone(shader.uniforms),
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
    transparent: shader.transparent || false,
  })
}

export const MeshBasicDoubleMaterial = () => createShaderMaterial('basic')
export const MeshToonDoubleMaterial = () => createShaderMaterial('toon')

export const MeshToonTransparentMaterial = () =>
  createShaderMaterial('transparentToon')
