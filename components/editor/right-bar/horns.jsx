import HornsIcon from '@/components/editor/inline-icons-pony/Horns'

import Section from '../createSection'
import Controls from '../createControls'

import Horns from '@/configs/changeable/front_horn.json'
import HornsBehind from '@/configs/changeable/horn.json'

export default function HornsSection() {
  return (
    <Section name='Horns' icon={HornsIcon}>
      <Controls
        title='Front horn type'
        data={{
          Types: {
            value: 'horn_front',
            list: Horns,
            imgSrc: 'horn_front/',
          },
        }}
      />

      <Controls
        title='Front horn color'
        data={{
          Divide: { boolean: 'horn_second_color' },
          Color: { color: 'horn_basic' },
        }}
      />

      <Controls
        title='Rear horns'
        data={{
          Color: { color: 'horn_rear_basic' },

          'Horn behind type': {
            value: 'horn',
            list: HornsBehind,
            imgSrc: 'horn/',
          },
        }}
      />
    </Section>
  )
}
