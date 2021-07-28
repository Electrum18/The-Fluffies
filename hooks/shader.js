import { useEffect } from 'react'

import useEmotions from '@/helpers/emotions'
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

      const { saves, slot } = useParameters.getState()
      const { h, s, l, a } = saves[slot].colors[colorName]

      material.uniforms[colorTarget].value.setHSL(h / 360, s, l)

      if (a && alphaTarget) material.uniforms[alphaTarget].value = a

      useParameters.subscribe(
        ({ h, s, l, a }) => {
          material.uniforms[colorTarget].value.setHSL(h / 360, s, l)

          if (a && alphaTarget) material.uniforms[alphaTarget].value = a
        },
        state => state.saves[state.slot].colors[colorName]
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

      const { saves, slot } = useParameters.getState()
      const { emotions } = useEmotions.getState()

      const save = saves[slot]

      material.uniforms[valueName].value =
        (+save.booleans[valueIn] || emotions[valueIn]) * treshold

      useParameters.subscribe(
        value => (material.uniforms[valueName].value = +value * treshold),
        state => state.saves[state.slot].booleans[valueIn]
      )

      useEmotions.subscribe(
        value => (material.uniforms[valueName].value = +value * treshold),
        state => state.emotions[valueIn]
      )
    }
  }, [model, treshold, valueIn, valueName])
}
