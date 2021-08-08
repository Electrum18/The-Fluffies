import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function Locale() {
  const router = useRouter()

  const { theme, setTheme } = useTheme()

  const locale = router.locale === 'ru' ? 'en' : 'ru'

  const [height, setHeight] = useState(0)
  const [innerH, setInnerH] = useState(0)
  const [offsetH, setOffsetH] = useState(0)

  function handleScroll() {
    setHeight(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setInnerH(window.innerHeight)
    setOffsetH(document.body.offsetHeight)
  }, [])

  const MainOnTop = router.route === '/' && height < 10
  const OnBottom = height + innerH >= offsetH - 10

  let localeStyle = MainOnTop ? 'button-white ' : 'button '

  return (
    <div className="fixed flex flex-row w-full px-4 pointer-events-none bottom-3">
      <button
        aria-label="Toggle Dark Mode"
        className={localeStyle + ' z-10 pointer-events-auto p-1 mr-0'}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? (
          <FaMoon className="w-6 h-6" />
        ) : (
          <FaSun className="w-6 h-6" />
        )}
      </button>

      <Link href={router.route} locale={locale} scroll={false}>
        <a
          className={
            'px-3 py-1 uppercase z-10 pointer-events-auto ml-2 ' +
            localeStyle +
            (OnBottom ? ' mr-auto' : ' mr-0')
          }
        >
          {locale}
        </a>
      </Link>
    </div>
  )
}
