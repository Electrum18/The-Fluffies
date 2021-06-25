import Image from 'next/image'

import ListButtons from '@/components/elements/listButtons'
import ModalMini from '@/components/elements/modalMini'

export default function Profile() {
  return (
    <ModalMini title='Profile' page='Profile'>
      <div className='flex flex-col pb-4'>
        <div className='mx-auto overflow-hidden rounded-2xl'>
          <Image src='/8344290.png' width='96' height='96' />
        </div>

        <div className='mx-auto mb-0 text-xl text-center text-white'>
          Electrum18
        </div>

        <div className='flex flex-row items-center mx-auto mt-2 space-x-4'>
          <div className='flex flex-col'>
            <p className='px-2 my-0 text-sm text-center border-2 rounded-lg border-primary text-primary'>
              Big supporter
            </p>

            <span className='text-sm text-center text-gray-400'>patronage</span>
          </div>

          <div className='flex flex-col'>
            <div className='w-10 h-10 p-1 text-lg text-center text-white border-2 border-blue-400 rounded-full'>
              1
            </div>

            <span className='text-sm text-center text-gray-400'>level</span>
          </div>
        </div>
      </div>

      <ListButtons
        list={[
          { text: 'Accounts', style: 'bg-gray-700' },
          { text: 'Logout', style: 'bg-red-500' },
        ]}
      />
    </ModalMini>
  )
}
