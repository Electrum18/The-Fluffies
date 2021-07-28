import { useEffect } from 'react'

import useAnimations from '@/helpers/animations'
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
      const {
        saves: animSaves,
        slot: animSlot,
        selected
      } = useAnimations.getState()

      const save = saves[slot]
      const properties = animSaves[animSlot].frames[selected].frame

      material.uniforms[valueName].value =
        (+save.booleans[valueIn] || properties[valueIn]) * treshold

      useParameters.subscribe(
        value => (material.uniforms[valueName].value = +value * treshold),
        state => state.saves[state.slot].booleans[valueIn]
      )

      useAnimations.subscribe(
        value => (material.uniforms[valueName].value = +value * treshold),
        state => state.saves[state.slot].frames[state.selected].frame[valueIn]
      )
    }
  }, [model, treshold, valueIn, valueName])
}
