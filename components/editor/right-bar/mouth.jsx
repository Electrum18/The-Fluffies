import { useRouter } from 'next/router'

import MouthIcon from '@/components/editor/inline-icons-pony/Mouth'
import Fangs from '@/configs/changeable/fangs.json'
import en from '@/locales/en/pages/editor/right-bar/mouth'
import ru from '@/locales/ru/pages/editor/right-bar/mouth'

import Controls from '../createControls'
import Section from '../createSection'

export default function MouthSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Mouth" icon={MouthIcon}>
      <Controls
        data={{
          [t.color.mouth]: { color: 'jaw_basic' },
          [t.color.tongue]: { color: 'tongue_basic' }
        }}
      />

      <Controls
        title={t.teeth.title}
        data={{
          [t.teeth.sharp]: { value: 'sharp_teeth', min: 1, max: 100 }
        }}
      />

      <Controls
        title={t.fangs}
        data={{
          Types: { value: 'fangs', list: Fangs, imgSrc: 'fangs/' }
        }}
      />

      <Controls
        title={t.tongue.title}
        data={{
          [t.tongue.raised]: { value: 'tongue_raised', min: 1, max: 100 },
          [t.tongue.out]: { value: 'tongue_out', min: 1, max: 100 }
        }}
      />

      <Controls
        title={t.emotion.title}
        data={{
          [t.emotion.open]: { value: 'jaw_open', min: 1, max: 100 },
          [t.emotion.happy]: { value: 'jaw_happy', min: 1, max: 100 },
          [t.emotion.sad]: { value: 'jaw_sad', min: 1, max: 100 },
          [t.emotion.surprised]: { value: 'jaw_surprised', min: 1, max: 100 },
          [t.emotion.name]: { value: 'jaw_cat', min: 1, max: 100 }
        }}
      />
    </Section>
  )
}
