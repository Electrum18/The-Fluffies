import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import shallow from 'zustand/shallow'

import useMenu from '@/helpers/menu'

import styles from '@/styles/editor.module.css'
import stylesElems from '@/styles/elements.module.css'

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
    <div className={stylesElems.modalMini}>
      <div onMouseDown={() => closePages()} />

      <div style={{ transform: `scale(${scale})` }}>
        <div>
          <p>{title}</p>
          <div>
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
