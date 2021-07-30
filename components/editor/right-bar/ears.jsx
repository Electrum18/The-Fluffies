import { useRouter } from 'next/router'

import EarsIcon from '@/components/editor/inline-icons-pony/Ears'
import Ears from '@/configs/changeable/ears.json'
import en from '@/locales/en/pages/editor/right-bar/ears'
import ru from '@/locales/ru/pages/editor/right-bar/ears'

import Controls from '../createControls'
import Section from '../createSection'

export default function EarsSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Ears" icon={EarsIcon}>
      <Controls
        title={t.second}
        data={{
          [t.enable]: { boolean: 'ear_second_color' },
          [t.color]: { color: 'ear_basic' }
        }}
      />

      <Controls
        title={t.type}
        data={{
          Types: { value: 'ears', list: Ears, imgSrc: 'ears/' }
        }}
      />
    </Section>
  )
}
