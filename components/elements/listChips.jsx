import styles from '@/styles/elements.module.css'

function ListPart({ list }) {
  return (
    <div className={styles.chipsList}>
      {list.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </div>
  )
}

export default function ListChips({ label, list }) {
  return label ? (
    <div className={styles.withLabel}>
      <ListPart list={list} />
      <span>{label}</span>
    </div>
  ) : (
    <ListPart list={list} />
  )
}
