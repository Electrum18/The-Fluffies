import { FaChevronDown } from 'react-icons/fa'

import styles from '@/styles/elements.module.css'

function ListPart({ list }) {
  return (
    <div className={styles.dropdownList}>
      <select>
        {list.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <div>
        <FaChevronDown />
      </div>
    </div>
  )
}

export default function ListDropdown({ label, list }) {
  return label ? (
    <div className={styles.withLabel}>
      <ListPart list={list} />
      <span>{label}</span>
    </div>
  ) : (
    <ListPart list={list} />
  )
}
