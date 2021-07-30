import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  FaCheck,
  FaPatreon,
  FaPen,
  FaTimes,
  FaUserCircle
} from 'react-icons/fa'
import { mutate } from 'swr'

import ListButtons from '@/components/elements/listButtons'
import ModalMini from '@/components/elements/modalMini'
import useMenu from '@/helpers/menu'
import useUser from '@/helpers/user'
import { useSiteUrl } from '@/hooks/urls'
import en from '@/locales/en/pages/editor/left-bar/profile'
import ru from '@/locales/ru/pages/editor/left-bar/profile'
import styles from '@/styles/elements/profile.module.css'

import { LeftSection } from '../createSection'
import Login from './additional/login'

const selectorUser = state => state.user
const selectorSetPage = state => state.setPage

const patronColor = {
  None: {
    icon: 'text-gray-500 border-gray-500',
    text: 'text-gray-400'
  },

  'Little supporter': {
    icon: 'text-orange-500 border-orange-500',
    text: 'text-orange-500'
  },

  'Basic supporter': {
    icon: 'text-gray-300 border-gray-300',
    text: 'text-gray-300'
  },

  'Huge supporter': {
    icon: 'text-yellow-500 border-yellow-500',
    text: 'text-yellow-500'
  }
}

function Icon({ onClick }) {
  const user = useUser(selectorUser)

  return (
    <div onClick={onClick}>
      {user.avatar && user.nickname ? (
        <div className="w-6 h-6">
          <Image
            className="rounded"
            loader={({ src }) => src}
            src={user.avatar}
            alt={user.nickname}
            width="32"
            height="32"
          />
        </div>
      ) : (
        <FaUserCircle className="text-white" />
      )}
    </div>
  )
}

function Logout({ text }) {
  const router = useRouter()
  const authUrl = useSiteUrl()

  const t = router.locale === 'ru' ? ru : en

  return (
    <a
      className="bg-red-500 hover:bg-red-400"
      title={t.logout.info}
      aria-label={t.logout.info}
      href={authUrl + '/auth/logout'}
    >
      {text}
    </a>
  )
}

function Nickname({ nickname, t }) {
  const [nicknameEditing, setNicknameEditing] = useState(false)
  const [tempNickname, setTempNickname] = useState('')

  const userUrl = useSiteUrl()

  const nicknameSize =
    nickname && nickname.length > 20
      ? 'text-sm'
      : nickname && nickname.length > 15
      ? 'text-base'
      : 'text-lg'

  function changeNickname(_nickname) {
    fetch(userUrl + '/user/change/name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ nickname: _nickname })
    }).then(res => {
      if (res.ok) {
        mutate(userUrl + '/user')
        setNicknameEditing(false)
      }
    })
  }

  useEffect(() => {
    setTempNickname(nickname || '')
  }, [nickname])

  return nicknameEditing ? (
    <div className={styles.input}>
      <div>
        <input
          value={tempNickname}
          placeholder={t.nickname.placeholder}
          onChange={({ target }) =>
            setTempNickname(target.value.substring(0, 30))
          }
        />

        <FaTimes
          className="w-5 h-8 py-2 text-gray-400 cursor-pointer hover:text-red-500"
          onClick={() => setNicknameEditing(false)}
        />

        <FaCheck
          className={
            'w-5 h-8 py-2 ' +
            (tempNickname.length > 5
              ? 'text-gray-400 cursor-pointer hover:text-green-500'
              : 'pointer-events-none text-gray-700')
          }
          onClick={() => changeNickname(tempNickname)}
        />
      </div>
    </div>
  ) : (
    <div>
      <span className={nicknameSize}>{nickname}</span>

      <FaPen
        className="w-8 h-8 p-2 text-gray-400 cursor-pointer hover:text-gray-300"
        onClick={() => setNicknameEditing(true)}
      />
    </div>
  )
}

function Benefits({ user, t }) {
  return (
    <div className={styles.properties}>
      <div>
        <div
          className={'p-1 text-lg ' + patronColor[user.patron || 'None'].icon}
        >
          <FaPatreon className="w-8 h-8 mx-3 my-2.5" />
        </div>

        <p>{t.patronage.title}</p>

        <div className={patronColor[user.patron || 'None'].text}>
          {user.patron ? user.patron : t.patronage.none}
        </div>
      </div>

      <div>
        <div className="py-3 text-2xl text-white bg-blue-700 border-blue-500">
          {user.level}
        </div>

        <p>{t.level.title}</p>

        <div className="text-gray-400">{t.level.tip}</div>
      </div>
    </div>
  )
}

export default function ProfileSection() {
  const router = useRouter()

  const user = useUser(selectorUser)
  const setPage = useMenu(selectorSetPage)

  const t = router.locale === 'ru' ? ru : en

  return (
    <LeftSection name="Profile" icon={Icon}>
      {user.nickname ? (
        <ModalMini title={t.title} page="Profile">
          <div className={styles.avatar}>
            <div>
              <Image
                loader={({ src }) => src}
                src={user.avatar}
                alt={t.avatar.placeholder}
                width="96"
                height="96"
              />
            </div>

            <Nickname nickname={user.nickname} t={t} />
          </div>

          <Benefits user={user} t={t} />

          <ListButtons
            list={[
              {
                text: t.accounts,
                style: 'bg-gray-700 hover:bg-gray-600',
                onClick: () => setPage('Accounts')
              },
              { text: t.logout.title, component: Logout }
            ]}
          />
        </ModalMini>
      ) : (
        <ModalMini title={t.login} page="Profile">
          <Login />
        </ModalMini>
      )}
    </LeftSection>
  )
}
