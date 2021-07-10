import { useEffect, useState } from 'react'
import { useControls } from 'leva'

import { levaList } from '@/libs/ui/leva-list'

import useParameters from '@/helpers/parameters'

function formatColor(color) {
  const pastColor = { ...color }

  pastColor.s *= 100
  pastColor.l *= 100

  return pastColor
}

function bindData(data) {
  const values = {}

  const {
    saves,
    slot,
    properties,
    setColor,
    setName,
    setBoolean,
    setProperty,
  } = useParameters.getState()

  const { colors, booleans, names } = saves[slot]

  for (const valueName in data) {
    const valueContent = data[valueName]

    const { list, color, boolean, value, imgSrc } = valueContent

    switch (true) {
      case !!list:
        values[valueName] = levaList({
          value: names[value],
          list,
          src: imgSrc,
          change: (valueIn) => setName(value, valueIn),
        })
        break

      case !!boolean:
        values[valueName] = {
          value: booleans[boolean],
          onChange: (valueIn) => setBoolean(boolean, valueIn),
        }
        break

      case !!color:
        values[valueName] = {
          value: colors[color],
          onChange: (valueIn) => setColor(color, valueIn),
        }
        break

      case !!value:
        values[valueName] = {
          value: properties[value],
          onChange: (valueIn) => setProperty(value, valueIn),
        }
        break

      default:
        break
    }

    if (valueContent.min) values[valueName].min = valueContent.min
    if (valueContent.max) values[valueName].max = valueContent.max
    if (valueContent.step) values[valueName].step = valueContent.step
  }

  return values
}

function dataValues(data) {
  const values = {}

  const { saves, slot, properties } = useParameters.getState()
  const { colors, booleans, names } = saves[slot]

  for (const valueName in data) {
    const valueContent = data[valueName]
    const { color, boolean, value, list } = valueContent

    switch (true) {
      case !!list:
        values[valueName] = names[value]
        break

      case !!boolean:
        values[valueName] = booleans[boolean]
        break

      case !!color:
        values[valueName] = formatColor(colors[color])
        break

      case !!value:
        values[valueName] = properties[value]
        break

      default:
        break
    }
  }

  return values
}

export default function Controls({ title, data }) {
  const [validValues, setValidValues] = useState({})

  const [, set] = useControls(
    title || '',
    () => {
      setValidValues(dataValues(data))
      return bindData(data)
    },
    { collapsed: true },
    [data]
  )

  useEffect(() => {
    set(validValues)
  }, [validValues, set])

  return null
}
