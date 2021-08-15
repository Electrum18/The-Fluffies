import React, { useEffect, useRef } from 'react'
import { FaChevronDown, FaPen } from 'react-icons/fa'

import styles from '@/styles/elements.module.css'

function ListPart({ selectIndex, list, onChange, onEdit }) {
  const select = useRef()

  useEffect(() => {
    if (selectIndex) select.current.selectedIndex = selectIndex
  }, [selectIndex])

  return (
    <div className={styles.dropdownList}>
      <select ref={select} onChange={onChange}>
        {list.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
      <div>
        {onEdit && (
          <div onClick={() => onEdit(list[select.current.selectedIndex])}>
            <FaPen />
          </div>
        )}
        <div>
          <FaChevronDown />
        </div>
      </div>
    </div>
  )
}

export default function ListDropdown({
  label,
  selectIndex,
  list,
  maximum,
  onChange,
  onEdit
}) {
  return label ? (
    maximum ? (
      <div className={styles.buttonsWithLabel}>
        <ListPart
          selectIndex={selectIndex}
          list={list}
          onChange={onChange}
          onEdit={onEdit}
        />
        <div>
          <span>{label}</span>
          <span>{list.length + '/' + maximum}</span>
        </div>
      </div>
    ) : (
      <div className={styles.withLabel}>
        <ListPart
          selectIndex={selectIndex}
          list={list}
          onChange={onChange}
          onEdit={onEdit}
        />
        <span>{label}</span>
      </div>
    )
  ) : (
    <ListPart
      selectIndex={selectIndex}
      list={list}
      onChange={onChange}
      onEdit={onEdit}
    />
  )
}
