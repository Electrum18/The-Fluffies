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
  FaFilm,
  FaArrowsAltH,
  FaPlus,
  FaMinus,
} from 'react-icons/fa'

import useMenu from '@/helpers/menu'
import useAnimations from '@/helpers/animations'

import { useFrameEdit } from '@/hooks/animation'

import InputSlider from '@/components/elements/inputSlider'

import { LeftSection } from '../createSection'

import styles from '@/styles/elements/animations.module.css'
import menuStyles from '@/styles/menu.module.css'
import editorStyles from '@/styles/editor.module.css'

const selectorPage = (state) => [state.page, state.closePages]
const selectorAnimations = (state) => [
  state.play,
  state.loop,
  state.folded,
  state.position,
  state.saves[state.slot].frames,
  state.selected,
  state.setPlay,
  state.setLoop,
  state.setFolded,
  state.setPosition,
  state.addFrame,
  state.deleteFrame,
]

function Icon({ className, onClick }) {
  return (
    <div onClick={onClick}>
      <FaFilm className={className} />
    </div>
  )
}

function formatTime(value) {
  const minute = (value / 60) | 0
  let second = (((value % 60) * 10) | 0) / 10

  second = second < 10 ? '0' + second : second
  second = (second * 10) % 10 < 1 ? second + '.0' : second

  return minute + ':' + second
}

function Frame({
  index,
  duration,
  selected,
  last,
  onPointerDown,
  onDragging,
  className,
}) {
  function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value
  }

  const selectedmargin = selected === index ? '0' : ''

  return (
    <div
      style={{
        marginLeft: index === 0 ? '10px' : undefined,
        width: (last ? 112 : duration * 240) + 'px',
      }}
      className={
        styles.frame +
        (selected === index ? ` ${editorStyles.selected}` : '') +
        className
      }
      onPointerDown={onPointerDown}
    >
      {duration > 0.3 && (
        <img
          style={{
            width: (last ? 96 : 64 + 64 * clamp(duration - 0.5, 0, 1)) + 'px',
            margin: selected === index ? '4px' : '',
          }}
          alt={'Frame ' + index}
        />
      )}

      {duration > 0.7 ? (
        <div style={{ margin: selectedmargin }}>
          <p> pose • {index} </p>
          <p> duration {duration}s </p>
        </div>
      ) : (
        <div style={{ margin: selectedmargin }}>
          <p> {index} </p>
          <p> {duration}s </p>
        </div>
      )}

      <div
        style={{ margin: selected === index ? '20px -16px 20px 0px' : '' }}
        onPointerDown={onDragging}
      >
        <FaArrowsAltH />
      </div>
    </div>
  )
}

export default function AnimationSection() {
  const [page, closePages] = useMenu(selectorPage, shallow)

  const [
    play,
    loop,
    folded,
    position,
    frames,
    selected,
    setPlay,
    setLoop,
    setFolded,
    setPosition,
    addFrame,
    deleteFrame,
  ] = useAnimations(selectorAnimations, shallow)

  const [translate, setTranslate] = useState(100)
  const [dragging, setDragging] = useState(false)
  const [sum_duration, setSumDuration] = useState(0)

  useEffect(() => {
    setTranslate(100 - +(page === 'Animation') * 100 + +folded * 54)
  }, [folded, page])

  useEffect(() => {
    setSumDuration(
      frames.reduce(
        (summary, { duration }, index, array) =>
          index === array.length - 1 ? summary : summary + duration,
        0
      )
    )
  }, [frames])

  useEffect(() => {
    let _timer

    if (play) {
      const durationMs = sum_duration * 20000

      _timer = setInterval(() => {
        if (position < 1) {
          setPosition(position + 60 / durationMs)
        } else {
          if (loop) {
            setPosition(0)
          } else {
            setPosition(1)
            setPlay(false)
          }
        }
      }, 60 / durationMs)
    } else {
      clearInterval(_timer)
    }

    return () => clearInterval(_timer)
  }, [loop, play, position, setPlay, setPosition, sum_duration])

  const [setFrameDragging, setSelectedFrame, setStartPos] = useFrameEdit()

  function stopDraggingFrame() {
    setStartPos(null)
    setFrameDragging(false)
  }

  return (
    <LeftSection name='Animation' icon={Icon}>
      <div
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
        style={{ transform: `translateY(${translate}%)` }}
        className={menuStyles.bottomMenu + ' ' + styles.bottomBar}
      >
        <div>
          <div />
          <div className='mr-2'>
            <FaPlus onClick={() => addFrame()} />
          </div>
          <div
            className={
              frames.length < 2 ? 'pointer-events-none opacity-50' : ''
            }
          >
            <FaMinus onClick={() => deleteFrame()} />
          </div>
          <div className='flex-grow' />
          <div className='mr-2'>
            {folded ? (
              <FaChevronUp onClick={() => setFolded(false)} />
            ) : (
              <FaChevronDown onClick={() => setFolded(true)} />
            )}
          </div>
          <div>
            <FaTimes onClick={() => closePages()} />
          </div>
          <div />
        </div>

        <div className={styles.mediaPlayer}>
          <div>
            <span> {formatTime(position * sum_duration)} </span>
            <span> left </span>
          </div>

          <div>
            <FaStepBackward onClick={() => setPosition(0)} />

            <div>
              {play ? (
                <FaPause onClick={() => setPlay(false)} />
              ) : (
                <FaPlay className='ml-0.5' onClick={() => setPlay(true)} />
              )}
            </div>

            <FaSyncAlt
              className={loop ? ' border-2 border-primary rounded-full' : ' '}
              onClick={() => setLoop(!loop)}
            />
          </div>

          <div>
            <span> {formatTime(sum_duration)} </span>
            <span> summary </span>
          </div>
        </div>

        <InputSlider
          value={position}
          callback={setPosition}
          dragging={dragging}
          onPointerDown={setDragging}
        />

        <div
          className='animaton-bg-gradient'
          onPointerUp={stopDraggingFrame}
          onPointerLeave={stopDraggingFrame}
        >
          {frames.map(({ duration }, index) => (
            <Frame
              key={index}
              index={index}
              duration={duration}
              last={index === frames.length - 1}
              selected={selected}
              onPointerDown={() => {
                setSelectedFrame(index)
                setFrameDragging(true)
              }}
              className={play ? ' opacity-50 pointer-events-none' : ''}
            />
          ))}

          <div className={styles.placeholder} />
          <div
            className={styles.progressLine}
            style={{ left: position * sum_duration * 256 + 'px' }}
          />
        </div>
      </div>
    </LeftSection>
  )
}
