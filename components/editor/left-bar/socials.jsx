import { FaGithub, FaUsers, FaPatreon, FaTwitter, FaVk } from 'react-icons/fa'

import OuterLink from '@/components/outerLink'
import ModalMini from '@/components/elements/modalMini'

import { LeftSection } from '../createSection'

import styles from '@/styles/elements/socials.module.css'

function Icon({ className, onClick }) {
  return (
    <div onClick={onClick}>
      <FaUsers className={className} />
    </div>
  )
}

export default function SocialSection() {
  return (
    <LeftSection name='Social' icon={Icon}>
      <ModalMini title='We are here!' page='Social'>
        <div className={styles.content}>
          <OuterLink name='VKontakte' href='https://vk.com/thefluffies'>
            <FaVk className='border-blue-500 hover:text-blue-500' />
          </OuterLink>

          <OuterLink name='Twitter' href='https://twitter.com/TFluffies'>
            <FaTwitter className='border-blue-400 hover:text-blue-400' />
          </OuterLink>

          <OuterLink name='Patreon' href='https://www.patreon.com/the_fluffies'>
            <FaPatreon className='border-red-400 hover:text-red-400' />
          </OuterLink>

          <OuterLink
            name='GitHub'
            href='https://github.com/Electrum18/The-Fluffies'
          >
            <FaGithub className='border-gray-400 hover:text-gray-400' />
          </OuterLink>
        </div>
      </ModalMini>
    </LeftSection>
  )
}
