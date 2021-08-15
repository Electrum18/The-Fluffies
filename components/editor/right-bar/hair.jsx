import { useRouter } from 'next/router'

import HairIcon from '@/components/editor/inline-icons-pony/Hair'
import Hairs from '@/configs/changeable/hairs.json'
import en from '@/locales/en/pages/editor/right-bar/hair'
import ru from '@/locales/ru/pages/editor/right-bar/hair'

import Controls from '../createControls'
import Section from '../createSection'

export default function HairSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Hair" icon={HairIcon}>
      <Controls data={{ [t.hair]: { color: 'hair_basic' } }} />

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
          Types: { value: 'hair', list: Hairs, imgSrc: 'hair/' }
        }}
      />
    </Section>
  )
}
