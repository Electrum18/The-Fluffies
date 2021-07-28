import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { DragControls } from 'three-stdlib'

import useAnimations from '@/helpers/animations'

const selector = state => state.setDragging

export default function useDragging(ref, setter) {
  const setDragging = useAnimations(selector)

  const camera = useThree(({ camera }) => camera)
  const gl = useThree(({ gl }) => gl)

  const [controls, setControls] = useState()

  useEffect(() => {
    setControls(new DragControls([ref.current], camera, gl.domElement))
  }, [camera, gl.domElement, ref])

  useEffect(() => {
    if (!controls) return

    function dragging() {
      return setter()
    }

    function draggingStart() {
      return setDragging(true)
    }

    function draggingEnd() {
      return setDragging(false)
    }

    controls.addEventListener('dragstart', draggingStart)
    controls.addEventListener('drag', dragging)
    controls.addEventListener('dragend', draggingEnd)

    return () => {
      controls.removeEventListener('dragstart', draggingStart)
      controls.removeEventListener('drag', dragging)
      controls.removeEventListener('dragend', draggingEnd)
    }
  }, [controls, setDragging, setter])
}
