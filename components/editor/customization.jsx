import { folder, useControls, button } from 'leva'
import shallow from 'zustand/shallow'

import { levaList } from '@/libs/ui/leva-list'

import useCustomizing from '@/helpers/customizing'
import useParameters from '@/helpers/parameters'

import Sections from './inline-icons-pony/index'
import { Male, Female } from './inline-icons-pony/Genders'

import styles from '@/styles/editor.module.css'

export default function Customization() {
  const [index, config, setConfig] = useCustomizing(
    (state) => [state.index, state.config, state.setConfig],
    shallow
  )

  const [params, setMale, setColor, setName, setBoolean, setProperty] =
    useParameters(
      (state) => [
        state.booleans,
        state.setMale,
        state.setColor,
        state.setName,
        state.setBoolean,
        state.setProperty,
      ],
      shallow
    )

  useControls(() => {
    const values = {}

    const { colors, booleans, names, properties } = useParameters.getState()

    function createValues({ label, min, max, step, imgSrc, ...value }) {
      let valueObj = {}

      function createValue(_value, onChange, isColor = false) {
        const postValue = _value

        if (isColor) {
          postValue.s *= 100
          postValue.l *= 100
        }

        return { label, value: postValue, onChange }
      }

      if (value.importList) {
        valueObj = { label, options: value.importList }
      } else if (value.button) {
        valueObj = button(value.button)
      } else if (value.list) {
        valueObj = levaList({
          value: names[value],
          list: value.list,
          src: imgSrc,
          change: (valueIn, index) => setName(value, valueIn, index),
        })
      } else if (value.boolean) {
        valueObj = createValue(booleans[value.boolean], (valueIn) =>
          setBoolean(value.boolean, valueIn)
        )
      } else if (value.color) {
        valueObj = createValue(
          colors[value.color],
          (valueIn) => setColor(value.color, valueIn),
          true
        )
      } else if (value.value) {
        valueObj = createValue(properties[value.value], (valueIn) =>
          setProperty(value.value, valueIn)
        )
      }

      if (min) valueObj.min = min
      if (max) valueObj.max = max
      if (step) valueObj.step = step

      return valueObj
    }

    for (const label in config) {
      if (config[label].folder) {
        const group = {}

        for (const labelInner in config[label].folder) {
          group[labelInner] = createValues(config[label].folder[labelInner])
        }

        values[label] = folder(group, { collapsed: true })
      } else {
        values[label] = createValues(config[label])
      }
    }

    return values
  }, [config, setColor, setName, setBoolean, setProperty])

  return (
    <aside>
      <ul className={styles.rightBar}>
        <li onClick={() => setMale(!params.male)}>
          {params.male ? <Male /> : <Female />}
        </li>

        {Sections.map((Component, key) => (
          <li
            className={index === key ? styles.selected : undefined}
            key={key}
            onClick={() => setConfig(key)}
          >
            <Component />
          </li>
        ))}
      </ul>
    </aside>
  )
}
