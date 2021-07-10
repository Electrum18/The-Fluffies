import HomeSection from './home'
import EmotionsSection from './emotions'
import EnvSection from './environment'
import AnimationSection from './animations'
import TakeImageSection from './takeImage'
import TakeAnimationSection from './takeAnimation'
import SavePersonSection from './savePersons'
import LanguageSection from './language'
import LevelSection from './level'
import ProfileSection from './profile'
import SocialSection from './socials'
import ChatSection from './chat'

import styles from '@/styles/editor.module.css'

function Spacer() {
  return <div />
}

export default function Menu() {
  return (
    <div>
      <ul className={styles.leftBar}>
        <HomeSection />
        <hr />
        <EmotionsSection />
        <EnvSection />
        <AnimationSection />
        <hr />
        <TakeImageSection />
        <TakeAnimationSection />
        <hr />
        <SavePersonSection />
        {/*{ icon: FaFileVideo, pageName: 'SaveAnimation' },*/}
        <hr />
        <Spacer />
        <LanguageSection />
        <hr />
        <LevelSection />
        <ProfileSection />
        <hr />
        <SocialSection />
        <ChatSection />
      </ul>
    </div>
  )
}
