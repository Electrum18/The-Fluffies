import styles from '@/styles/elements.module.css'

export default function ListButtons({ list }) {
  return (
    <div className={styles.buttonsList}>
      {list.map(({ style, text, component: Component, onClick }) =>
        Component ? (
          <Component key={text} text={text} />
        ) : (
          <button key={text} className={style} onClick={onClick}>
            {text}
          </button>
        )
      )}
    </div>
  )
}
