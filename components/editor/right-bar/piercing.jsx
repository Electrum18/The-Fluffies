import { useRouter } from 'next/router'

import PiercingIcon from '@/components/editor/inline-icons-pony/Piercing'
import PiercingEars from '@/configs/changeable/piercings/ears.json'
import en from '@/locales/en/pages/editor/right-bar/piercing'
import ru from '@/locales/ru/pages/editor/right-bar/piercing'

import Controls from '../createControls'
import Section from '../createSection'

export default function PiercingSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Piercing" icon={PiercingIcon}>
      <Controls data={{ [t.color]: { color: 'piercings_basic' } }} />

      <Controls
        title={t.type}
        data={{
          Types: {
            value: 'piercing_ears',
            list: PiercingEars,
            imgSrc: 'piercing_ears/'
          }
        }}
      />
    </Section>
  )
}
