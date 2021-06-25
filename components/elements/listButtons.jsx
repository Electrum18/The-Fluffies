import styles from '@/styles/elements.module.css'

export default function ListButtons({ list }) {
  return (
    <div className={styles.buttonsList}>
      {list.map(({ style, text }) => (
        <button key={text} className={style}>
          {text}
        </button>
      ))}
    </div>
  )
}
