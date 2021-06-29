import Image from 'next/image'

import { FaPaperPlane, FaPatreon, FaTwitter, FaVk } from 'react-icons/fa'

import OuterLink from '@/components/outerLink'
import ModalMini from '@/components/elements/modalMini'

import useMenu from '@/helpers/menu'

import styles from '@/styles/elements/chat.module.css'

export default function Chat() {
  const setPage = useMenu((state) => state.setPage)

  const messages = [
    { avatar: '/8344290.png', nickname: 'Electrum18', text: 'Hello', level: 0 },
    {
      avatar: '/8344290.png',
      nickname: 'John Doe',
      text: 'hdrayfdbtsdtsdrygdsarrtsghdrayfdbtsdtsdrygdsarrtsghdrayfdbtsdtsdrygdsarrtsghdrayfdbtsdtsdrygdsarrtsg',
      level: 10,
    },
    {
      avatar: '/8344290.png',
      nickname: '12312351213125211',
      text: '1111',
      level: 100,
    },
    {
      avatar: '/8344290.png',
      nickname: '12312351213125211',
      text: '1111',
      level: 100,
    },
    {
      avatar: '/8344290.png',
      nickname: '12312351213125211',
      text: '1111',
      level: 100,
    },
  ]

  return (
    <ModalMini title='Chat' page='Chat'>
      <div className={styles.buttons}>
        <button onClick={() => setPage('Notice')}> Notice </button>
        <button onClick={() => setPage('Rules')}> Rules </button>

        <OuterLink
          className='bg-blue-500'
          name='VKontakte'
          href='https://vk.com/thefluffies'
        >
          <FaVk />
        </OuterLink>

        <OuterLink
          className='bg-blue-400'
          name='Twitter'
          href='https://twitter.com/TFluffies'
        >
          <FaTwitter />
        </OuterLink>

        <OuterLink
          className='bg-red-400'
          name='Patreon'
          href='https://www.patreon.com/the_fluffies'
        >
          <FaPatreon />
        </OuterLink>
      </div>

      <div className={styles.messages}>
        {messages.map(({ avatar, nickname, text }, index) => (
          <div key={index}>
            <div>
              <Image
                src={avatar}
                className='rounded-lg'
                width='48'
                height='48'
              />
            </div>

            <div>
              <span>{nickname}</span>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.input}>
        <div>
          <input placeholder='Enter message...' />
          <FaPaperPlane />
        </div>

        <p> 0/100 </p>
      </div>
    </ModalMini>
  )
}
