import SuitsIcon from '@/components/editor/inline-icons-pony/Suits'
import Suits from '@/configs/changeable/clothing.json'

import Controls from '../createControls'
import Section from '../createSection'

export default function SuitsSection() {
  return (
    <Section name="Suits" icon={SuitsIcon}>
      <Controls
        data={{
          Color: { color: 'clothing_basic' }
        }}
      />

      <Controls
        title="Suit type"
        data={{
          Types: { value: 'clothing', list: Suits, imgSrc: 'clothing/' }
        }}
      />

      <Controls
        title="Scarf"
        data={{
          Enable: { boolean: 'scarf' },
          Color: { color: 'scarf_basic' }
        }}
      />
    </Section>
  )
}
