import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import {
  FaClock,
  FaFistRaised,
  FaHeart,
  FaPencilAlt,
  FaPoll,
  FaQuestion,
  FaServer,
  FaUsers
} from 'react-icons/fa'

import CardLittle from '@/components/cards/little'
import CardThird from '@/components/cards/third'
import Footer from '@/components/footer'
import Header from '@/components/header'
import InfoSection from '@/components/infoSection'
import Locale from '@/components/locale'
import SiteHead from '@/components/siteHead'
import Title from '@/components/title'
import en from '@/locales/en/pages/about'
import ru from '@/locales/ru/pages/about'
import cardStyles from '@/styles/cards.module.css'

export default function About() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <>
      <SiteHead t={t} />
      <Header />

      <main className="page-main">
        <div>
          <FaQuestion className="basic-icon" />
          <Title header={t.header} />
          <p>{t.description}</p>
        </div>

        <section className="place-items-start">
          <div className="text-side">
            <FaPencilAlt className="mt-8 basic-icon md:mx-0" />

            <h2>{t.conception.h2}</h2>
            <p>{t.conception.text}</p>
            <p>{t.conception.text2}</p>
          </div>

          <div className="text-side">
            <FaFistRaised className="mt-8 basic-icon md:mx-0" />

            <h2>{t.motivation.h2}</h2>
            <p>{t.motivation.text}</p>
          </div>
        </section>

        <InfoSection src="/svg/info/stats-and-3d.svg" alt="Analysis of editor">
          <FaPoll className="basic-icon md:mx-0" />

          <h2>{t.result.h2}</h2>
          <p>{t.result.text}</p>

          <p className="text-subtitle">{t.result.sub}</p>
        </InfoSection>

        <InfoSection
          src="/svg/info/servering.svg"
          alt="Server with code stack"
          flip={true}
        >
          <FaServer className="basic-icon md:mx-0" />

          <h2>{t.technologies.h2}</h2>
          <p>{t.technologies.text}</p>

          <p className="text-subtitle">{t.technologies.sub}</p>
        </InfoSection>

        <section className="flex-col">
          <FaClock className="basic-icon" />

          <h2>{t.history.h2}</h2>
          <p className="text-center">{t.history.text}</p>

          <div className="w-full mt-8 div-section-lg">
            <CardThird
              icon={<BsStar className="basic-icon" />}
              src="/img/versions/apple.png"
              alt="Apple version of editor"
            >
              <h3>Apple - Banana</h3>
              <p>{t.version}</p>
              <p>{t.versions[0]}</p>
              <span> 2019 </span>
            </CardThird>

            <CardThird
              icon={<BsStarHalf className="basic-icon" />}
              src="/img/versions/grapefruit.png"
              alt="Grapefruit version of editor"
            >
              <h3>Banana - Grapefruit</h3>
              <p>{t.version}</p>
              <p>{t.versions[1]}</p>
              <span> 2019 - 2021 </span>
            </CardThird>

            <CardThird
              icon={<BsStarFill className="basic-icon" />}
              src="/img/versions/huckleberry.png"
              alt="Huckleberry version of editor"
            >
              <h3>Grapefruit - ...</h3>
              <p>{t.version}</p>
              <p>{t.versions[2]}</p>
              <span>2021 - {new Date().getFullYear()}</span>
            </CardThird>
          </div>
        </section>

        <section className="flex-col">
          <FaUsers className="basic-icon" />

          <h2>{t.team.h2}</h2>
          <p className="text-center">{t.team.text}</p>

          <div className={cardStyles.cardLittle}>
            <CardLittle
              src="/img/authors/Electrum18.png"
              alt="Electrum18 avatar"
            >
              <h3>{t.members[0].nickname}</h3>
              <p>{t.members[0].rank}</p>
            </CardLittle>

            <CardLittle
              src="/img/authors/LightingZap.png"
              alt="LightingZap avatar"
            >
              <h3>{t.members[1].nickname}</h3>
              <p>{t.members[1].rank}</p>
            </CardLittle>
          </div>
        </section>

        <section className="flex-col mb-0">
          <FaHeart className="basic-icon" />

          <h2>{t.helping.h2}</h2>

          <p className="text-center">{t.helping.text}</p>

          <Link href="/support">
            <a className="mt-4 button">{t.helping.button}</a>
          </Link>
        </section>
      </main>

      <Locale />
      <Footer />
    </>
  )
}
