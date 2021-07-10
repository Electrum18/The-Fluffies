import GlassesIcon from '@/components/editor/inline-icons-pony/Glasses'

import Section from '../createSection'
import Controls from '../createControls'

import Glasses from '@/configs/changeable/glasses.json'

export default function GlassesSection() {
  return (
    <Section name='Glasses' icon={GlassesIcon}>
      <Controls
        data={{
          Color: { color: 'glasses_lenses' },
          Frame: { color: 'glasses_frame' },
        }}
      />

      <Controls
        title='Glasses type'
        data={{
          Types: { value: 'glasses', list: Glasses, imgSrc: 'glasses/' },
        }}
      />
    </Section>
  )
}
