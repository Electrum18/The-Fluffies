import { useEffect } from 'react'

import useParameters from '@/helpers/parameters'

export function useShaderColorManager(
  colorTarget,
  alphaTarget,
  model,
  colorName = undefined
) {
  useEffect(() => {
    if (colorName) {
      const { material } = model.current
      const { h, s, l, a } = useParameters.getState().colors[colorName]

      material.uniforms[colorTarget].value.setHSL(h / 360, s, l)

      if (a && alphaTarget) material.uniforms[alphaTarget].value = a

      useParameters.subscribe(
        ({ h, s, l, a }) => {
          material.uniforms[colorTarget].value.setHSL(h / 360, s, l)

          if (a && alphaTarget) material.uniforms[alphaTarget].value = a
        },
        (state) => state.colors[colorName]
      )
    }
  }, [alphaTarget, colorName, colorTarget, model])
}

export function useShaderValueManager(
  valueName,
  model,
  valueIn = undefined,
  treshold = 1
) {
  useEffect(() => {
    if (valueIn) {
      const { material } = model.current
      const state = useParameters.getState()

      material.uniforms[valueName].value =
        (+state.booleans[valueIn] || state.properties[valueIn]) * treshold

      useParameters.subscribe(
        (value) => (material.uniforms[valueName].value = +value * treshold),
        (state) => state.booleans[valueIn] || state.properties[valueIn]
      )
    }
  }, [model, treshold, valueIn, valueName])
}
