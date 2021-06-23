import React, { useEffect, useRef, useState } from 'react'
import shallow from 'zustand/shallow'

import {
  FaChevronUp,
  FaChevronDown,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaSyncAlt,
  FaTimes,
} from 'react-icons/fa'

import useMenu from '@/helpers/menu'
import useAnimations from '@/helpers/animations'

import styles from '@/styles/editor.module.css'

import InputSlider from '../inputSlider'

export default function Animations() {
  const [page, closePages] = useMenu(
    (state) => [state.page, state.closePages],
    shallow
  )

  const [
    play,
    loop,
    folded,
    position,
    setPlay,
    setLoop,
    setFolded,
    setPosition,
  ] = useAnimations(
    (state) => [
      state.play,
      state.loop,
      state.folded,
      state.position,
      state.setPlay,
      state.setLoop,
      state.setFolded,
      state.setPosition,
    ],
    shallow
  )

  const [translate, setTranslate] = useState(100)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    setTranslate(100 - +(page === 'Animation') * 100 + +folded * 60)
  }, [folded, page])

  const style = { transform: `translateY(${translate}%)` }

  return (
    <div
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      style={style}
      className={styles['bottom-menu']}
    >
      <div>
        <div className='flex-grow' />
        <div className={'w-10 h-10 mr-2 ' + styles['icon-circle']}>
          {folded ? (
            <FaChevronUp
              className={styles['basic-icon']}
              onClick={() => setFolded(false)}
            />
          ) : (
            <FaChevronDown
              className={styles['basic-icon']}
              onClick={() => setFolded(true)}
            />
          )}
        </div>
        <div className={'w-10 h-10 ' + styles['icon-circle']}>
          <FaTimes
            className={styles['basic-icon']}
            onClick={() => closePages()}
          />
        </div>
        <div className='w-24' />
      </div>

      <div className={styles['media-player']}>
        <div>
          <span> 0:00.0 </span>
          <span> left </span>
        </div>

        <div>
          <FaStepBackward onClick={() => setPosition(0)} />

          <div className={styles['icon-circle']}>
            {play ? (
              <FaPause onClick={() => setPlay(false)} />
            ) : (
              <FaPlay onClick={() => setPlay(true)} />
            )}
          </div>

          <FaSyncAlt
            className={loop ? ' border-2 border-primary rounded-full' : ' '}
            onClick={() => setLoop(!loop)}
          />
        </div>

        <div>
          <span> 0:00.0 </span>
          <span> summary </span>
        </div>
      </div>

      <InputSlider
        value={position}
        callback={setPosition}
        dragging={dragging}
        onMouseDown={setDragging}
      />

      <div className='animaton-bg-gradient' />
    </div>
  )
}
