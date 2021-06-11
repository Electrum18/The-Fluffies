import { folder, useControls } from 'leva'
import shallow from 'zustand/shallow'

import { levaList } from '@/libs/ui/leva-list'

import useCustomizing from '@/helpers/customizing'
import useParameters from '@/helpers/parameters'

import Sections from './inline-icons-pony/index'

import styles from '@/styles/editor.module.css'

export default function Customization() {
  const [config, setConfig] = useCustomizing(
    (state) => [state.config, state.setConfig],
    shallow
  )

  const [setColor, setValue] = useParameters(
    (state) => [state.setColor, state.setValue],
    shallow
  )

  useControls(() => {
    const properties = {}

    const { colors, values } = useParameters.getState()

    function createValues({
      label,
      value,
      shade,
      isColor,
      list,
      min,
      max,
      imgSrc,
    }) {
      let valueObj = {}

      if (list) {
        valueObj = levaList({
          value: (isColor ? colors : values)[value],
          list,
          src: imgSrc,
          change: (valueIn) => setValue(value, valueIn),
        })
      } else {
        valueObj = {
          label,
          value: (isColor ? colors : values)[value],
          onChange: (valueIn) => {
            if (isColor) {
              const { h, s, l } = valueIn

              setColor(value, { h, s, l })

              if (shade) setColor(shade, { h, s, l: l / 2 })
            } else {
              setValue(value, valueIn)
            }
          },
        }
      }

      if (min) valueObj.min = min
      if (max) valueObj.max = max

      return valueObj
    }

    for (const label in config) {
      if (config[label].folder) {
        const group = {}

        for (const labelInner in config[label].folder) {
          group[labelInner] = createValues(config[label].folder[labelInner])
        }

        properties[label] = folder(group, { collapsed: true })
      } else {
        properties[label] = createValues(config[label])
      }
    }

    return properties
  }, [config, setColor, setValue])

  return (
    <div className={styles['right-bar']}>
      {Sections.map((Component, key) => (
        <div key={key} onClick={() => setConfig(key)}>
          <Component />
        </div>
      ))}
    </div>
  )
}
