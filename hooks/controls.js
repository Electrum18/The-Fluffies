import { useTheme } from 'next-themes'
import { useEffect } from 'react'

import preKeysList from '@/configs/localStorageKeys.json'

const keysList = preKeysList.reduce((acc, value) => {
  acc[value] = true

  return acc
}, {})

export function useLocalStorageControl() {
  useEffect(() => {
    if (!localStorage) return

    const keys = Object.keys(localStorage)

    for (const key of keys) {
      if (!keysList[key]) localStorage.removeItem(key)
    }
  }, [])
}

export function useThemeTimeControl() {
  const { setTheme } = useTheme()

  useEffect(() => {
    const hours = new Date().getHours()

    setTheme(hours > 7 && hours < 17 ? 'light' : 'dark')
  }, [setTheme])
}
