import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function Locale() {
  const router = useRouter()

  const { theme, setTheme } = useTheme()

  const locale = router.locale === 'ru' ? 'en' : 'ru'

  const [mounted, setMounted] = useState(false)

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
    setMounted(true)
    setInnerH(window.innerHeight)
    setOffsetH(document.body.offsetHeight)
  }, [])

  if (!mounted) return null

  const MainOnTop = router.route === '/' && height < 10
  const OnBottom = height + innerH >= offsetH - 10

  let localeStyle = MainOnTop ? 'button-white ' : 'button '

  return (
    <div className="locale-bar">
      <button
        aria-label="Toggle Dark Mode"
        className={localeStyle}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? (
          <FaMoon className="w-6 h-6" />
        ) : (
          <FaSun className="w-6 h-6" />
        )}
      </button>

      <Link href={router.route} locale={locale} scroll={false}>
        <a className={localeStyle + (OnBottom ? 'mr-auto' : 'mr-0')}>
          {locale}
        </a>
      </Link>
    </div>
  )
}
