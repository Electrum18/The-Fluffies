import useMenu from '@/helpers/menu'

import Animations from './menu/animations'
import TakeImage from './menu/takeImage'
import TakeAnimation from './menu/takeAnimation'
import SavePersons from './menu/savePersons'
import Profile from './menu/profile'
import Chat from './menu/chat'
import LevelModal from './menu/level'
import Socials from './menu/socials'

import Accounts from './menu/additional/accounts'
import Rules from './menu/additional/rules'
import Notice from './menu/additional/notice'

const pages = [
  { name: 'Animation', component: Animations },
  { name: 'TakePhoto', component: TakeImage },
  { name: 'TakeVideo', component: TakeAnimation },
  { name: 'SavePerson', component: SavePersons },
  { name: 'Level', component: LevelModal },
  { name: 'Profile', component: Profile },
  { name: 'Social', component: Socials },
  { name: 'Chat', component: Chat },
  { name: 'Accounts', component: Accounts },
  { name: 'Rules', component: Rules },
  { name: 'Notice', component: Notice },
]

export default function Pages() {
  const page = useMenu((state) => state.page)

  return pages.map(({ name, component: Component }) => {
    return name === page && <Component key={name} />
  })
}
