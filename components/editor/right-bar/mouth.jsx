import MouthIcon from '@/components/editor/inline-icons-pony/Mouth'

import Section from '../createSection'
import Controls from '../createControls'

import Fangs from '@/configs/changeable/fangs.json'

export default function MouthSection() {
  return (
    <Section name='Mouth' icon={MouthIcon}>
      <Controls
        data={{
          'Mouth color': { color: 'jaw_basic' },
          'Tongue color': { color: 'tongue_basic' },
        }}
      />

      <Controls
        title='Teeths'
        data={{
          Sharp: { value: 'sharp_teeth', min: 1, max: 100 },
        }}
      />

      <Controls
        title='Fangs'
        data={{
          Types: { value: 'fangs', list: Fangs, imgSrc: 'fangs/' },
        }}
      />

      <Controls
        title='Tongue'
        data={{
          Raised: { value: 'tongue_raised', min: 1, max: 100 },
          Out: { value: 'tongue_out', min: 1, max: 100 },
        }}
      />

      <Controls
        title='Emotion'
        data={{
          Open: { value: 'jaw_open', min: 1, max: 100 },
          Happy: { value: 'jaw_happy', min: 1, max: 100 },
          Sad: { value: 'jaw_sad', min: 1, max: 100 },
          Surprised: { value: 'jaw_surprised', min: 1, max: 100 },
          Nya: { value: 'jaw_cat', min: 1, max: 100 },
        }}
      />
    </Section>
  )
}
