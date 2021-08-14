import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaCheck, FaFile, FaTimes } from 'react-icons/fa'
import shallow from 'zustand/shallow'

import ListButtons from '@/components/elements/listButtons'
import ListDropdown from '@/components/elements/listDropdown'
import useMenu from '@/helpers/menu'
import useParameters from '@/helpers/parameters'
import { useProfileSavesUpdate, useValidSaveStore } from '@/hooks/user'
import en from '@/locales/en/pages/editor/left-bar/savePersons'
import ru from '@/locales/ru/pages/editor/left-bar/savePersons'
import stylesElems from '@/styles/elements.module.css'
import styles from '@/styles/menu.module.css'

import { LeftSection } from '../createSection'
import { ExportButton, ImportButton } from './additional/saveButtons'

const selectorAllSaves = state => [
  state.saves,
  state.slot,
  state.profile.saves,
  state.profile.slot,
  state.profile.selected,
  state.setIsProfile,
  state.setSlot,
  state.addSave,
  state.deleteSave,
  state.setName,
  state.setSaveOnlineOrOffline
]

const selectorPageControl = state => [state.page, state.closePages]
//const selectorUser = state => state.user

function Icon({ className, onClick }) {
  return (
    <div onClick={onClick}>
      <FaFile className={className} />
    </div>
  )
}

export default function SavePersonSection() {
  const router = useRouter()

  const [page, closePages] = useMenu(selectorPageControl, shallow)
  const [
    saves,
    slot,
    profileSaves,
    profileSlot,
    isProfile,
    setIsProfile,
    setSlot,
    addSave,
    deleteSave,
    setName,
    setSaveOnlineOrOffline
  ] = useParameters(selectorAllSaves, shallow)

  useValidSaveStore(saves, slot, profileSlot, isProfile)
  useProfileSavesUpdate(profileSaves)

  //const user = useUser(selectorUser)

  const currentSaves = profileSaves && isProfile ? profileSaves : saves
  const currentSlot = profileSlot && isProfile ? profileSlot : slot

  const [translate, setTranslate] = useState(100)

  useEffect(() => {
    setTranslate(100 - +(page === 'SavePerson') * 100)
  }, [page])

  const [isNameEdit, setNameEditing] = useState(false)
  const [tempName, setTempName] = useState('')

  const t = router.locale === 'ru' ? ru : en

  return (
    <LeftSection name="SavePerson" icon={Icon}>
      <div
        style={{ transform: `translateY(${translate}%)` }}
        className={styles.bottomMenu}
      >
        <div>
          <div />

          <ListButtons
            list={[
              {
                text: t.import,
                component: ImportButton,
                disabled: currentSaves.length >= 10
              },
              { text: t.export, component: ExportButton },
              {
                text: t.new,
                style: 'bg-gray-800',
                onClick: () => addSave(),
                disabled: currentSaves.length >= 10
              },
              {
                text: t.delete,
                style: 'bg-gray-800',
                onClick: () => deleteSave(currentSlot),
                disabled: currentSaves.length < 2
              }
            ]}
          />

          {isNameEdit ? (
            <div className={stylesElems.input}>
              <div>
                <input
                  value={tempName}
                  placeholder={t.placeholder}
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
              label={isProfile ? t.saves.profile : t.saves.local}
              selectIndex={currentSlot}
              list={currentSaves.map(
                (save, index) => index + 1 + ' • ' + save.names.name
              )}
              maximum={10}
              onChange={({ target }) => setSlot(target.selectedIndex)}
              onEdit={value => {
                setTempName(value.replace(/^[0-9]+ • /m, '').substring(0, 20))
                setNameEditing(true)
              }}
            />
          )}

          <ListButtons
            list={[
              {
                text: isProfile ? t.saves.local : t.saves.profile,
                style: 'bg-gray-800',
                disabled: true /*!user.id*/,
                onClick: () => setIsProfile(!isProfile)
              },
              {
                text: isProfile
                  ? t.saves['move to local']
                  : t.saves['move to profile'],

                style: 'bg-gray-800',
                disabled: true /*!user.id || currentSaves.length < 1*/,
                onClick: () => setSaveOnlineOrOffline()
              },
              { text: t.close, style: 'bg-gray-800', onClick: closePages }
            ]}
          />

          <div />
        </div>
      </div>
    </LeftSection>
  )
}
