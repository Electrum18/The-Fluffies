import shallow from 'zustand/shallow'

import useParameters from '@/helpers/parameters'

import { Male, Female } from '../inline-icons-pony/Genders'

import BodySection from './body'
import HairSection from './hair'
import TailSection from './tail'
import EyesSection from './eyes'
import GlassesSection from './glasses'
import NoseSection from './nose'
import HornsSection from './horns'
import MouthSection from './mouth'
import EarsSection from './ears'
import PiercingSection from './piercing'
import NeckSection from './neck'
import WingsSection from './wings'
import SuitsSection from './suits'
import PantsSection from './pants'

import styles from '@/styles/editor.module.css'

const selector = (state) => [state.saves[state.slot].booleans, state.setMale]

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
