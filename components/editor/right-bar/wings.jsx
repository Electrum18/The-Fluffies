import WingsIcon from '@/components/editor/inline-icons-pony/Wings'

import Controls from '../createControls'
import Section from '../createSection'

export default function WingsSection() {
  return (
    <Section name="Wings" icon={WingsIcon}>
      <Controls
        data={{
          Enable: { boolean: 'wings_enable' },
          Bat: { boolean: 'wings_bat' },
          Folded: { boolean: 'wings_folded' }
        }}
      />

      <Controls
        title="Second color"
        data={{
          Enable: { boolean: 'wings_second_color' },
          Color: { color: 'wings_basic' }
        }}
      />
    </Section>
  )
}
