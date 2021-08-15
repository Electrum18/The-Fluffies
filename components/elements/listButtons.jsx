import styles from '@/styles/elements.module.css'

export default function ListButtons({ list }) {
  return (
    <div className={styles.buttonsList}>
      {list.map(({ style, text, component: Component, onClick, disabled }) =>
        Component ? (
          <Component key={text} text={text} />
        ) : (
          <button
            key={text}
            className={
              style +
              (text.length > 10 ? ' text-sm' : '') +
              (disabled ? ' pointer-events-none opacity-50' : '')
            }
            onClick={onClick}
          >
            {text}
          </button>
        )
      )}
    </div>
  )
}
