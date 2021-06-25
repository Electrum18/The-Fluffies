import styles from '@/styles/elements.module.css'

function ListPart({ list }) {
  return (
    <div className={styles.squaresList}>
      {list.map(({ style }, index) => (
        <div key={index}>
          <div className={style} />
        </div>
      ))}
    </div>
  )
}

export default function ListSquares({ label, list }) {
  return label ? (
    <div className={styles.withLabel}>
      <ListPart list={list} />
      <span>{label}</span>
    </div>
  ) : (
    <ListPart list={list} />
  )
}
