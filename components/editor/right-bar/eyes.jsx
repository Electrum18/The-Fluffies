import EyesIcon from '@/components/editor/inline-icons-pony/Eyes'
import Eyes from '@/configs/changeable/eyes.json'

import Controls from '../createControls'
import Section from '../createSection'

export default function EyesSection() {
  return (
    <Section name="Eyes" icon={EyesIcon}>
      <Controls
        data={{
          Eyes: { color: 'eyes_left_basic' },
          Sclera: { color: 'eyes_sclera' },

          Scale: {
            value: 'eyes_iris_scale',
            min: 50,
            max: 125,
            step: 1
          }
        }}
      />

      <Controls title="Pupil" data={{ Color: { color: 'eyes_pupil' } }} />

      <Controls
        title="Position"
        data={{
          Horizontal: {
            value: 'eyes_position_horiz',
            min: -100,
            max: 100
          },

          Vertical: {
            value: 'eyes_position_verti',
            min: -100,
            max: 100
          }
        }}
      />

      <Controls
        title="Eyes type"
        data={{
          Types: { value: 'eyes', list: Eyes, imgSrc: 'eyes/' }
        }}
      />

      <Controls
        title="Eyelids"
        data={{
          Upper: {
            value: 'eyes_eyelids_up',
            min: 1,
            max: 100
          },

          Lower: {
            value: 'eyes_eyelids_down',
            min: 1,
            max: 100
          },

          Angry: {
            value: 'eyes_eyelids_angry',
            min: 1,
            max: 100
          },

          Sad: {
            value: 'eyes_eyelids_sad',
            min: 1,
            max: 100
          }
        }}
      />
    </Section>
  )
}
