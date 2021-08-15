import { useRouter } from 'next/router'

import SuitsIcon from '@/components/editor/inline-icons-pony/Suits'
import Suits from '@/configs/changeable/clothing.json'
import en from '@/locales/en/pages/editor/right-bar/suits'
import ru from '@/locales/ru/pages/editor/right-bar/suits'

import Controls from '../createControls'
import Section from '../createSection'

export default function SuitsSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Suits" icon={SuitsIcon}>
      <Controls
        data={{
          [t.color]: { color: 'clothing_basic' }
        }}
      />

      <Controls
        title={t.type}
        data={{
          Types: { value: 'clothing', list: Suits, imgSrc: 'clothing/' }
        }}
      />

      <Controls
        title={t.scarf}
        data={{
          [t.enable]: { boolean: 'scarf' },
          [t.color]: { color: 'scarf_basic' }
        }}
      />
    </Section>
  )
}
