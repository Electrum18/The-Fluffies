import Image from 'next/image'
import { FaPatreon } from 'react-icons/fa'

import ListButtons from '@/components/elements/listButtons'
import ModalMini from '@/components/elements/modalMini'

import useMenu from '@/helpers/menu'

import styles from '@/styles/elements/profile.module.css'

export default function Profile() {
  const setPage = useMenu((state) => state.setPage)

  return (
    <ModalMini title='Profile' page='Profile'>
      <div className={styles.avatar}>
        <div>
          <Image src='/8344290.png' width='96' height='96' />
        </div>

        <div>Electrum18</div>
      </div>

      <div className={styles.properties}>
        <div>
          <p>Patron level</p>

          <div className='p-1 text-lg text-orange-500 border-orange-500'>
            <FaPatreon className='w-8 h-8 mx-3 my-2.5' />
          </div>

          <div className='text-orange-500'>Big supporter</div>
        </div>

        <div>
          <p>Profile level</p>

          <div className='py-4 text-xl text-white border-blue-500'>100</div>
        </div>
      </div>

      <ListButtons
        list={[
          {
            text: 'Accounts',
            style: 'bg-gray-700',
            onClick: () => setPage('Accounts'),
          },
          { text: 'Logout', style: 'bg-red-500' },
        ]}
      />
    </ModalMini>
  )
}
