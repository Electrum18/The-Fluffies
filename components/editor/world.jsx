import React, { Suspense, useEffect, useRef, useState } from 'react'
import shallow from 'zustand/shallow'

import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'

import { Scene } from 'three'

import useResources from '@/helpers/resources'
import useParameters from '@/helpers/parameters'
import useAnimations from '@/helpers/animations'

import Player from './player'
import Camera from './camera'

import IK from './player/kinematics'
import Chain from './player/kinematics/chain'

const selector = (state) => [state.play, state.dragging]
const selectorResources = (state) => [state.setLight, state.setAmbientLight]
const selectorSkeleton = (state) => state.skeleton

function Main({ children }) {
  const [scene] = useState(() => new Scene())

  const skeleton = useResources(selectorSkeleton)

  const { gl, camera } = useThree()

  useFrame(() => {
    if (skeleton.bones.length < 1) return

    gl.autoClear = true
    gl.render(scene, camera)
  }, 0)

  return createPortal(children, scene)
}

function HeadsUpDisplay({ children }) {
  const [scene] = useState(() => new Scene())

  const { gl, camera } = useThree()

  useFrame(() => {
    gl.autoClear = false
    gl.clearDepth()
    gl.render(scene, camera)
  }, 1)

  return createPortal(children, scene)
}

export default function World() {
  const background = useRef()

  const controls = useRef()

  const pointLight = useRef()
  const ambientLight = useRef()

  const [play, dragging] = useAnimations(selector, shallow)
  const [setLight, setAmbientLight] = useResources(selectorResources, shallow)

  useEffect(() => setLight(pointLight), [setLight])
  useEffect(() => setAmbientLight(ambientLight), [setAmbientLight])

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
        enabled={!play && !dragging}
      />

      <ambientLight ref={ambientLight} intensity={0.7} />
      <pointLight ref={pointLight} position={[-5, 5, 5]} intensity={1} />

      <Camera controls={controls} play={play} />

      <Suspense fallback={null}>
        <Player position={[0, -3, 0]} />
        <Preload all />
      </Suspense>

      <Main>
        <Suspense fallback={null}>
          <Player position={[0, -3, 0]} />
          <Preload all />
        </Suspense>
      </Main>

      <HeadsUpDisplay>
        <IK>
          <Chain bones={['Pelvis', 'Chest', 'Chest2', 'Neck']} />
          <Chain bones={['Neck', 'Head_1']} />
          <Chain bones={['ForearmL', 'HandL', 'BallL', 'HoofL']} />
          <Chain bones={['ForearmR', 'HandR', 'BallR', 'HoofR']} />
          <Chain bones={['LegL', 'Leg2L', 'FootL', 'BackHoofL']} />
          <Chain bones={['LegR', 'Leg2R', 'FootR', 'BackHoofR']} />
        </IK>
      </HeadsUpDisplay>
    </Canvas>
  )
}
