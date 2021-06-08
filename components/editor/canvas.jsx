import React, { Suspense, useEffect, useRef } from 'react'
import shallow from 'zustand/shallow'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'

import useMaterials from '@/helpers/materials'

import Player from './player'

export default function ExportCanvas() {
  const pointLight = useRef()
  const ambientLight = useRef()

  const [setLight, setAmbientLight] = useMaterials(
    (state) => [state.setLight, state.setAmbientLight],
    shallow
  )

  useEffect(() => {
    setLight(pointLight)
  }, [setLight])

  useEffect(() => {
    setAmbientLight(ambientLight)
  }, [setAmbientLight])

  return (
    <Canvas
      mode='concurrent'
      flat={true}
      style={{ position: 'absolute', top: 0 }}
    >
      <color attach='background' args={['white']} />

      <OrbitControls />

      <ambientLight ref={ambientLight} intensity={0.2} />
      <pointLight ref={pointLight} position={[-5, 10, 15]} intensity={0.6} />

      <Suspense fallback={null}>
        <Player rotation={[0, 0.7, 0]} />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
