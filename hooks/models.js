import { useEffect } from 'react'

import useParameters from '@/helpers/parameters'

import Materials from '@/configs/materials/list.json'

export function useModelInfo(
  elemName,
  { key, group } = {},
  material = undefined,
  { group: textureGroup, key: textureKey, postfix } = {}
) {
  const properties = useParameters((state) => state.values)

  const name = key ? properties[key].replace(/ /g, '_') : elemName
  const src = group ? group + name : name

  let textureName

  if (material) {
    textureName =
      textureGroup && textureKey
        ? textureGroup + properties[textureKey].replace(/ /g, '_')
        : Materials[material].texture

    if (Materials[material] && postfix) textureName += postfix
  }

  return { name, src, textureName }
}

export function useColorManager(model, material) {
  const { color } = Materials[material]

  useEffect(() => {
    if (color) {
      const { material } = model.current

      const { h, s, l } = useParameters.getState().colors[color]

      material.color.setHSL(h / 360, s, l)

      useParameters.subscribe(
        ({ h, s, l }) => material.color.setHSL(h / 360, s, l),
        (state) => state.colors[color]
      )
    }
  }, [color, model])
}

export function useHSLAManager(model, material) {
  const { color } = Materials[material]

  useEffect(() => {
    if (color) {
      const { material } = model.current

      const { h, s, l, a } = useParameters.getState().colors[color]

      material.uniforms.color.value.setHSL(h / 360, s, l)
      material.uniforms.alpha.value = a

      useParameters.subscribe(
        ({ h, s, l, a }) => {
          material.uniforms.color.value.setHSL(h / 360, s, l)
          material.uniforms.alpha.value = a
        },
        (state) => state.colors[color]
      )
    }
  }, [color, model])
}
