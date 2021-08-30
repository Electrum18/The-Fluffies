import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  FaComments,
  FaFire,
  FaHandsHelping,
  FaLaptop,
  FaPatreon,
  FaPhotoVideo,
  FaStar
} from 'react-icons/fa'

import Footer from '@/components/footer'
import Header from '@/components/header'
import ArrowDown from '@/components/index/arrow-down'
import Background from '@/components/index/background'
import Patrons from '@/components/index/patrons'
import Title from '@/components/index/title'
import InfoSection from '@/components/infoSection'
import Locale from '@/components/locale'
import MetaLinks from '@/components/metaLinks'
import OuterLink from '@/components/outerLink'
import User from '@/containers/nodejs/models/user-model'
import { useLocalStorageControl, useThemeTimeControl } from '@/hooks/controls'
import { useStatsSEO } from '@/hooks/metricsSEO'
import dbConnect from '@/libs/db'
import en from '@/locales/en/pages/index'
import ru from '@/locales/ru/pages/index'
import cardStyles from '@/styles/cards.module.css'

function Home({ patrons, count }) {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  useStatsSEO(t)

  useLocalStorageControl()
  useThemeTimeControl()

  return (
    <>
      <MetaLinks t={t} />
      <Header />

      <main>
        <div id="start" className="text-white background-gradient">
          <Background />
          <ArrowDown />

          <div className="px-8 pt-24 bg-transparent dark:bg-transparent div-section md:px-24 md:h-screen">
            <Title />

            <div className="w-3/5 mt-4 md:w-1/2 md:pt-0">
              <Image
                src="/img/mascot.png"
                alt="Defaulty a website mascot"
                width={672}
                height={672}
                draggable={false}
              />
            </div>
          </div>
        </div>

        <section className="p-0 section-center">
          <div className="flex flex-col p-8">
            <h2>{t.patrons.h2}</h2>
            <p>{t.patrons.text}</p>

            <OuterLink
              className="mt-6 text-white bg-red-600 button hover:bg-red-400"
              name="Patreon"
              href="https://www.patreon.com/the_fluffies"
            >
              <div className="flex place-items-center">
                {t.patrons.button}
                <FaPatreon className="ml-3" />
              </div>
            </OuterLink>
          </div>

          <Patrons patrons={patrons} />
        </section>

        <section className="section-center">
          <FaStar className="basic-icon" />

          <h2>{t.score.h2}</h2>
          <p>{t.score.text}</p>

          <div className={cardStyles.cardCenterMini}>
            <div>
              <p>{count}</p>
              <p>{t.score.users}</p>
            </div>

            <div>
              <p>{new Date().getFullYear() - 2019}</p>
              <p>{t.score.years}</p>
            </div>
          </div>
        </section>

        <InfoSection
          src="/svg/info/character.svg"
          alt="Defalty a pony, website mascot"
        >
          <FaFire className="basic-icon md:mx-0" />

          <h2>{t.features.h2}</h2>
          <p>{t.features.text}</p>
          <p className="text-subtitle">{t.features.sub}</p>
        </InfoSection>

        <InfoSection
          src="/svg/info/person-editor.svg"
          alt="Animation tab with video icon"
          flip={true}
        >
          <FaPhotoVideo className="basic-icon md:mx-0" />

          <h2>{t.create.h2}</h2>
          <p>{t.create.text}</p>
          <p className="text-subtitle">{t.create.sub}</p>
        </InfoSection>

        <InfoSection src="/svg/info/devices.svg" alt="Three types of devices">
          <FaLaptop className="basic-icon md:mx-0" />

          <h2>{t.using.h2}</h2>
          <p>{t.using.text}</p>
          <p className="text-subtitle">{t.using.sub}</p>
        </InfoSection>

        <InfoSection
          src="/svg/info/chat.svg"
          alt="A chat bubble with messages"
          flip={true}
        >
          <FaComments className="basic-icon md:mx-0" />

          <h2>{t.help.h2}</h2>
          <p>{t.help.text}</p>
          <p className="text-subtitle">{t.help.sub}</p>
        </InfoSection>

        <InfoSection src="/svg/info/helping.svg" alt="Helping types">
          <FaHandsHelping className="basic-icon md:mx-0" />

          <h2>{t.community.h2}</h2>
          <p>{t.community.text}</p>
          <p className="text-subtitle">{t.community.sub}</p>
        </InfoSection>

        <section className="mb-0 section-cta">
          <h2>{t.start.h2}</h2>
          <p>{t.start.text}</p>

          <a href="#start">{t.start.button}</a>
        </section>
      </main>

      <Locale />
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  let count

  try {
    await dbConnect()

    if (process.env.MONGODB_URI) {
      count = await User.countDocuments({}, (err, _count) => {
        if (err) {
          console.error(err)
        } else {
          return _count
        }
      })
    }
  } catch {
    console.error('ERR: Cannot get static props!')
  }

  function fillPatrons(length) {
    const array = []

    for (let index = 0; index < 5 - length; index++) {
      array.push({
        nickname: 'Be patron',
        tier: 'You can be here',
        placeholder: true
      })
    }

    return array
  }

  return {
    props: {
      patrons: fillPatrons(0),
      count: count || '?'
    },

    revalidate: 60 * 60 * 24
  }
}

export default Home
