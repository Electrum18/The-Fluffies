import shallow from 'zustand/shallow'

import useCustomizing from '@/helpers/customizing'
import useMenu from '@/helpers/menu'

import styles from '@/styles/editor.module.css'

const selector = (state) => [state.index, state.setConfig]
const selectorPage = (state) => [state.page, state.setPage]
const selectorClose = (state) => state.closeWindow

export default function Section({ name, icon: Icon, children }) {
  const [index, setConfig] = useCustomizing(selector, shallow)

  return (
    <li
      className={index === name ? styles.selected : undefined}
      onClick={() => setConfig(name)}
    >
      <Icon />
      {index === name && children}
    </li>
  )
}

export function LeftSection({ name, icon: Icon, children }) {
  const [page, setPage] = useMenu(selectorPage, shallow)
  const closeWindow = useCustomizing(selectorClose)

  return (
    <li>
      <Icon
        enabled={page === name}
        className={page === name ? 'text-primary' : 'text-white'}
        onClick={() => {
          setPage(name)
          closeWindow()
        }}
      />

      {page === name && children}
    </li>
  )
}
