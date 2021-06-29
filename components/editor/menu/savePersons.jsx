import React, { useEffect, useMemo, useState } from 'react'
import shallow from 'zustand/shallow'

import ListDropdown from '@/components/elements/listDropdown'
import ListButtons from '@/components/elements/listButtons'

import useMenu from '@/helpers/menu'
import useParameters from '@/helpers/parameters'

import styles from '@/styles/menu.module.css'

function ImportButton({ text }) {
  const parseSave = useParameters((state) => state.parseSave)
  const closePages = useMenu((state) => state.closePages)

  return (
    <div className='relative w-32 px-4 py-2 overflow-hidden font-bold text-center text-white bg-gray-800 rounded-lg'>
      <span>{text}</span>
      <input
        className='absolute top-0 left-0 w-32 p-1 m-0 opacity-0 cursor-pointer'
        type='file'
        accept='.json'
        onChange={parseSave}
        onClick={() => closePages}
      />
    </div>
  )
}

function ExportButton({ text }) {
  const [names, booleans, color] = useParameters(
    (state) => [state.names, state.booleans, state.colors],
    shallow
  )

  const data = useMemo(
    () =>
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ names, booleans, color })),
    [booleans, color, names]
  )

  return (
    <div className='w-32 px-4 py-2 overflow-hidden font-bold text-center text-white bg-gray-800 rounded-lg'>
      <a className='w-32 px-4 py-2' href={data} download='test.json'>
        {text}
      </a>
    </div>
  )
}

export default function SavePersons() {
  const [page, closePages] = useMenu(
    (state) => [state.page, state.closePages],
    shallow
  )

  const [translate, setTranslate] = useState(100)

  useEffect(() => {
    setTranslate(100 - +(page === 'SavePerson') * 100)
  }, [page])

  return (
    <div
      style={{ transform: `translateY(${translate}%)` }}
      className={styles.bottomMenu}
    >
      <div>
        <div />

        <ListButtons
          list={[
            { text: 'Import', component: ImportButton },
            { text: 'Export', component: ExportButton },
            { text: 'To profile', style: 'bg-gray-800' },
          ]}
        />

        <ListDropdown
          label='Profile saves'
          list={[
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
          ]}
        />

        <ListDropdown
          label='Local saves'
          list={[
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
            'Defaulty',
          ]}
        />

        <ListButtons
          list={[{ text: 'Close', style: 'bg-gray-800', onClick: closePages }]}
        />

        <div />
      </div>
    </div>
  )
}
