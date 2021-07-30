import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  FaCommentDots,
  FaCommentSlash,
  FaPaperPlane,
  FaPatreon,
  FaTwitter,
  FaUser,
  FaVk
} from 'react-icons/fa'

import ModalMini from '@/components/elements/modalMini'
import OverlayWarning from '@/components/elements/overlayWarn'
import OuterLink from '@/components/outerLink'
import useMenu from '@/helpers/menu'
import useSocket from '@/helpers/socket'
import useUser from '@/helpers/user'
import en from '@/locales/en/pages/editor/left-bar/chat'
import ru from '@/locales/ru/pages/editor/left-bar/chat'
import styles from '@/styles/elements/chat.module.css'

import { LeftSection } from '../createSection'
import Login from './additional/login'

const selectorSocket = state => state.socket

function Icon({ className, onClick }) {
  return (
    <div onClick={onClick}>
      <FaCommentDots className={className} />
    </div>
  )
}

function Buttons({ t }) {
  const setPage = useMenu(state => state.setPage)

  return (
    <div className={styles.buttons}>
      <button
        className="hover:bg-gray-600 transition-colors"
        onClick={() => setPage('Notice')}
      >
        {t.notice}
      </button>

      <button
        className="hover:bg-gray-600 transition-colors"
        onClick={() => setPage('Rules')}
      >
        {t.rules}
      </button>

      <OuterLink
        className="bg-blue-500 hover:bg-blue-400 transition-colors"
        name="VKontakte"
        href="https://vk.com/thefluffies"
      >
        <FaVk />
      </OuterLink>

      <OuterLink
        className="bg-blue-400 hover:bg-blue-300 transition-colors"
        name="Twitter"
        href="https://twitter.com/TFluffies"
      >
        <FaTwitter />
      </OuterLink>

      <OuterLink
        className="bg-red-400 hover:bg-red-300 transition-colors"
        name="Patreon"
        href="https://www.patreon.com/the_fluffies"
      >
        <FaPatreon />
      </OuterLink>
    </div>
  )
}

export default function ChatSection() {
  const router = useRouter()

  const user = useUser(state => state.user)

  const socket = useSocket(selectorSocket)
  const [message, setMessage] = useState('')

  const [messages, setMessages] = useState([])
  const [usersCount, setUsersCount] = useState(0)

  function setMessagesListener(msg) {
    setMessages(msg.reverse())
  }

  function setOneMessageListener(msg) {
    setMessages(_messages => [msg, ..._messages])
  }

  function setUsersCountListener(users) {
    setUsersCount(users)
  }

  useEffect(() => {
    if (!socket) return

    socket.on('get messages', setMessagesListener)
    socket.on('get message', setOneMessageListener)
    socket.on('get users count', setUsersCountListener)

    return () => {
      socket.off('get messages', setMessagesListener)
      socket.off('get message', setOneMessageListener)
      socket.off('get users count', setUsersCountListener)
    }
  }, [socket])

  function sendMessage() {
    if (socket && user.nickname && message.length > 0) {
      socket.emit('send message', message.substring(0, 100))

      setMessage('')
    }
  }

  const t = router.locale === 'ru' ? ru : en

  return (
    <LeftSection name="Chat" icon={Icon}>
      <ModalMini title={t.title} page="Chat">
        <Buttons t={t} />

        <ul className={styles.messages}>
          {messages.map(({ avatar, name, text, level }, index) => (
            <li key={index}>
              <div>
                <Image
                  loader={({ src }) => src}
                  src={avatar}
                  alt={name + t.avatar}
                  className="rounded-lg"
                  width="40"
                  height="40"
                />
              </div>

              <div>
                <span>
                  {name + ' • '}
                  <span className="font-bold text-blue-400">{level}</span>
                </span>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.input}>
          <div>
            <input
              value={message}
              placeholder={t.input.placeholder}
              onChange={({ target }) =>
                setMessage(target.value.substring(0, 100))
              }
              onKeyUp={({ key }) =>
                key === 'Enter' && message.length > 0 && sendMessage()
              }
            />

            <FaPaperPlane onClick={() => message.length > 0 && sendMessage()} />
          </div>

          <div>
            <div>
              <FaUser />
              <p>{' • ' + usersCount}</p>
            </div>

            <p>{message.length}/100</p>
          </div>
        </div>

        <OverlayWarning
          condition={socket && socket.connected && !user.nickname}
        >
          <p>{t.login}</p>

          <Login />
        </OverlayWarning>

        <OverlayWarning condition={socket && !socket.connected}>
          <p>{t.failed}</p>

          <FaCommentSlash />
        </OverlayWarning>
      </ModalMini>
    </LeftSection>
  )
}
