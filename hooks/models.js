import { useEffect } from 'react'
import shallow from 'zustand/shallow'

import useParameters from '@/helpers/parameters'
import useResources from '@/helpers/resources'
import useAnimations from '@/helpers/animations'

import Materials from '@/configs/materials.json'

import { useShaderColorManager, useShaderValueManager } from './shader'

export function useModelInfo(
  elemName,
  { key, group } = {},
  material = undefined,
  texture = undefined
) {
  const names = useParameters((state) => state.names)

  const name = key ? names[key].replace(/ /g, '_') : elemName
  const src = group ? group + name : name

  let textureName

  if (material && texture) {
    textureName =
      texture.group && texture.key
        ? texture.group + names[texture.key].replace(/ /g, '_')
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

  useShaderColorManager('color', 'alpha', model, color)
  useShaderColorManager('color2', 'alpha2', model, color2)
  useShaderColorManager('color3', 'alpha3', model, color3)
  useShaderColorManager('color4', 'alpha4', model, color4)

  useShaderValueManager('secondEnabled', model, color2Value)
  useShaderValueManager('thirdEnabled', model, color3Value)
  useShaderValueManager('fouthEnabled', model, color4Value)
}

export function useWorldColor(model) {
  useShaderColorManager('colorEnv', '', model, 'background_basic')
}

export function useEmotionManager(model, name, morphsConfig) {
  const morphsList = useAnimations((state) => state.morphsList)

  function findValue(index) {
    return (
      morphsList[name] && morphsConfig && morphsConfig[morphsList[name][index]]
    )
  }

  useShaderValueManager('morph0', model, findValue(0), 0.01)
  useShaderValueManager('morph1', model, findValue(1), 0.01)
  useShaderValueManager('morph2', model, findValue(2), 0.01)
  useShaderValueManager('morph3', model, findValue(3), 0.01)
  useShaderValueManager('morph4', model, findValue(4), 0.01)
  useShaderValueManager('morph5', model, findValue(5), 0.01)
  useShaderValueManager('morph6', model, findValue(6), 0.01)
  useShaderValueManager('morph7', model, findValue(7), 0.01)
  useShaderValueManager('morph8', model, findValue(8), 0.01)
  useShaderValueManager('morph9', model, findValue(9), 0.01)
}

export function useLight(model) {
  const [light, ambientLight] = useResources(
    (state) => [state.light, state.ambientLight],
    shallow
  )

  useEffect(() => {
    const { uDirLightPos, uDirLightPower } = model.current.material.uniforms

    if (light.current) {
      uDirLightPos.value = light.current.position
      uDirLightPower.value = light.current.intensity
    }
  }, [light, model])

  useEffect(() => {
    const { uAmbientLightPower } = model.current.material.uniforms

    if (ambientLight.current) {
      uAmbientLightPower.value = ambientLight.current.intensity
    }
  }, [ambientLight, model])
}

export function usePositionManager(model, material) {
  const properties = useParameters((store) => store.properties)

  const { posX, posY, scale } = Materials[material]

  useEffect(() => {
    if (posX && posY) {
      const { material } = model.current

      material.uniforms.uPosition.value.set(
        -properties[posX] / 700,
        properties[posY] / 700
      )
    }
  }, [model, properties, posX, posY])

  useEffect(() => {
    if (scale) {
      const { material } = model.current

      material.uniforms.uScale.value = 1 / (properties[scale] / 100)
    }
  }, [model, properties, scale])
}
