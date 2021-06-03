import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Locale() {
  const router = useRouter()

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
  })

  useEffect(() => {
    setInnerH(window.innerHeight)
    setOffsetH(document.body.offsetHeight)
  }, [])

  const MainOnTop = router.route === '/' && height < 10
  const OnBottom = height + innerH >= offsetH - 10

  let localeStyle = MainOnTop ? 'button-white ' : 'button '

  localeStyle += OnBottom ? ' mr-auto' : 'mr-0'

  return (
    <div className='fixed flex flex-row w-full px-4 pointer-events-none bottom-3'>
      <Link href={router.route} locale={locale} scroll={false}>
        <a
          className={
            'px-3 py-1 uppercase z-10 pointer-events-auto ml-auto ' +
            localeStyle
          }
        >
          {locale}
        </a>
      </Link>
    </div>
  )
}
