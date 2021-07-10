import NeckIcon from '@/components/editor/inline-icons-pony/Neck'

import Section from '../createSection'
import Controls from '../createControls'

export default function NeckSection() {
  return (
    <Section name='Neck' icon={NeckIcon}>
      <Controls
        title='Collar'
        data={{
          Enable: { boolean: 'collar_enable' },
          Color: { color: 'collar_basic' },
        }}
      />

      <Controls
        title='Bowtie'
        data={{
          Enable: { boolean: 'bowtie_enable' },
          Color: { color: 'bowtie_basic' },
        }}
      />
    </Section>
  )
}
