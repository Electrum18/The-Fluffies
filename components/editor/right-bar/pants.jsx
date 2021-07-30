import { useRouter } from 'next/router'

import PantsIcon from '@/components/editor/inline-icons-pony/Pants'
import Pants from '@/configs/changeable/pants.json'
import en from '@/locales/en/pages/editor/right-bar/pants'
import ru from '@/locales/ru/pages/editor/right-bar/pants'

import Controls from '../createControls'
import Section from '../createSection'

export default function PantsSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Pants" icon={PantsIcon}>
      <Controls
        data={{
          [t.color]: { color: 'pants_basic' }
        }}
      />

      <Controls
        title={t.type}
        data={{
          Types: { value: 'pants', list: Pants, imgSrc: 'pants/' }
        }}
      />
    </Section>
  )
}
