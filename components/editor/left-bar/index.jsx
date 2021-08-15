import useMenu from '@/helpers/menu'
import styles from '@/styles/editor.module.css'

import Accounts from './additional/accounts'
import Notice from './additional/notice'
import Rules from './additional/rules'
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

const selector = state => state.page

function Spacer() {
  return <div />
}

export default function Menu() {
  const page = useMenu(selector)

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

      {page === 'Accounts' && <Accounts />}
      {page === 'Notice' && <Notice />}
      {page === 'Rules' && <Rules />}
    </div>
  )
}
