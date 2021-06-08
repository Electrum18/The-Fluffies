import { useEffect } from 'react'
import { useControls } from 'leva'
import shallow from 'zustand/shallow'

import useParameters from '@/helpers/parameters'

export function useCustiomizationWindow(config) {
  const [setColor, setValue] = useParameters(
    (state) => [state.setColor, state.setValue],
    shallow
  )

  const [, set] = useControls(() => {
    const properties = {}

    const { colors, values } = useParameters.getState()

    function setValueTyped(key, value, shade, type) {
      if (type === 'value') {
        setValue(key, value)
      } else if (type === 'color') {
        const { h, s, l } = value

        setColor(key, { h, s, l })

        if (shade) setColor(shade, { h, s, l: l / 2 })
      }
    }

    for (const key in config) {
      const { label, type, shade, list } = config[key]

      const valueSrc = type === 'color' ? colors : values

      properties[key] = {
        label,
        value: valueSrc[key],
        onChange: (valueIn) => setValueTyped(key, valueIn, shade, type),
      }

      if (list) {
        properties[key].options = Object.keys(list).map((key) =>
          key.replace(/_/g, ' ')
        )
      }
    }

    return properties
  })

  useEffect(() => {
    for (const key in config) {
      const { type } = config[key]

      useParameters.subscribe(
        (value) => set({ [key]: value }),
        (state) => state[type + 's'][key]
      )
    }
  }, [config, set])
}
