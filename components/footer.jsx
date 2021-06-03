import Link from 'next/link'
import { useRouter } from 'next/router'

import { SocialsMini } from './socials'

import en from '../locales/en/links'
import ru from '../locales/ru/links'

export default function Footer() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  function NavLink({ href, text }) {
    return (
      router.route !== href && (
        <li className='mx-2 my-2 md:my-0'>
          <Link href={href}>
            <a>{text}</a>
          </Link>
        </li>
      )
    )
  }

  return (
    <footer className='flex bg-gray-700'>
      <div className='container flex flex-col mx-auto my-4 font-medium text-white'>
        <nav className='w-full py-4 mx-auto text-lg md:w-1/2'>
          <ul className='flex flex-row flex-wrap justify-around'>
            <NavLink href='/' text={t.home} />
            <NavLink href='/about' text={t.about} />
            <NavLink href='/support' text={t.support} />
            <NavLink href='/termsofservice' text={t.terms} />
            <NavLink href='/privacypolicy' text={t.privacy} />
          </ul>
        </nav>

        <div className='flex flex-row justify-between px-2'>
          <p className='mx-0 text-base text-white'>
            © {new Date().getFullYear()} The Fluffies
          </p>
          <SocialsMini />
        </div>
      </div>
    </footer>
  )
}
