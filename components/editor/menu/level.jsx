import ModalMini from '@/components/elements/modalMini'

import styles from '@/styles/elements/level.module.css'

export default function LevelModal() {
  return (
    <ModalMini title='Your level' page='Level'>
      <div className={styles.content}>
        <div>1</div>
        <p>
          Keep logging in every day <br /> to level up, share your <br />
          achievements with your friends!
        </p>
      </div>
    </ModalMini>
  )
}
