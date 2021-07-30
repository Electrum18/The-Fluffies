import { useRouter } from 'next/router'

import NeckIcon from '@/components/editor/inline-icons-pony/Neck'
import en from '@/locales/en/pages/editor/right-bar/neck'
import ru from '@/locales/ru/pages/editor/right-bar/neck'

import Controls from '../createControls'
import Section from '../createSection'

export default function NeckSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Neck" icon={NeckIcon}>
      <Controls
        title={t.collar}
        data={{
          [t.enable]: { boolean: 'collar_enable' },
          [t.color]: { color: 'collar_basic' }
        }}
      />

      <Controls
        title={t.bowtie}
        data={{
          [t.enable]: { boolean: 'bowtie_enable' },
          [t.color]: { color: 'bowtie_basic' }
        }}
      />
    </Section>
  )
}
