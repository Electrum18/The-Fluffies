import { useRouter } from 'next/router'

import {
  FaAt,
  FaBalanceScale,
  FaCode,
  FaDollarSign,
  FaGithub,
  FaHeart,
  FaPaintBrush,
  FaPatreon,
  FaSatelliteDish,
  FaShareAlt,
  FaVk,
} from 'react-icons/fa'

import SiteHead from '@/components/siteHead'
import Header from '@/components/header'
import Title from '@/components/title'
import Footer from '@/components/footer'
import InfoSection from '@/components/infoSection'
import Locale from '@/components/locale'
import CardThird from '@/components/cards/third'
import OuterLink from '@/components/outerLink'
import Socials from '@/components/socials'

import Contributors from '@/components/support/contributors'

import en from '@/locales/en/pages/support'
import ru from '@/locales/ru/pages/support'

function SectionButtonLink({ className, name, href, text, icon }) {
  return (
    <div className='flex flex-row'>
      <OuterLink className={className} name={name} href={href}>
        <div className='flex place-items-center'>
          {text}
          {icon}
        </div>
      </OuterLink>
    </div>
  )
}

export default function Support() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <>
      <SiteHead t={t} />
      <Header />

      <main className='page-main'>
        <div>
          <FaHeart className='basic-icon' />
          <Title header={t.header} />
          <p>{t.description}</p>
        </div>

        <section section className='flex-col p-0 text-center'>
          <div className='flex flex-col p-8'>
            <h2>{t.contributors.h2}</h2>
            <p>{t.contributors.text}</p>
          </div>

          <Contributors />
        </section>

        <section section className='flex-col'>
          <FaSatelliteDish className='basic-icon' />

          <h2>{t.help.h2}</h2>
          <p>{t.help.text}</p>

          <div className='w-full my-8 div-section-lg'>
            <CardThird icon={<FaAt className='basic-icon' />}>
              <h3>{t.contact[0].h3}</h3>

              <p className='mx-2 text-lg font-medium'>{t.contact[0].text}</p>

              <div className='flex flex-row'>
                <a
                  className='mt-2 text-white bg-yellow-600 button hover:bg-yellow-400'
                  href='mailto:thefluffiessite@gmail.com'
                >
                  thefluffiessite@gmail.com
                </a>
              </div>
            </CardThird>

            <CardThird icon={<FaVk className='basic-icon' />}>
              <h3>{t.contact[1].h3}</h3>

              <p className='mx-2 text-lg font-medium'>{t.contact[1].text}</p>

              <SectionButtonLink
                className='mt-2 text-white bg-blue-600 button hover:bg-blue-400'
                name='VKontakte'
                href='https://vk.com/topic-187679567_46701195'
                text={t.contact[1].button}
                icon={<FaVk className='ml-3' />}
              />
            </CardThird>

            <CardThird icon={<FaShareAlt className='basic-icon' />}>
              <h3>{t.contact[2].h3}</h3>

              <p className='mx-2 text-lg font-medium'>{t.contact[2].text}</p>

              <div className='flex justify-around mt-4 text-gray-400'>
                <Socials />
              </div>
            </CardThird>
          </div>
        </section>

        <InfoSection src='/svg/info/artists.svg' alt='Pyramid with pencil'>
          <FaPaintBrush className='basic-icon md:mx-0' />

          <h2>{t.artists.h2}</h2>
          <p>{t.artists.text}</p>
        </InfoSection>

        <InfoSection
          src='/svg/info/programmers.svg'
          alt='eeeIDE window'
          flip={true}
        >
          <FaCode className='basic-icon md:mx-0' />

          <h2>{t.programmers.h2}</h2>
          <p>{t.programmers.text}</p>

          <SectionButtonLink
            className='mt-2 button md:mx-0'
            name='GitHub'
            href='https://github.com/Electrum18/The-Fluffies'
            text='GitHub'
            icon={<FaGithub className='ml-3' />}
          />
        </InfoSection>

        <InfoSection src='/svg/info/donating.svg' alt='Coins with mango symbol'>
          <FaDollarSign className='basic-icon md:mx-0' />

          <h2>{t.donation.h2}</h2>
          <p>{t.donation.text}</p>

          <SectionButtonLink
            className='mt-2 text-white bg-red-600 button md:mx-0 hover:bg-red-400'
            name='Patreon'
            href='https://www.patreon.com/the_fluffies'
            text='Patreon'
            icon={<FaPatreon className='ml-3' />}
          />
        </InfoSection>

        <section section className='flex-col mb-0 text-center'>
          <FaBalanceScale className='basic-icon md:mx-0' />

          <h2>{t.copyright.h2}</h2>
          <p>{t.copyright.text}</p>
        </section>
      </main>

      <Locale />
      <Footer />
    </>
  )
}
