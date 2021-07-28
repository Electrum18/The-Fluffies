import styles from '@/styles/editor.module.css'

import ChatSection from './chat'
import EmotionsSection from './emotions'
import EnvSection from './environment'
import HomeSection from './home'
import LanguageSection from './language'
import LevelSection from './level'
import ProfileSection from './profile'
import SavePersonSection from './savePersons'
import SocialSection from './socials'
import TakeImageSection from './takeImage'

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
        <hr />
        <TakeImageSection />
        <SavePersonSection />
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
