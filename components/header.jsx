import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import en from '../locales/en/header'
import enLinks from '../locales/en/links'
import ru from '../locales/ru/header'
import ruLinks from '../locales/ru/links'

export default function Header() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en
  const tLink = router.locale === 'ru' ? ruLinks : enLinks

  const [height, setHeight] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setHeight(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const MainOnTop = router.route === '/' && height < 10

  const headerStyle = MainOnTop
    ? 'text-white '
    : 'text-gray-500 dark:text-white bg-white dark:bg-gray-700 border-b-2 dark:border-gray-600'

  const versionStyle = MainOnTop
    ? 'text-white'
    : 'text-gray-500 dark:text-gray-100'

  function NavLink({ href, text }) {
    if (router.route === href) {
      return (
        <span className={MainOnTop ? 'button-white mx-2' : 'button mx-2'}>
          {text}
        </span>
      )
    } else {
      return (
        <Link href={href}>
          <a className="mx-4 select-none hover:text-primary transition-colors duration-300">
            {text}
          </a>
        </Link>
      )
    }
  }

  return (
    <header
      className={
        'w-full fixed top-0 text-lg p-4 md:p-6 font-medium transition-colors z-10 ' +
        headerStyle
      }
    >
      <div className="flex flex-row justify-around md:justify-between">
        {router.route === '/' ? (
          <div
            className={
              'hidden md:flex mx-4 my-0 uppercase place-items-center font-bold text-sm select-none ' +
              versionStyle
            }
          >
            {t.version}
            <div className="px-2 py-1 mx-3 text-white bg-version rounded-md">
              Huckleberry
            </div>
          </div>
        ) : (
          <div className="hidden md:flex">
            <Link href="/">
              <a className="flex flex-row">
                <div className="flex icon-header">
                  <Image
                    src="/svg/mango.svg"
                    alt="The Fluffies logo"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="mx-2 text-xl font-bold tracking-wide">
                  The Fluffies
                </div>
              </a>
            </Link>
          </div>
        )}

        <nav>
          <NavLink href="/" text={tLink.home} />
          <NavLink href="/about" text={tLink.about} />
          <NavLink href="/support" text={tLink.support} />
        </nav>
      </div>
    </header>
  )
}
