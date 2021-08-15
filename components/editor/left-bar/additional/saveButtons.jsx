import React, { useMemo } from 'react'
import shallow from 'zustand/shallow'

import useMenu from '@/helpers/menu'
import useParameters from '@/helpers/parameters'
import { getSaveValue } from '@/libs/saves'

const selectorParseSave = state => state.parseSave
const selectorClosePage = state => state.closePages

const selectorCurrentSave = state => [
  getSaveValue(state, 'names'),
  getSaveValue(state, 'booleans'),
  getSaveValue(state, 'colors')
]

export function ImportButton({ text }) {
  const parseSave = useParameters(selectorParseSave)
  const closePages = useMenu(selectorClosePage)

  return (
    <div className="relative w-32 px-4 py-2 overflow-hidden font-bold text-center text-white bg-gray-800 rounded-lg">
      <span>{text}</span>
      <input
        className="absolute top-0 left-0 w-32 p-1 m-0 opacity-0 cursor-pointer"
        type="file"
        accept=".json"
        onChange={parseSave}
        onClick={() => closePages}
      />
    </div>
  )
}

export function ExportButton({ text }) {
  const [names, booleans, color] = useParameters(selectorCurrentSave, shallow)

  const data = useMemo(
    () =>
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ names, booleans, color })),
    [booleans, color, names]
  )

  return (
    <div className="flex">
      <a
        className="flex items-center justify-around w-32 -mx-4 -my-2"
        href={data}
        download={names.name + ' - The Fluffies.json'}
      >
        <span>{text}</span>
      </a>
    </div>
  )
}
