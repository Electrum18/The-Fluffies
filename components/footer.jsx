import Link from 'next/link'
import { useRouter } from 'next/router'

import en from '../locales/en/links'
import ru from '../locales/ru/links'
import { SocialsMini } from './socials'

export default function Footer() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  function NavLink({ href, text }) {
    return (
      router.route !== href && (
        <li className="mx-2 my-2 md:my-0">
          <Link href={href}>
            <a>{text}</a>
          </Link>
        </li>
      )
    )
  }

  return (
    <footer className="footer">
      <div>
        <nav>
          <ul>
            <NavLink href="/" text={t.home} />
            <NavLink href="/about" text={t.about} />
            <NavLink href="/support" text={t.support} />
            <NavLink href="/termsofservice" text={t.terms} />
            <NavLink href="/privacypolicy" text={t.privacy} />
          </ul>
        </nav>

        <div>
          <p>© {new Date().getFullYear()} The Fluffies</p>
          <SocialsMini />
        </div>
      </div>
    </footer>
  )
}
