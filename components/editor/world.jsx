import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Vector3 } from 'three'
import shallow from 'zustand/shallow'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'

import useResources from '@/helpers/resources'
import useParameters from '@/helpers/parameters'

import Player from './player'

function Camera({ controls }) {
  const [origin] = useState(() => new Vector3())

  useFrame(() => {
    const { target } = controls.current

    const distance = 4 / target.distanceTo(origin)

    if (controls.current.enableDamping !== distance >= 1) {
      controls.current.enableDamping = distance >= 1
    }

    if (distance < 1) target.lerp(origin, distance * 0.02)
  })

  return null
}

export default function World() {
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
    const { h, s, l } = useParameters.getState().colors.background_basic

    setTimeout(() => {
      background.current.setHSL(h / 360, s, l)
      console.log(pointLight.current.intensity, ambientLight.current.intensity)
    }, 5e3)

    useParameters.subscribe(
      ({ h, s, l }) => {
        background.current.setHSL(h / 360, s, l)

        pointLight.current.intensity = l
      },
      (state) => state.colors.background_basic
    )
  }, [])

  return (
    <Canvas
      mode='concurrent'
      flat={true}
      style={{ position: 'absolute', top: 0 }}
      camera={{ fov: 60, near: 0.1, far: 1000, position: [-5, 0, 5] }}
    >
      <color ref={background} attach='background' args={['white']} />

      <OrbitControls ref={controls} minDistance={5} maxDistance={8} />

      <ambientLight ref={ambientLight} intensity={0.9} />
      <pointLight ref={pointLight} position={[-5, 5, 5]} intensity={1} />

      <Suspense fallback={null}>
        <Player position={[0, -3, 0]} />
        <Preload all />
      </Suspense>

      <Camera controls={controls} />
    </Canvas>
  )
}
