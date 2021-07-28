import Image from 'next/image'
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
import io from 'socket.io-client'

import ModalMini from '@/components/elements/modalMini'
import OverlayWarning from '@/components/elements/overlayWarn'
import OuterLink from '@/components/outerLink'
import useMenu from '@/helpers/menu'
import useUser from '@/helpers/user'
import styles from '@/styles/elements/chat.module.css'

import { LeftSection } from '../createSection'
import Login from './additional/login'

function Icon({ className, onClick }) {
  return (
    <div onClick={onClick}>
      <FaCommentDots className={className} />
    </div>
  )
}

function Buttons() {
  const setPage = useMenu(state => state.setPage)

  return (
    <div className={styles.buttons}>
      <button
        className=" hover:bg-gray-600 transition-colors"
        onClick={() => setPage('Notice')}
      >
        Notice
      </button>

      <button
        className=" hover:bg-gray-600 transition-colors"
        onClick={() => setPage('Rules')}
      >
        Rules
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
  const user = useUser(state => state.user)

  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')

  const [messages, setMessages] = useState([])
  const [usersCount, setUsersCount] = useState(0)

  useEffect(() => {
    const { host, hostname } = window.location

    setSocket(io(hostname === 'localhost' ? hostname + ':3001' : host))
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('get messages', msg => setMessages(msg.reverse()))
    socket.on('get message', msg =>
      setMessages(_messages => [msg, ..._messages])
    )

    socket.on('get users count', users => setUsersCount(users))

    return () => {
      socket.disconnect()

      setSocket(null)
    }
  }, [socket])

  function sendMessage() {
    if (socket && user.nickname && message.length > 0) {
      socket.emit('send message', message.substring(0, 100))

      setMessage('')
    }
  }

  return (
    <LeftSection name="Chat" icon={Icon}>
      <ModalMini title="Chat" page="Chat">
        <Buttons />

        <ul className={styles.messages}>
          {messages.map(({ avatar, name, text, level }, index) => (
            <li key={index}>
              <div>
                <Image
                  loader={({ src }) => src}
                  src={avatar}
                  alt={name + ' avatar'}
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
              placeholder="Enter message..."
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
          <p> Login to chat </p>
          <Login />
        </OverlayWarning>

        <OverlayWarning condition={socket && !socket.connected}>
          <p> Failed connection to chat </p>
          <FaCommentSlash />
        </OverlayWarning>
      </ModalMini>
    </LeftSection>
  )
}
