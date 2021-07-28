import shallow from 'zustand/shallow'

import useParameters from '@/helpers/parameters'
import styles from '@/styles/editor.module.css'

import { Female, Male } from '../inline-icons-pony/Genders'
import BodySection from './body'
import EarsSection from './ears'
import EyesSection from './eyes'
import GlassesSection from './glasses'
import HairSection from './hair'
import HornsSection from './horns'
import MouthSection from './mouth'
import NeckSection from './neck'
import NoseSection from './nose'
import PantsSection from './pants'
import PiercingSection from './piercing'
import SuitsSection from './suits'
import TailSection from './tail'
import WingsSection from './wings'

const selector = state => [state.saves[state.slot].booleans, state.setMale]

export default function RightBar() {
  const [params, setMale] = useParameters(selector, shallow)

  return (
    <aside>
      <ul className={styles.rightBar}>
        <li onClick={() => setMale(!params.male)}>
          {params.male ? <Male /> : <Female />}
        </li>

        <BodySection />
        <HairSection />
        <TailSection />
        <EyesSection />
        <GlassesSection />
        <NoseSection />
        <HornsSection />
        <MouthSection />
        <EarsSection />
        <PiercingSection />
        <NeckSection />
        <WingsSection />
        <SuitsSection />
        <PantsSection />
      </ul>
    </aside>
  )
}
