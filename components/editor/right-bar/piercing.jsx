import PiercingIcon from '@/components/editor/inline-icons-pony/Piercing'

import Section from '../createSection'
import Controls from '../createControls'

import PiercingEars from '@/configs/changeable/piercings/ears.json'

export default function PiercingSection() {
  return (
    <Section name='Piercing' icon={PiercingIcon}>
      <Controls data={{ Color: { color: 'piercings_basic' } }} />

      <Controls
        title='Ears piercing type'
        data={{
          Types: {
            value: 'piercing_ears',
            list: PiercingEars,
            imgSrc: 'piercing_ears/',
          },
        }}
      />
    </Section>
  )
}
