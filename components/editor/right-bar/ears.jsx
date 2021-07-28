import EarsIcon from '@/components/editor/inline-icons-pony/Ears'
import Ears from '@/configs/changeable/ears.json'

import Controls from '../createControls'
import Section from '../createSection'

export default function EarsSection() {
  return (
    <Section name="Ears" icon={EarsIcon}>
      <Controls
        title="Second color"
        data={{
          Enable: { boolean: 'ear_second_color' },
          Color: { color: 'ear_basic' }
        }}
      />

      <Controls
        title="Ears type"
        data={{
          Types: { value: 'ears', list: Ears, imgSrc: 'ears/' }
        }}
      />
    </Section>
  )
}
