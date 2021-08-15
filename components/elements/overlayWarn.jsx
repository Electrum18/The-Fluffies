import styles from '@/styles/elements/chat.module.css'

export default function OverlayWarning({ children, condition }) {
  return (
    condition && (
      <div className={styles.overlay}>
        <div>{children}</div>
      </div>
    )
  )
}
