import { OrbitControls, Preload } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import { Vector3 } from 'three'

import useParameters from '@/helpers/parameters'
import useResources from '@/helpers/resources'
import { getSaveValueInner } from '@/libs/saves'

import Player from './player'

const selectorLight = state => state.setLight
const selectorCamera = state => state.setCamera

function AppendCamera() {
  const setCamera = useResources(selectorCamera)

  useFrame(state => {
    if (state.camera) setCamera(state.camera.getWorldDirection(new Vector3()))
  })

  return null
}

function useLight() {
  const background = useRef()
  const pointLight = useRef()

  const setLight = useResources(selectorLight)

  useEffect(() => setLight(pointLight), [setLight])

  useEffect(() => {
    useParameters.subscribe(
      ({ h, s, l }) => {
        if (!background.current) return

        background.current.setHSL(h / 360, s, l)
      },
      state => getSaveValueInner(state, 'colors', 'background_basic')
    )
  }, [])

  return [background, pointLight]
}

export default function World() {
  const controls = useRef()

  const [background, pointLight] = useLight()

  return (
    <Canvas
      mode="concurrent"
      flat={true}
      style={{ position: 'absolute', top: 0 }}
      camera={{ fov: 45, near: 0.1, far: 1000, position: [-10, 0, 10] }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <color ref={background} attach="background" args={['white']} />

      <AppendCamera />
      <OrbitControls ref={controls} minDistance={7} maxDistance={10} />

      <pointLight ref={pointLight} position={[-5, 5, 5]} intensity={1} />

      <Suspense fallback={null}>
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
