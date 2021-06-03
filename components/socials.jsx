import { FaVk, FaPatreon, FaTwitter, FaGithub } from 'react-icons/fa'

import OuterLink from './outerLink'

export default function Socials() {
  return (
    <div className='flex flex-wrap content-center mx-auto mt-10 mb-2 md:my-0 md:mx-4'>
      <OuterLink name='VKontakte' href='https://vk.com/thefluffies'>
        <FaVk className='mx-2 w-7 h-7 hover:text-blue-500 transition-colors duration-300' />
      </OuterLink>

      <OuterLink name='Twitter' href='https://twitter.com/TFluffies'>
        <FaTwitter className='mx-2 w-7 h-7 hover:text-blue-400 transition-colors duration-300' />
      </OuterLink>

      <OuterLink name='Patreon' href='https://www.patreon.com/the_fluffies'>
        <FaPatreon className='mx-2 w-7 h-7 hover:text-red-400 transition-colors duration-300' />
      </OuterLink>

      <OuterLink
        name='GitHub'
        href='https://github.com/Electrum18/The-Fluffies'
      >
        <FaGithub className='mx-2 w-7 h-7 hover:text-gray-500 transition-colors duration-300' />
      </OuterLink>
    </div>
  )
}

export function SocialsMini() {
  return (
    <div className='flex flex-wrap content-center'>
      <OuterLink name='VKontakte' href='https://vk.com/thefluffies'>
        <FaVk className='w-5 h-5 mx-2 hover:text-blue-500 transition-colors duration-300' />
      </OuterLink>

      <OuterLink name='Twitter' href='https://twitter.com/TFluffies'>
        <FaTwitter className='w-5 h-5 mx-2 hover:text-blue-400 transition-colors duration-300' />
      </OuterLink>

      <OuterLink name='Patreon' href='https://www.patreon.com/the_fluffies'>
        <FaPatreon className='w-5 h-5 mx-2 hover:text-red-400 transition-colors duration-300' />
      </OuterLink>

      <OuterLink
        name='GitHub'
        href='https://github.com/Electrum18/The-Fluffies'
      >
        <FaGithub className='w-5 h-5 mx-2 hover:text-gray-500 transition-colors duration-300' />
      </OuterLink>
    </div>
  )
}
