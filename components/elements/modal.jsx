import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import shallow from 'zustand/shallow'

import useMenu from '@/helpers/menu'
import styles from '@/styles/editor.module.css'
import stylesElems from '@/styles/elements.module.css'

const selector = state => [state.page, state.closePages]

export default function Modal({
  title,
  page: pageName,
  className,
  onOpen,
  onClose,
  children
}) {
  const [page, closePages] = useMenu(selector, shallow)

  const [scale, setScale] = useState(0)

  useEffect(() => {
    const isOpen = page === pageName

    setScale(+isOpen)

    if (isOpen && onOpen) onOpen()
  }, [onOpen, page, pageName])

  function close() {
    closePages()

    if (onClose) onClose()
  }

  return (
    <div className={stylesElems.modal + ' ' + className}>
      <div onPointerDown={close} />

      <div style={{ transform: `scale(${scale})` }}>
        <div>
          <p>{title}</p>
          <div>
            <FaTimes className={styles.basicIcon} onClick={close} />
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
