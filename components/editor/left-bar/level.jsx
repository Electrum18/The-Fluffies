import ModalMini from '@/components/elements/modalMini'
import useUser from '@/helpers/user'
import styles from '@/styles/elements/level.module.css'

import { LeftSection } from '../createSection'

const selector = state => state.user

function Icon({ onClick }) {
  const user = useUser(selector)

  return (
    <div onClick={onClick}>
      <div className="w-8 h-8 -m-1 text-lg text-center text-white border-2 border-blue-400 rounded-full">
        {user.level || '?'}
      </div>
    </div>
  )
}

export default function LevelSection() {
  const user = useUser(selector)

  return (
    <LeftSection name="Level" icon={Icon}>
      <ModalMini title="Your level" page="Level">
        <div className={styles.content}>
          <div>{user.level || '?'}</div>
          <p className="w-64">
            {user.level
              ? 'Keep logging in every day to level up, share your achievements with your friends!'
              : 'Login below to get profile levels'}
          </p>
        </div>
      </ModalMini>
    </LeftSection>
  )
}
