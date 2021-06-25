import React, { useEffect, useState } from 'react'
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
import menuStyles from '@/styles/menu.module.css'

import InputSlider from '../../elements/inputSlider'

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

  return (
    <div
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      style={{ transform: `translateY(${translate}%)` }}
      className={menuStyles.bottomMenu + ' ' + menuStyles.animatingMenu}
    >
      <div>
        <div className='flex-grow' />
        <div className={'w-10 h-10 mr-2 ' + styles.iconCircle}>
          {folded ? (
            <FaChevronUp
              className={styles.basicIcon}
              onClick={() => setFolded(false)}
            />
          ) : (
            <FaChevronDown
              className={styles.basicIcon}
              onClick={() => setFolded(true)}
            />
          )}
        </div>
        <div className={'w-10 h-10 ' + styles.iconCircle}>
          <FaTimes className={styles.basicIcon} onClick={() => closePages()} />
        </div>
        <div className='w-24' />
      </div>

      <div className={menuStyles.mediaPlayer}>
        <div>
          <span> 0:00.0 </span>
          <span> left </span>
        </div>

        <div>
          <FaStepBackward onClick={() => setPosition(0)} />

          <div className={styles.iconCircle}>
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
