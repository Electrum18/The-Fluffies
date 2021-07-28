import NeckIcon from '@/components/editor/inline-icons-pony/Neck'

import Controls from '../createControls'
import Section from '../createSection'

export default function NeckSection() {
  return (
    <Section name="Neck" icon={NeckIcon}>
      <Controls
        title="Collar"
        data={{
          Enable: { boolean: 'collar_enable' },
          Color: { color: 'collar_basic' }
        }}
      />

      <Controls
        title="Bowtie"
        data={{
          Enable: { boolean: 'bowtie_enable' },
          Color: { color: 'bowtie_basic' }
        }}
      />
    </Section>
  )
}
