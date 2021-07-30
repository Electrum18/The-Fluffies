import { useRouter } from 'next/router'

import HornsIcon from '@/components/editor/inline-icons-pony/Horns'
import Horns from '@/configs/changeable/front_horn.json'
import HornsBehind from '@/configs/changeable/horn.json'
import en from '@/locales/en/pages/editor/right-bar/horns'
import ru from '@/locales/ru/pages/editor/right-bar/horns'

import Controls from '../createControls'
import Section from '../createSection'

export default function HornsSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Horns" icon={HornsIcon}>
      <Controls
        title={t.front.type}
        data={{
          Types: {
            value: 'horn_front',
            list: Horns,
            imgSrc: 'horn_front/'
          }
        }}
      />

      <Controls
        title={t.front.color}
        data={{
          [t.divide]: { boolean: 'horn_second_color' },
          [t.color]: { color: 'horn_basic' }
        }}
      />

      <Controls
        title={t.rear.title}
        data={{
          [t.color]: { color: 'horn_rear_basic' },

          [t.rear.type]: {
            value: 'horn',
            list: HornsBehind,
            imgSrc: 'horn/'
          }
        }}
      />
    </Section>
  )
}
