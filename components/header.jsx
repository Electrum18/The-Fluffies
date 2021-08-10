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
          <a>{text}</a>
        </Link>
      )
    }
  }

  return (
    <header
      className={'header ' + (MainOnTop ? 'text-white ' : 'header-solid')}
    >
      <div>
        {router.route === '/' ? (
          <div className={'header-version ' + versionStyle}>
            {t.version}
            <div>Huckleberry</div>
          </div>
        ) : (
          <div>
            <Link href="/">
              <a className="header-logo-a">
                <div>
                  <Image
                    src="/svg/mango.svg"
                    alt="The Fluffies logo"
                    width={32}
                    height={32}
                  />
                </div>

                <div>The Fluffies</div>
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
