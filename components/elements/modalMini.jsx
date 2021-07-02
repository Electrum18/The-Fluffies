import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import shallow from 'zustand/shallow'

import useMenu from '@/helpers/menu'

import styles from '@/styles/editor.module.css'

export default function ModalMini({ title, page: pageName, children }) {
  const [page, closePages] = useMenu(
    (state) => [state.page, state.closePages],
    shallow
  )

  const [scale, setScale] = useState(0)

  useEffect(() => {
    setScale(+(page === pageName))
  }, [page, pageName])

  return (
    <div className='absolute flex items-center min-w-full min-h-full md:min-w-0 md:min-h-0 md:bottom-0 md:m-4'>
      <div
        className='absolute min-w-full min-h-full bg-modal md:bg-transparent'
        onMouseDown={() => closePages()}
      />

      <div
        style={{ transform: `scale(${scale})` }}
        className='p-4 pt-0 mx-auto bg-gray-800 rounded-2xl transition-transform'
      >
        <div className='flex flex-row justify-between py-2 -mr-3'>
          <p className='z-20 mx-0 text-white'>{title}</p>
          <div className='z-20 w-10 h-10'>
            <FaTimes
              className={styles.basicIcon}
              onClick={() => closePages()}
            />
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
