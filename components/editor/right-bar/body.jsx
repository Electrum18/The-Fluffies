import BodyIcon from '@/components/editor/inline-icons-pony/Body'

import Controls from '../createControls'
import Section from '../createSection'

export default function BodySection() {
  return (
    <Section name="Body" icon={BodyIcon}>
      <Controls data={{ Fur: { color: 'fur_basic' } }} />

      <Controls
        title="Stripes"
        data={{
          Enable: { boolean: 'stripes_enable' },
          Color: { color: 'stripes_basic' }
        }}
      />

      <Controls
        title="Freckles"
        data={{
          Enable: { boolean: 'freckles_nose' },
          Color: { color: 'freckles_basic' }
        }}
      />

      <Controls
        title="Fluff"
        data={{
          Cheeks: { boolean: 'fluff_cheeks' },
          Chest: { boolean: 'fluff_chest' },
          Neck: { boolean: 'fluff_neck' },
          Hooves: { boolean: 'fluff_hooves' },
          Color: { color: 'fluff_basic' }
        }}
      />

      <Controls
        title="Second color"
        data={{
          Enable: { boolean: 'fur_second_color' },
          Color: { color: 'fur_second_basic' }
        }}
      />
    </Section>
  )
}
