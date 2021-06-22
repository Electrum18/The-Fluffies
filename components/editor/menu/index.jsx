import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import shallow from 'zustand/shallow'

import {
  FaCamera,
  FaCommentDots,
  FaFileImage,
  FaFileVideo,
  FaFilm,
  FaImage,
  FaSignOutAlt,
  FaUser,
  FaVideo,
} from 'react-icons/fa'

import useMenu from '@/helpers/menu'
import useCustomizing from '@/helpers/customizing'

import styles from '@/styles/editor.module.css'

const elements = [
  'home',
  'divider',
  FaImage,
  FaFilm,
  'divider',
  FaCamera,
  FaVideo,
  'divider',
  FaFileImage,
  FaFileVideo,
  'divider',
  'spacer',
  FaUser,
  FaCommentDots,
]

const indexes = {
  2: 'Environment',
  3: 'Animation',
  5: 'TakePhoto',
  6: 'TakeVideo',
  8: 'SavePhoto',
  9: 'SaveAnimation',
  12: 'Profile',
  13: 'Chat',
}

export default function Menu() {
  const [page, setPage] = useMenu(
    (state) => [state.page, state.setPage],
    shallow
  )

  const [setConfig, closeWindow] = useCustomizing(
    (state) => [state.setConfig, state.closeWindow],
    shallow
  )

  const [environment, setEnvironment] = useState(false)

  useEffect(() => {
    if (page === 'Environment' && !environment) {
      setConfig(14)
      setEnvironment(true)
    } else if (page !== 'Environment' && environment) {
      closeWindow()
      setEnvironment(false)
    }
  }, [closeWindow, environment, page, setConfig])

  return (
    <div>
      <ul className={styles['left-bar']}>
        {elements.map((Component, key) =>
          Component === 'home' ? (
            <li key={key} className={styles['menu-icon']}>
              <Link href='/'>
                <a>
                  <FaSignOutAlt />
                </a>
              </Link>
            </li>
          ) : Component === 'divider' ? (
            <hr key={key} />
          ) : Component === 'spacer' ? (
            <div key={key} />
          ) : (
            <li key={key} onClick={() => setPage(indexes[key])}>
              <Component
                className={
                  page === indexes[key]
                    ? styles['selected-icon']
                    : styles['menu-icon']
                }
              />
            </li>
          )
        )}
      </ul>
    </div>
  )
}
