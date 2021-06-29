import { FaGoogle, FaPatreon, FaVk } from 'react-icons/fa'

import ModalMini from '@/components/elements/modalMini'

import styles from '@/styles/elements/accounts.module.css'

export default function Accounts() {
  return (
    <ModalMini title='Profile accounts' page='Accounts'>
      <p className='mt-0 mb-4 text-sm text-center text-white'>
        Login to profile with
      </p>

      <div className={styles.content}>
        <FaGoogle className='border-red-500 hover:text-red-500' />
        <FaVk className='border-blue-500 hover:text-blue-500' />
        <FaPatreon className='border-red-400 hover:text-red-400' />
      </div>
    </ModalMini>
  )
}
