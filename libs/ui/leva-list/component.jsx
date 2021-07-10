import React, { useState } from 'react'
import { Components, useInputContext } from 'leva/plugin'

import styles from '@/styles/editor.module.css'

const { Row } = Components

export function List() {
  const { value } = useInputContext()

  const [selected, setSelected] = useState(value.value)

  return (
    <>
      <Row>
        <div className={styles.listPanel}>
          {Object.keys(value.list).map((key) => (
            <div
              key={key}
              className={
                key === selected ? 'border-4 border-primary' : undefined
              }
              onClick={() => {
                value.change(key)
                setSelected(key)
              }}
            >
              <img src={`/img/thumb/${value.src + key}.png`} alt={key} />
            </div>
          ))}
        </div>
      </Row>
    </>
  )
}
