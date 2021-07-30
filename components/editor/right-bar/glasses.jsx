import { useRouter } from 'next/router'

import GlassesIcon from '@/components/editor/inline-icons-pony/Glasses'
import Glasses from '@/configs/changeable/glasses.json'
import en from '@/locales/en/pages/editor/right-bar/glasses'
import ru from '@/locales/ru/pages/editor/right-bar/glasses'

import Controls from '../createControls'
import Section from '../createSection'

export default function GlassesSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Glasses" icon={GlassesIcon}>
      <Controls
        data={{
          [t.color]: { color: 'glasses_lenses' },
          [t.frame]: { color: 'glasses_frame' }
        }}
      />

      <Controls
        title={t.type}
        data={{
          Types: { value: 'glasses', list: Glasses, imgSrc: 'glasses/' }
        }}
      />
    </Section>
  )
}
