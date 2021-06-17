import { useEffect } from 'react'
import shallow from 'zustand/shallow'

import useParameters from '@/helpers/parameters'
import useResources from '@/helpers/resources'

import Materials from '@/configs/materials.json'

import { useShaderColorManager, useShaderValueManager } from './shader'

export function useModelInfo(
  elemName,
  { key, group } = {},
  material = undefined,
  texture = undefined
) {
  const properties = useParameters((state) => state.values)

  const name = key ? properties[key].replace(/ /g, '_') : elemName
  const src = group ? group + name : name

  let textureName

  if (material && texture) {
    textureName =
      texture.group && texture.key
        ? texture.group + properties[texture.key].replace(/ /g, '_')
        : texture

    if (Materials[material] && texture.postfix) textureName += texture.postfix
  }

  return { name, src, textureName }
}

export function useColorManager(model, materialName) {
  const {
    color,
    color2,
    color3,
    color4,

    color2Value,
    color3Value,
    color4Value,
  } = Materials[materialName]

  useShaderColorManager('color', model, color)
  useShaderColorManager('color2', model, color2)
  useShaderColorManager('color3', model, color3)
  useShaderColorManager('color4', model, color4)

  useShaderValueManager('secondEnabled', model, color2Value)
  useShaderValueManager('thirdEnabled', model, color3Value)
  useShaderValueManager('fouthEnabled', model, color4Value)
}

export function useLight(model) {
  const [light, ambientLight] = useResources(
    (state) => [state.light, state.ambientLight],
    shallow
  )

  useEffect(() => {
    const { material } = model.current

    if (light.current) {
      material.uniforms.uDirLightPos.value = light.current.position
      material.uniforms.uDirLightPower.value = light.current.intensity
    }

    if (ambientLight.current) {
      material.uniforms.uAmbientLightPower.value =
        ambientLight.current.intensity
    }
  }, [ambientLight, light, model])
}

export function usePositionManager(model, material) {
  const parameters = useParameters((store) => store.values)

  const { posX, posY, scale } = Materials[material]

  useEffect(() => {
    if (posX && posY) {
      const { material } = model.current

      material.uniforms.uPosition.value.set(
        -parameters[posX] / 700,
        parameters[posY] / 700
      )
    }
  }, [model, parameters, posX, posY])

  useEffect(() => {
    if (scale) {
      const { material } = model.current

      material.uniforms.uScale.value = 1 / (parameters[scale] / 100)
    }
  }, [model, parameters, scale])
}
