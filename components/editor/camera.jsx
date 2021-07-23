import { useState } from 'react'
import { useFrame } from '@react-three/fiber'

import { Vector3 } from 'three'

import shallow from 'zustand/shallow'

import useAnimations from '@/helpers/animations'

import { useAnimationPosition } from '@/hooks/animation'

const selector = (state) => [
  state.saves[state.slot].frames,
  state.position,
  state.selected,
  state.setProperty,
]

function formatVec3({ x, y, z }) {
  function format(value) {
    return ((value * 10) | 0) / 10
  }

  return { x: format(x), y: format(y), z: format(z) }
}

export default function Camera({ controls, play }) {
  const [frames, position, selected, setProperty] = useAnimations(
    selector,
    shallow
  )

  const [origin] = useState(() => new Vector3())

  function checkDifference(value, target, callback) {
    if (value.x !== target.x || value.y !== target.y || value.z !== target.z) {
      callback()
    }
  }

  const [tempPlay, setTempPlay] = useState(false) // Toggle state
  const [tempSelected, setTempSelected] = useState(0) // Toggle state

  const [intervalIndex, localPosition] = useAnimationPosition(frames, position)

  useFrame(() => {
    const { target, object } = controls.current

    const frame = frames[selected].frame

    if (!play) {
      // Toggle logic
      if (tempPlay !== play || selected !== tempSelected) {
        controls.current.target.lerp(frame.camera_target, 1)
        controls.current.object.position.lerp(frame.camera_position, 1)

        if (tempSelected !== selected) setTempSelected(selected) // Toggle state
      } else {
        const targetPos = formatVec3(target)
        const position = formatVec3(object.position)

        checkDifference(frame.camera_target, targetPos, () => {
          setProperty('camera_target', targetPos)
        })

        checkDifference(frame.camera_position, position, () => {
          setProperty('camera_position', position)
        })
      }
    } else {
      const playFrame = frames[intervalIndex].frame
      const nextFrame = frames[intervalIndex + 1].frame

      controls.current.target.lerpVectors(
        playFrame.camera_target,
        nextFrame.camera_target,
        localPosition
      )

      controls.current.object.position.lerpVectors(
        playFrame.camera_position,
        nextFrame.camera_position,
        localPosition
      )
    }

    const distance = 9 / target.distanceTo(origin)

    if (controls.current.enableDamping !== distance >= 1) {
      controls.current.enableDamping = distance >= 1
    }

    if (distance < 1) target.lerp(origin, distance * 0.02)

    if (tempPlay !== play) setTempPlay(play) // Toggle state
  })

  return null
}
