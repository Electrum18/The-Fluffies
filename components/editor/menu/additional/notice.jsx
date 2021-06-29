import { FaHeart } from 'react-icons/fa'

import ModalMini from '@/components/elements/modalMini'

import styles from '@/styles/elements/chat.module.css'

export default function Notice() {
  return (
    <ModalMini title='Chat notice' page='Notice'>
      <p className='w-64 mx-auto my-0 text-sm text-center text-white'>
        Welcome to the editor chat!
      </p>

      <p className='w-64 mx-auto my-2 text-sm text-center text-white'>
        Chat and ask questions and get them in return, do not forget about the
        chat rules
      </p>

      <div className='flex flex-row p-2 my-2 bg-gray-700 border-2 border-gray-600 rounded-lg space-x-2'>
        <p className='my-2 text-2xl font-bold text-red-500 mx-0.5'>
          <FaHeart />
        </p>
        <p className='w-64 text-sm font-bold text-white'>
          Thank you for using our editor, please support its development by
          mentioning it or creating content with its participation
        </p>
      </div>
    </ModalMini>
  )
}
