import React, { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'

import ListButtons from '@/components/elements/listButtons'
import ListChips from '@/components/elements/listChips'
import ListDropdown from '@/components/elements/listDropdown'
import ListSquares from '@/components/elements/listSquares'

import useMenu from '@/helpers/menu'

import styles from '@/styles/menu.module.css'

export default function TakeImage() {
  const [page, closePages] = useMenu(
    (state) => [state.page, state.closePages],
    shallow
  )

  const [translate, setTranslate] = useState(100)

  useEffect(() => {
    setTranslate(100 - +(page === 'TakePhoto') * 100)
  }, [page])

  return (
    <div
      style={{ transform: `translateY(${translate}%)` }}
      className={styles.bottomMenu}
    >
      <div>
        <div />

        <ListDropdown
          label='Quality'
          list={['2160p', '1440p', '1080p', '720p', '420p']}
        />

        <ListSquares
          label='Ratio'
          list={[
            { style: 'w-10 h-6 mx-1 my-3' },
            { style: 'w-6 h-10 mx-3 my-1' },
          ]}
        />

        <ListChips label='Format' list={['PNG', 'JPG']} />

        <ListButtons
          list={[
            { text: 'Close', style: 'bg-gray-800', onClick: closePages },
            { text: 'Start', style: 'bg-primary' },
          ]}
        />

        <div />
      </div>
    </div>
  )
}
