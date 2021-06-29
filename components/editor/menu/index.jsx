import React, { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'

import useMenu from '@/helpers/menu'
import useCustomizing from '@/helpers/customizing'

import styles from '@/styles/editor.module.css'

import elementsList from './list'

export default function Menu() {
  const [page, setPage] = useMenu(
    (state) => [state.page, state.setPage],
    shallow
  )

  const [setConfig, closeWindow] = useCustomizing(
    (state) => [state.setConfig, state.closeWindow],
    shallow
  )

  const [opened, setOpened] = useState(false)

  useEffect(() => {
    function openCustomization(index) {
      setConfig(index)
      setOpened(true)
    }

    if (page === 'SaveAnimation' && !opened) {
      openCustomization(17)
    } else if (page === 'Environment' && !opened) {
      openCustomization(15)
    } else if (page === 'Emotions' && !opened) {
      openCustomization(14)
    } else if (page === null && opened) {
      closeWindow()
      setOpened(false)
    } else if (!opened) {
      closeWindow()
    }
  }, [closeWindow, opened, page, setConfig])

  return (
    <div>
      <ul className={styles.leftBar}>
        {elementsList.map(({ icon: Component, pageName }, key) =>
          pageName === 'home' ? (
            <li key={key}>
              <Component />
            </li>
          ) : Component === 'divider' ? (
            <hr key={key} />
          ) : Component === 'spacer' ? (
            <div key={key} />
          ) : (
            <li key={key} onClick={() => setPage(pageName)}>
              <Component
                className={page === pageName ? 'text-primary' : 'text-white'}
              />
            </li>
          )
        )}
      </ul>
    </div>
  )
}
