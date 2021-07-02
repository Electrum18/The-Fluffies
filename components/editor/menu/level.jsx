import ModalMini from '@/components/elements/modalMini'

import useUser from '@/helpers/user'

import styles from '@/styles/elements/level.module.css'

export default function LevelModal() {
  const user = useUser((state) => state.user)

  return (
    <ModalMini title='Your level' page='Level'>
      <div className={styles.content}>
        <div>{user.level || '?'}</div>
        <p className='w-64'>
          {user.level
            ? 'Keep logging in every day to level up, share your achievements with your friends!'
            : 'Login below to get profile levels'}
        </p>
      </div>
    </ModalMini>
  )
}
