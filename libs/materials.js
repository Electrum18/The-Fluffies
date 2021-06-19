import {
  Vector2,
  Vector3,
  Color,
  Texture,
  ShaderMaterial,
  UniformsUtils,
} from 'three'

import vertexShader from '@/libs/glsl/vertex.vert'
import fragmentShader from '@/libs/glsl/fragment.frag'

const shader = {
  uniforms: {
    uDirLightPos: { value: new Vector3() },
    uDirLightPower: { value: new Color(0xeeeeee) },

    uAmbientLightPower: { value: new Color(0x050505) },

    uPosition: { value: new Vector2() },
    uScale: { value: 1 },

    textureMask: { value: new Texture() },

    color: { value: new Color(0xeeeeee) },
    color2: { value: new Color(0x888888) },
    color3: { value: new Color(0x444444) },
    color4: { value: new Color(0x222222) },

    alpha: { value: 1 },
    alpha2: { value: 1 },
    alpha3: { value: 1 },
    alpha4: { value: 1 },

    secondEnabled: { value: false },
    thirdEnabled: { value: false },
    fouthEnabled: { value: false },
  },

  vertexShader,
  fragmentShader,
}

export function createMaterials(materialsIn) {
  const materials = {}

  for (const key in materialsIn) {
    const uniforms = UniformsUtils.clone(shader.uniforms)

    const { color2, color3, color4 } = materialsIn[key]

    if (color2) uniforms.secondEnabled.value = true
    if (color3) uniforms.thirdEnabled.value = true
    if (color4) uniforms.fouthEnabled.value = true

    materials[key] = new ShaderMaterial({
      uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      transparent: true,
    })
  }

  return materials
}
