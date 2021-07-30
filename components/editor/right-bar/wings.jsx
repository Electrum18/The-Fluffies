import { useRouter } from 'next/router'

import WingsIcon from '@/components/editor/inline-icons-pony/Wings'
import en from '@/locales/en/pages/editor/right-bar/wings'
import ru from '@/locales/ru/pages/editor/right-bar/wings'

import Controls from '../createControls'
import Section from '../createSection'

export default function WingsSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Wings" icon={WingsIcon}>
      <Controls
        data={{
          [t.enable]: { boolean: 'wings_enable' },
          [t.bat]: { boolean: 'wings_bat' },
          [t.folded]: { boolean: 'wings_folded' }
        }}
      />

      <Controls
        title={t.second}
        data={{
          [t.enable]: { boolean: 'wings_second_color' },
          [t.color]: { color: 'wings_basic' }
        }}
      />
    </Section>
  )
}
