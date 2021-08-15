import { useRouter } from 'next/router'

import BodyIcon from '@/components/editor/inline-icons-pony/Body'
import en from '@/locales/en/pages/editor/right-bar/body'
import ru from '@/locales/ru/pages/editor/right-bar/body'

import Controls from '../createControls'
import Section from '../createSection'

export default function BodySection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <Section name="Body" icon={BodyIcon}>
      <Controls data={{ [t.fur]: { color: 'fur_basic' } }} />

      <Controls
        title={t.stripes}
        data={{
          [t.enable]: { boolean: 'stripes_enable' },
          [t.color]: { color: 'stripes_basic' }
        }}
      />

      <Controls
        title={t.freckles}
        data={{
          [t.enable]: { boolean: 'freckles_nose' },
          [t.color]: { color: 'freckles_basic' }
        }}
      />

      <Controls
        title={t.fluff.title}
        data={{
          [t.fluff.cheeks]: { boolean: 'fluff_cheeks' },
          [t.fluff.chest]: { boolean: 'fluff_chest' },
          [t.fluff.neck]: { boolean: 'fluff_neck' },
          [t.fluff.hooves]: { boolean: 'fluff_hooves' },
          [t.fluff.color]: { color: 'fluff_basic' }
        }}
      />

      <Controls
        title={t.second}
        data={{
          [t.enable]: { boolean: 'fur_second_color' },
          [t.color]: { color: 'fur_second_basic' }
        }}
      />
    </Section>
  )
}
