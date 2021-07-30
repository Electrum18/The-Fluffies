import { useRouter } from 'next/router'

import ModalMini from '@/components/elements/modalMini'
import useUser from '@/helpers/user'
import en from '@/locales/en/pages/editor/left-bar/level'
import ru from '@/locales/ru/pages/editor/left-bar/level'
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
  const router = useRouter()

  const user = useUser(selector)

  const t = router.locale === 'ru' ? ru : en

  return (
    <LeftSection name="Level" icon={Icon}>
      <ModalMini title={t.title} page="Level">
        <div className={styles.content}>
          <div>{user.level || '?'}</div>
          <p className="w-64">{user.level ? t.online : t.offline}</p>
        </div>
      </ModalMini>
    </LeftSection>
  )
}
