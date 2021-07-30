import { useRouter } from 'next/router'

import EyesIcon from '@/components/editor/inline-icons-pony/Eyes'
import Eyes from '@/configs/changeable/eyes.json'
import en from '@/locales/en/pages/editor/right-bar/eyes'
import ru from '@/locales/ru/pages/editor/right-bar/eyes'

import Controls from '../createControls'
import Section from '../createSection'

export default function EyesSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Eyes" icon={EyesIcon}>
      <Controls
        data={{
          [t.eyes]: { color: 'eyes_left_basic' },
          [t.sclera]: { color: 'eyes_sclera' },

          [t.scale]: {
            value: 'eyes_iris_scale',
            min: 50,
            max: 125,
            step: 1
          }
        }}
      />

      <Controls title={t.pupil} data={{ [t.color]: { color: 'eyes_pupil' } }} />

      <Controls
        title={t.position.title}
        data={{
          [t.position.horizontal]: {
            value: 'eyes_position_horiz',
            min: -100,
            max: 100
          },

          [t.position.vertical]: {
            value: 'eyes_position_verti',
            min: -100,
            max: 100
          }
        }}
      />

      <Controls
        title={t.type}
        data={{
          Types: { value: 'eyes', list: Eyes, imgSrc: 'eyes/' }
        }}
      />

      <Controls
        title={t.eyelids.title}
        data={{
          [t.eyelids.upper]: {
            value: 'eyes_eyelids_up',
            min: 1,
            max: 100
          },

          [t.eyelids.lower]: {
            value: 'eyes_eyelids_down',
            min: 1,
            max: 100
          },

          [t.eyelids.angry]: {
            value: 'eyes_eyelids_angry',
            min: 1,
            max: 100
          },

          [t.eyelids.sad]: {
            value: 'eyes_eyelids_sad',
            min: 1,
            max: 100
          }
        }}
      />
    </Section>
  )
}
