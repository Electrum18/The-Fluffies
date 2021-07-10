import PantsIcon from '@/components/editor/inline-icons-pony/Pants'

import Section from '../createSection'
import Controls from '../createControls'

import Pants from '@/configs/changeable/pants.json'

export default function PantsSection() {
  return (
    <Section name='Pants' icon={PantsIcon}>
      <Controls
        data={{
          Color: { color: 'pants_basic' },
        }}
      />

      <Controls
        title='Pants type'
        data={{
          Types: { value: 'pants', list: Pants, imgSrc: 'pants/' },
        }}
      />
    </Section>
  )
}
