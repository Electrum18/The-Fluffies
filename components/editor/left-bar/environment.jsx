import { FaLightbulb } from 'react-icons/fa'

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
  return (
    <LeftSection name="Environment" icon={Icon}>
      <Controls data={{ World: { color: 'background_basic' } }} />
    </LeftSection>
  )
}
