import { folder, useControls, button } from 'leva'
import shallow from 'zustand/shallow'

import { levaList } from '@/libs/ui/leva-list'

import useCustomizing from '@/helpers/customizing'
import useParameters from '@/helpers/parameters'

import Sections from './inline-icons-pony/index'
import { Male, Female } from './inline-icons-pony/Genders'

import styles from '@/styles/editor.module.css'

function createValue({ label, value, onChange, isColor = false }) {
  const postValue = isColor ? { ...value } : value

  if (isColor) {
    postValue.s *= 100
    postValue.l *= 100
  }

  return { label, value: postValue, onChange }
}

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

    const { saves, slot, properties } = useParameters.getState()
    const { colors, booleans, names } = saves[slot]

    function createValues({ label, min, max, step, imgSrc, ..._value }) {
      let valueObj

      const {
        importList,
        button: valueBtn,
        list,
        boolean,
        color,
        value,
      } = _value

      switch (true) {
        case !!importList:
          valueObj = { label, options: importList }
          break

        case !!valueBtn:
          valueObj = button(valueBtn)
          break

        case !!list:
          valueObj = levaList({
            value: names[value],
            list,
            src: imgSrc,
            change: (valueIn, index) => setName(value, valueIn, index),
          })
          break

        case !!boolean:
          valueObj = createValue({
            label,
            value: booleans[boolean],
            onChange: (valueIn) => setBoolean(boolean, valueIn),
          })
          break

        case !!color:
          valueObj = createValue({
            label,
            value: colors[color],
            onChange: (valueIn) => setColor(color, valueIn),
            isColor: true,
          })
          break

        case !!value:
          valueObj = createValue({
            label,
            value: properties[value],
            onChange: (valueIn) => setProperty(value, valueIn),
          })
          break

        default:
          valueObj = {}
          break
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
