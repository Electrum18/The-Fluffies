import TailIcon from '@/components/editor/inline-icons-pony/Tail'

import Section from '../createSection'
import Controls from '../createControls'

import Tails from '@/configs/changeable/tails.json'

export default function TailSection() {
  return (
    <Section name='Tail' icon={TailIcon}>
      <Controls data={{ Tail: { color: 'hair_basic' } }} />

      <Controls
        title='Second color'
        data={{
          Enable: { boolean: 'hair_second' },
          Color: { color: 'hair_second' },
        }}
      />

      <Controls
        title='Tail type'
        data={{
          Types: { value: 'tail', list: Tails, imgSrc: 'tail/' },
        }}
      />
    </Section>
  )
}
