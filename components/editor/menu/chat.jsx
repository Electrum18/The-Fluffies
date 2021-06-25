import Image from 'next/image'

import { FaPaperPlane, FaPatreon, FaTwitter, FaVk } from 'react-icons/fa'

import OuterLink from '@/components/outerLink'
import ModalMini from '@/components/elements/modalMini'

export default function Chat() {
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
      <div className='flex flex-row mb-2 space-x-2'>
        <button className='flex-grow py-1 font-bold text-center text-white bg-gray-700 rounded-lg'>
          Notice
        </button>

        <button className='flex-grow py-1 font-bold text-center text-white bg-gray-700 rounded-lg'>
          Rules
        </button>

        <OuterLink
          className='w-8 h-8 bg-blue-500 rounded-lg'
          name='VKontakte'
          href='https://vk.com/thefluffies'
        >
          <FaVk className='w-6 h-6 m-1 text-white' />
        </OuterLink>

        <OuterLink
          className='w-8 h-8 bg-blue-400 rounded-lg'
          name='Twitter'
          href='https://twitter.com/TFluffies'
        >
          <FaTwitter className='w-6 h-6 m-1 text-white' />
        </OuterLink>

        <OuterLink
          className='w-8 h-8 bg-red-400 rounded-lg'
          name='Patreon'
          href='https://www.patreon.com/the_fluffies'
        >
          <FaPatreon className='w-5 h-5 text-white m-1.5' />
        </OuterLink>
      </div>

      <div className='flex flex-col-reverse h-48 overflow-y-scroll bg-gray-700 border-2 border-gray-500 lg:h-96 w-96 rounded-xl'>
        {messages.map(({ avatar, nickname, text }, index) => (
          <div key={index} className='flex flex-col m-1 bg-gray-800 rounded-lg'>
            <div className='flex flex-row'>
              <div className='flex-shrink-0 m-1 mb-0 min-w-12 min-h-12'>
                <Image
                  src={avatar}
                  className='rounded-lg'
                  width='48'
                  height='48'
                />
              </div>

              <div className='flex flex-col p-1'>
                <span className='text-sm text-gray-300'>{nickname}</span>
                <span className='text-base text-white break-all'>{text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-row'>
        <input
          className='w-full p-1 mt-4 text-white bg-gray-700 border-2 border-gray-500 rounded-lg'
          placeholder='Enter message...'
        />

        <FaPaperPlane className='w-5 h-5 mt-6 -ml-8 text-primary' />
      </div>

      <p className='mb-0 text-sm text-right text-white'> 0/100 </p>
    </ModalMini>
  )
}
