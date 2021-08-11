import Link from 'next/link'
import { useRouter } from 'next/router'

import Footer from '@/components/footer'
import Header from '@/components/header'
import InfoSection from '@/components/infoSection'
import Locale from '@/components/locale'
import SiteHead from '@/components/siteHead'
import en from '@/locales/en/pages/404'
import ru from '@/locales/ru/pages/404'

export default function About() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <>
      <SiteHead t={t} />
      <Header />

      <main className="page-main">
        <InfoSection src="/svg/page error.svg" alt="Analysis of editor">
          <span className="block w-full font-black text-center text-8xl text-primary">
            404
          </span>

          <h1 className="text-4xl">{t.title}</h1>
          <p>{t.subtitle}</p>

          <div className="w-full mt-6">
            <Link href="/">
              <a className="mx-auto button">{t.back}</a>
            </Link>
          </div>
        </InfoSection>
      </main>

      <Locale />
      <Footer />
    </>
  )
}
