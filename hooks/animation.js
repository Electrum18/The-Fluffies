import { useEffect, useMemo, useState } from 'react'
import shallow from 'zustand/shallow'

import useAnimations from '@/helpers/animations'

const selector = (state) => [
  state.saves[state.slot].frames,
  state.selected,
  state.setDuration,
  state.setSelectedFrame,
]

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function generateTimesToCurrentFrames(intervals) {
  const timesToFrames = []
  let timeToFrameCurrent = 0

  for (let index = 0; index < intervals.length - 1; index++) {
    timeToFrameCurrent += intervals[index].duration

    timesToFrames.push(timeToFrameCurrent)
  }

  return timesToFrames
}

export function useFrameEdit() {
  const [frames, selected, setDuration, setSelectedFrame] = useAnimations(
    selector,
    shallow
  )

  const [dragging, setDragging] = useState(false)
  const [startPos, setStartPos] = useState(null)
  const [startLen, setStartLen] = useState(null)

  function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value
  }

  useEffect(() => {
    function handleMove(e) {
      if (dragging) {
        if (startPos === null) {
          setStartLen(frames[selected].duration)
          setStartPos(e.pageX)
        } else {
          const step = (((e.pageX - startPos) / 24) | 0) / 10

          setDuration(
            selected,
            clamp((((startLen + step) * 10) | 0) / 10, 0.2, 10)
          )
        }
      }
    }

    window.addEventListener('pointermove', handleMove)

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [dragging, frames, selected, setDuration, startLen, startPos])

  return [setDragging, setSelectedFrame, setStartPos]
}

export function useAnimationPosition(frames, position) {
  const allPositions = useMemo(
    () =>
      frames.reduce(
        (summary, { duration }, index, array) =>
          index === array.length - 1 ? summary : summary + duration,
        0
      ),
    [frames]
  )

  const positionsToFrames = useMemo(
    () => generateTimesToCurrentFrames(frames),
    [frames]
  )

  const [intervalIndex, setIntervalIndex] = useState(0)
  const [localPosition, setLocalPosition] = useState(0)

  useEffect(() => {
    const currentLength = allPositions * (0.0001 + position * 0.9998)
    const duration = frames[intervalIndex].duration
    const interval =
      (currentLength - (positionsToFrames[intervalIndex] - duration)) / duration

    const intervalRounded = interval | 0

    if (intervalRounded >= 1) {
      setIntervalIndex(intervalRounded)
    } else if (intervalRounded < 0) {
      setIntervalIndex(intervalIndex + intervalRounded - 1)
    }

    setLocalPosition(interval)
  }, [allPositions, frames, intervalIndex, position, positionsToFrames])

  return [intervalIndex, easeInOutQuad(localPosition > 0 ? localPosition : 0)]
}
