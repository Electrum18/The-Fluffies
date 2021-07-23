import React, { useEffect, useRef, useState } from 'react'

import styles from '@/styles/elements.module.css'

export default function InputSlider({
  value,
  callback,
  dragging,
  onPointerDown,
}) {
  const slider = useRef()

  const [pxWidth, setPxWidth] = useState(0)

  useEffect(() => {
    function handleSize() {
      setPxWidth(slider.current.offsetWidth)
    }

    handleSize()

    window.addEventListener('resize', handleSize)

    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  useEffect(() => {
    function handleMove(e) {
      if (pxWidth > 0 && dragging) callback((e.pageX - 12) / pxWidth)
    }

    window.addEventListener('pointermove', handleMove)

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [callback, dragging, pxWidth])

  return (
    <div className={styles.inputSlider}>
      <div ref={slider} />
      <div
        onPointerDown={onPointerDown}
        style={{ left: `calc(1rem + ${pxWidth * value - 12}px)` }}
      />
    </div>
  )
}
