import { useRouter } from 'next/router'

import NoseIcon from '@/components/editor/inline-icons-pony/Nose'
import en from '@/locales/en/pages/editor/right-bar/nose'
import ru from '@/locales/ru/pages/editor/right-bar/nose'

import Controls from '../createControls'
import Section from '../createSection'

export default function NoseSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Nose" icon={NoseIcon}>
      <Controls
        title={t.canine}
        data={{
          [t.enable]: { boolean: 'canine_nose_enable' },
          [t.color]: { color: 'canine_nose_basic' }
        }}
      />
    </Section>
  )
}
