import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import en from '../../locales/en/pages/index'
import ru from '../../locales/ru/pages/index'
import Socials from '../socials'

export default function Title() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <div className="flex flex-col items-start justify-center w-full text-center md:w-1/2 md:text-left">
      <div className="w-3/5 mx-auto mb-4 lg:mb-8">
        <Image
          src="/svg/The Fluffies logo.svg"
          alt="The Fluffies logo"
          width={1026}
          height={418}
          draggable={false}
        />
        <p className="px-2 ml-auto mr-2 text-sm font-bold text-right text-white uppercase border-2 rounded-lg select-none dark:text-white w-min md:text-bg">
          studio
        </p>
      </div>

      <h1 className="w-full my-8 text-3xl font-bold tracking-wide text-white dark:text-white md:text-left lg:text-4xl">
        {t.header}
      </h1>

      <p className="mb-8 leading-normal text-white dark:text-white md:text-2xl">
        {t.description}
      </p>

      <div className="flex flex-col flex-wrap w-full md:flex-row">
        <Link href="/editor" prefetch={false}>
          <a className="px-6 button-white lg:mx-0 hover:bg-primary hover:text-white">
            {t.launch}
          </a>
        </Link>
        <Socials />
      </div>
    </div>
  )
}
