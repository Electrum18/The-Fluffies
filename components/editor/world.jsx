import { OrbitControls, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import shallow from 'zustand/shallow'

import useParameters from '@/helpers/parameters'
import useResources from '@/helpers/resources'

import Player from './player'

const selectorLight = state => [state.setLight, state.setAmbientLight]

function useLight() {
  const background = useRef()
  const pointLight = useRef()
  const ambientLight = useRef()

  const [setLight, setAmbientLight] = useResources(selectorLight, shallow)

  useEffect(() => setLight(pointLight), [setLight])
  useEffect(() => setAmbientLight(ambientLight), [setAmbientLight])

  useEffect(() => {
    useParameters.subscribe(
      ({ h, s, l }) => {
        background.current.setHSL(h / 360, s, l)

        pointLight.current.intensity = l
      },
      state => state.saves[state.slot].colors.background_basic
    )
  }, [])

  return [background, pointLight, ambientLight]
}

export default function World() {
  const controls = useRef()

  const [background, pointLight, ambientLight] = useLight()

  return (
    <Canvas
      mode="concurrent"
      flat={true}
      style={{ position: 'absolute', top: 0 }}
      camera={{ fov: 45, near: 0.1, far: 1000, position: [-10, 0, 10] }}
    >
      <color ref={background} attach="background" args={['white']} />

      <OrbitControls ref={controls} minDistance={7} maxDistance={10} />

      <ambientLight ref={ambientLight} intensity={0.7} />
      <pointLight ref={pointLight} position={[-5, 5, 5]} intensity={1} />

      <Suspense fallback={null}>
        <Player position={[0, -3, 0]} />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
