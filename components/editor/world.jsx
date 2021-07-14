import React, { Suspense, useEffect, useRef } from 'react'
import shallow from 'zustand/shallow'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'

import useResources from '@/helpers/resources'
import useParameters from '@/helpers/parameters'
import useAnimations from '@/helpers/animations'

import Player from './player'
import Camera from './camera'

const selector = (state) => state.play

export default function World() {
  const play = useAnimations(selector)

  const background = useRef()

  const controls = useRef()

  const pointLight = useRef()
  const ambientLight = useRef()

  const [setLight, setAmbientLight] = useResources(
    (state) => [state.setLight, state.setAmbientLight],
    shallow
  )

  useEffect(() => {
    setLight(pointLight)
  }, [setLight])

  useEffect(() => {
    setAmbientLight(ambientLight)
  }, [setAmbientLight])

  useEffect(() => {
    useParameters.subscribe(
      ({ h, s, l }) => {
        background.current.setHSL(h / 360, s, l)

        pointLight.current.intensity = l
      },
      (state) => state.saves[state.slot].colors.background_basic
    )
  }, [])

  return (
    <Canvas
      mode='concurrent'
      flat={true}
      style={{ position: 'absolute', top: 0 }}
      camera={{ fov: 45, near: 0.1, far: 1000, position: [-10, 0, 10] }}
    >
      <color ref={background} attach='background' args={['white']} />

      <OrbitControls
        ref={controls}
        minDistance={7}
        maxDistance={10}
        enablePan={!play}
        enableZoom={!play}
        enableRotate={!play}
      />

      <ambientLight ref={ambientLight} intensity={0.8} />
      <pointLight ref={pointLight} position={[-5, 5, 5]} intensity={1} />

      <Suspense fallback={null}>
        <Player position={[0, -3, 0]} />
        <Preload all />
      </Suspense>

      <Camera controls={controls} play={play} />
    </Canvas>
  )
}
