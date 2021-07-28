import PantsIcon from '@/components/editor/inline-icons-pony/Pants'
import Pants from '@/configs/changeable/pants.json'

import Controls from '../createControls'
import Section from '../createSection'

export default function PantsSection() {
  return (
    <Section name="Pants" icon={PantsIcon}>
      <Controls
        data={{
          Color: { color: 'pants_basic' }
        }}
      />

      <Controls
        title="Pants type"
        data={{
          Types: { value: 'pants', list: Pants, imgSrc: 'pants/' }
        }}
      />
    </Section>
  )
}
