import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import styles from '@/styles/index.module.css'

import en from '../../locales/en/pages/index'
import ru from '../../locales/ru/pages/index'
import Socials from '../socials'

export default function Title() {
  const router = useRouter()

  const [easterOn, setEasterOn] = useState(false)

  const t = router.locale === 'ru' ? ru : en

  const easterStyle = easterOn ? '-top-20 opacity-100' : 'top-0 opacity-0'

  useEffect(() => {
    function hide() {
      setEasterOn(false)
    }

    if (easterOn) setTimeout(hide, 1500)

    return () => clearTimeout(hide)
  }, [easterOn])

  return (
    <div className={styles.heroPage}>
      <div onClick={() => setEasterOn(true)}>
        <div className={'absolute transition-all duration-700 ' + easterStyle}>
          <Image
            src="/img/easter.png"
            alt="Website maskot and easter egg"
            width={96}
            height={96}
            draggable={false}
          />
        </div>

        <Image
          src="/svg/The Fluffies logo.svg"
          alt="The Fluffies logo"
          width={1026}
          height={418}
          draggable={false}
        />

        <p>studio</p>
      </div>

      <h1>{t.header}</h1>
      <p>{t.description}</p>

      <div>
        <Link href="/editor" prefetch={false}>
          <a className="button-white">{t.launch}</a>
        </Link>

        <Socials />
      </div>
    </div>
  )
}
