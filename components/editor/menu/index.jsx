import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import shallow from 'zustand/shallow'

import {
  FaCamera,
  FaCommentDots,
  FaFileImage,
  FaFileVideo,
  FaFilm,
  FaImage,
  FaSignOutAlt,
  FaUserCircle,
  FaUsers,
  FaVideo,
} from 'react-icons/fa'

import useMenu from '@/helpers/menu'
import useCustomizing from '@/helpers/customizing'

import styles from '@/styles/editor.module.css'

import Animations from './animations'
import TakeImage from './takeImage'
import TakeAnimation from './takeAnimation'
import Profile from './profile'
import Chat from './chat'
import LevelModal from './level'

function LevelIcon() {
  return (
    <div className='w-8 h-8 -m-1 text-lg text-center text-white border-2 border-blue-400 rounded-full'>
      1
    </div>
  )
}

function LangIcon() {
  const router = useRouter()

  const locale = router.locale === 'ru' ? 'en' : 'ru'

  return (
    <Link href={router.route} locale={locale} scroll={false}>
      <a className='p-2 text-lg text-center text-white -ml-1.5'>{locale}</a>
    </Link>
  )
}

const elements = [
  { icon: 'home' },
  { icon: 'divider' },
  { icon: FaImage, pageName: 'Environment' },
  { icon: FaFilm, pageName: 'Animation' },
  { icon: 'divider' },
  { icon: FaCamera, pageName: 'TakePhoto' },
  { icon: FaVideo, pageName: 'TakeVideo' },
  { icon: 'divider' },
  { icon: FaFileImage, pageName: 'SavePerson' },
  { icon: FaFileVideo, pageName: 'SaveAnimation' },
  { icon: 'divider' },
  { icon: 'spacer' },
  { icon: LangIcon, pageName: 'Language' },
  { icon: 'divider' },
  { icon: LevelIcon, pageName: 'Level' },
  { icon: FaUserCircle, pageName: 'Profile' },
  { icon: 'divider' },
  { icon: FaUsers, pageName: 'Social' },
  { icon: FaCommentDots, pageName: 'Chat' },
]

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
    if (page === 'SaveAnimation' && !environment) {
      setConfig(16)
      setEnvironment(true)
    } else if (page === 'SavePerson' && !environment) {
      setConfig(15)
      setEnvironment(true)
    } else if (page === 'Environment' && !environment) {
      setConfig(14)
      setEnvironment(true)
    } else if (page === null && environment) {
      closeWindow()
      setEnvironment(false)
    } else if (!environment) {
      closeWindow()
    }
  }, [closeWindow, environment, page, setConfig])

  return (
    <div>
      <ul className={styles.leftBar}>
        {elements.map(({ icon: Component, pageName }, key) =>
          Component === 'home' ? (
            <li key={key} className='text-white'>
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
            <li key={key} onClick={() => setPage(pageName)}>
              <Component
                className={page === pageName ? 'text-primary' : 'text-white'}
              />
            </li>
          )
        )}
      </ul>

      {page === 'Animation' && <Animations />}
      {page === 'TakePhoto' && <TakeImage />}
      {page === 'TakeVideo' && <TakeAnimation />}
      {page === 'Level' && <LevelModal />}
      {page === 'Profile' && <Profile />}
      {page === 'Chat' && <Chat />}
    </div>
  )
}
