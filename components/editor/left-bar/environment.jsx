import { useRouter } from 'next/router'
import { FaLightbulb } from 'react-icons/fa'

import en from '@/locales/en/pages/editor/left-bar/environment'
import ru from '@/locales/ru/pages/editor/left-bar/environment'

import Controls from '../createControls'
import { LeftSection } from '../createSection'

function Icon({ className, onClick }) {
  return (
    <div onClick={onClick}>
      <FaLightbulb className={className} />
    </div>
  )
}

export default function EnvSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <LeftSection name="Environment" icon={Icon}>
      <Controls data={{ [t.world]: { color: 'background_basic' } }} />
    </LeftSection>
  )
}
