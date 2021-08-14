import { useEffect } from 'react'

import preKeysList from '@/configs/localStorageKeys.json'

const keysList = preKeysList.reduce((acc, value) => {
  acc[value] = true

  return acc
}, {})

export default function LocalStorageControl() {
  useEffect(() => {
    if (!localStorage) return

    const keys = Object.keys(localStorage)

    for (const key of keys) {
      if (!keysList[key]) localStorage.removeItem(key)
    }
  }, [])

  return null
}
