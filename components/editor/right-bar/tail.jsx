import { useRouter } from 'next/router'

import TailIcon from '@/components/editor/inline-icons-pony/Tail'
import Tails from '@/configs/changeable/tails.json'
import en from '@/locales/en/pages/editor/right-bar/tail'
import ru from '@/locales/ru/pages/editor/right-bar/tail'

import Controls from '../createControls'
import Section from '../createSection'

export default function TailSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Tail" icon={TailIcon}>
      <Controls data={{ [t.tail]: { color: 'hair_basic' } }} />

      <Controls
        title={t.second}
        data={{
          [t.enable]: { boolean: 'hair_second' },
          [t.color]: { color: 'hair_second' }
        }}
      />

      <Controls
        title={t.type}
        data={{
          Types: { value: 'tail', list: Tails, imgSrc: 'tail/' }
        }}
      />
    </Section>
  )
}
