import HairIcon from '@/components/editor/inline-icons-pony/Hair'

import Section from '../createSection'
import Controls from '../createControls'

import Hairs from '@/configs/changeable/hairs.json'

export default function HairSection() {
  return (
    <Section name='Hair' icon={HairIcon}>
      <Controls data={{ Hair: { color: 'hair_basic' } }} />

      <Controls
        title='Second color'
        data={{
          Enable: { boolean: 'hair_second' },
          Color: { color: 'hair_second' },
        }}
      />

      <Controls
        title='Hairstyle type'
        data={{
          Types: { value: 'hair', list: Hairs, imgSrc: 'hair/' },
        }}
      />
    </Section>
  )
}
