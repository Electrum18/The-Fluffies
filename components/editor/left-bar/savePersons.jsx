import React, { useEffect, useMemo, useState } from 'react'
import shallow from 'zustand/shallow'

import ListDropdown from '@/components/elements/listDropdown'
import ListButtons from '@/components/elements/listButtons'

import useMenu from '@/helpers/menu'
import useParameters from '@/helpers/parameters'

import styles from '@/styles/menu.module.css'
import stylesElems from '@/styles/elements.module.css'

import { LeftSection } from '../createSection'

import { FaCheck, FaFile, FaTimes } from 'react-icons/fa'

const selectorParseSave = (state) => state.parseSave
const selectorCurrentSave = (state) => [
  state.saves[state.slot].names,
  state.saves[state.slot].booleans,
  state.saves[state.slot].colors,
]

const selectorAllSaves = (state) => [
  state.saves,
  state.slot,
  state.setSlot,
  state.addSave,
  state.deleteSave,
  state.setName,
]

const selectorPageControl = (state) => [state.page, state.closePages]
const selectorClosePage = (state) => state.closePages

function Icon({ className, onClick }) {
  return (
    <div onClick={onClick}>
      <FaFile className={className} />
    </div>
  )
}

function ImportButton({ text }) {
  const parseSave = useParameters(selectorParseSave)
  const closePages = useMenu(selectorClosePage)

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
  const [names, booleans, color] = useParameters(selectorCurrentSave, shallow)

  const data = useMemo(
    () =>
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ names, booleans, color })),
    [booleans, color, names]
  )

  return (
    <div className='flex'>
      <a
        className='flex items-center justify-around w-32 -mx-4 -my-2'
        href={data}
        download={names.name + ' - The Fluffies.json'}
      >
        <span>{text}</span>
      </a>
    </div>
  )
}

export default function SavePersonSection() {
  const [page, closePages] = useMenu(selectorPageControl, shallow)
  const [saves, slot, setSlot, addSave, deleteSave, setName] = useParameters(
    selectorAllSaves,
    shallow
  )

  const [translate, setTranslate] = useState(100)
  const [isProfile, setIsProfile] = useState(false)

  const [isNameEdit, setNameEditing] = useState(false)
  const [tempName, setTempName] = useState('')

  useEffect(() => {
    setTranslate(100 - +(page === 'SavePerson') * 100)
  }, [page])

  return (
    <LeftSection name='SavePerson' icon={Icon}>
      <div
        style={{ transform: `translateY(${translate}%)` }}
        className={styles.bottomMenu}
      >
        <div>
          <div />

          <ListButtons
            list={[
              {
                text: 'Import',
                component: ImportButton,
                disabled: saves.length >= 10,
              },
              { text: 'Export', component: ExportButton },
              {
                text: 'New',
                style: 'bg-gray-800',
                onClick: () => addSave(),
                disabled: saves.length >= 10,
              },
              {
                text: 'Delete',
                style: 'bg-gray-800',
                onClick: () => deleteSave(slot),
                disabled: saves.length < 2,
              },
            ]}
          />

          {isNameEdit ? (
            <div className={stylesElems.input}>
              <div>
                <input
                  value={tempName}
                  placeholder='Enter name...'
                  onChange={({ target }) =>
                    setTempName(target.value.substring(0, 20))
                  }
                />

                <div>
                  <div onClick={() => setNameEditing(false)}>
                    <FaTimes />
                  </div>
                  <div
                    onClick={() => {
                      setName('name', tempName)
                      setNameEditing(false)
                    }}
                    className={
                      tempName.length < 1
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  >
                    <FaCheck />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ListDropdown
              label='Local saves'
              selectIndex={slot}
              list={saves.map(
                (save, index) => index + 1 + ' • ' + save.names.name
              )}
              maximum={10}
              onChange={({ target }) => setSlot(target.selectedIndex)}
              onEdit={(value) => {
                setTempName(value.replace(/^[0-9]+ • /m, '').substring(0, 20))
                setNameEditing(true)
              }}
            />
          )}

          <ListButtons
            list={[
              {
                text: 'Profile saves',
                style: 'bg-gray-800',
                onClick: () => setIsProfile(!isProfile),
              },
              { text: 'Save to profile', style: 'bg-gray-800' },
              { text: 'Close', style: 'bg-gray-800', onClick: closePages },
            ]}
          />

          <div />
        </div>
      </div>
    </LeftSection>
  )
}
