import NoseIcon from '@/components/editor/inline-icons-pony/Nose'

import Section from '../createSection'
import Controls from '../createControls'

export default function NoseSection() {
  return (
    <Section name='Nose' icon={NoseIcon}>
      <Controls
        title='Canine'
        data={{
          Enable: { boolean: 'canine_nose_enable' },
          Color: { color: 'canine_nose_basic' },
        }}
      />
    </Section>
  )
}
