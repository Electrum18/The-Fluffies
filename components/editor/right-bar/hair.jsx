import HairIcon from '@/components/editor/inline-icons-pony/Hair'
import Hairs from '@/configs/changeable/hairs.json'

import Controls from '../createControls'
import Section from '../createSection'

export default function HairSection() {
  return (
    <Section name="Hair" icon={HairIcon}>
      <Controls data={{ Hair: { color: 'hair_basic' } }} />

      <Controls
        title="Second color"
        data={{
          Enable: { boolean: 'hair_second' },
          Color: { color: 'hair_second' }
        }}
      />

      <Controls
        title="Hairstyle type"
        data={{
          Types: { value: 'hair', list: Hairs, imgSrc: 'hair/' }
        }}
      />
    </Section>
  )
}
