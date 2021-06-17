import { useEffect } from 'react'

import useParameters from '@/helpers/parameters'

export function useShaderColorManager(
  colorTarget,
  model,
  colorName = undefined,
  alphaTarget = undefined
) {
  useEffect(() => {
    if (colorName) {
      const { material } = model.current
      const { h, s, l, a } = useParameters.getState().colors[colorName]

      material.uniforms[colorTarget].value.setHSL(h / 360, s, l, a)

      if (alphaTarget) material.uniforms[alphaTarget].value = a

      useParameters.subscribe(
        ({ h, s, l, a }) => {
          material.uniforms[colorTarget].value.setHSL(h / 360, s, l)

          if (alphaTarget) material.uniforms[alphaTarget].value = a
        },
        (state) => state.colors[colorName]
      )
    }
  }, [alphaTarget, colorName, colorTarget, model])
}

export function useShaderValueManager(valueName, model, valueIn = undefined) {
  useEffect(() => {
    if (valueIn) {
      const { material } = model.current

      material.uniforms[valueName].value =
        useParameters.getState().values[valueIn]

      useParameters.subscribe(
        (value) => (material.uniforms[valueName].value = value),
        (state) => state.values[valueIn]
      )
    }
  }, [model, valueIn, valueName])
}
