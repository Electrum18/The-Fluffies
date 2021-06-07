import { useEffect } from 'react'
import shallow from 'zustand/shallow'

import Materials from '@/configs/materials/list.json'

import useParameters from '@/helpers/parameters'
import useMaterials from '@/helpers/materials'

export function useToonShaderUpdater(model) {
  const [light, ambientLight] = useMaterials(
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

export function useDoubleColorManager(model, material) {
  const { color, color2 } = Materials[material]

  useEffect(() => {
    if (color) {
      const { material } = model.current

      const { colors } = useParameters.getState()
      const { h, s, l } = colors[color]

      material.uniforms.color.value.setHSL(h, s, l)

      useParameters.subscribe(
        ({ h, s, l }) => material.uniforms.color.value.setHSL(h, s, l),
        (state) => state.colors[color]
      )
    }
  }, [color, model])

  useEffect(() => {
    if (color2) {
      const { material } = model.current

      const { colors } = useParameters.getState()
      const { h, s, l } = colors[color2]

      material.uniforms.color2.value.setHSL(h, s, l)

      useParameters.subscribe(
        ({ h, s, l }) => material.uniforms.color2.value.setHSL(h, s, l),
        (state) => state.colors[color2]
      )
    }
  }, [color2, model])
}
