import SuitsIcon from '@/components/editor/inline-icons-pony/Suits'

import Section from '../createSection'
import Controls from '../createControls'

import Suits from '@/configs/changeable/clothing.json'

export default function SuitsSection() {
  return (
    <Section name='Suits' icon={SuitsIcon}>
      <Controls
        data={{
          Color: { color: 'clothing_basic' },
        }}
      />

      <Controls
        title='Suit type'
        data={{
          Types: { value: 'clothing', list: Suits, imgSrc: 'clothing/' },
        }}
      />

      <Controls
        title='Scarf'
        data={{
          Enable: { boolean: 'scarf' },
          Color: { color: 'scarf_basic' },
        }}
      />
    </Section>
  )
}
