import React, { Suspense, useEffect } from 'react'
import { useControls } from 'leva'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'

import useParameters from '@/helpers/parameters'

import Hairs from '@/configs/changeable/hairs.json'

import Player from './player'

export default function ExportCanvas() {
  const [, set] = useControls(() => ({
    fur_basic: {
      value: useParameters.getState().colors.fur_basic,
      onChange: ({ h, s, l }) => {
        useParameters.getState().setColor('fur_basic', { h, s, l })
        useParameters.getState().setColor('fur_shade', { h, s, l: l / 2 })
      },
    },
    hair_basic: {
      value: useParameters.getState().colors.hair_basic,
      onChange: ({ h, s, l }) => {
        useParameters.getState().setColor('hair_basic', { h, s, l })
        useParameters.getState().setColor('hair_shade', { h, s, l: l / 2 })
      },
    },
    eyelashes_basic: {
      value: useParameters.getState().colors.eyelashes_basic,
      onChange: (color) =>
        useParameters.getState().setColor('eyelashes_basic', color),
    },
    hair: {
      value: useParameters.getState().values.hair_name_en,
      options: Object.keys(Hairs).map((key) => key.replace(/_/g, ' ')),
      onChange: (name) =>
        useParameters.getState().setValue('hair_name_en', name),
    },
  }))

  useEffect(() => {
    useParameters.subscribe(
      (color) => set({ fur_basic: color }),
      (state) => state.colors.fur_basic
    )

    useParameters.subscribe(
      (color) => set({ hair_basic: color }),
      (state) => state.colors.hair_basic
    )

    useParameters.subscribe(
      (color) => set({ eyelashes_basic: color }),
      (state) => state.colors.eyelashes_basic
    )

    useParameters.subscribe(
      (name) => set({ hair: name }),
      (state) => state.values.hair_name_en
    )
  }, [set])

  return (
    <Canvas
      mode='concurrent'
      flat={true}
      style={{ position: 'absolute', top: 0 }}
    >
      <color attach='background' args={['white']} />

      <OrbitControls />

      <ambientLight intensity={0.2} />
      <pointLight position={[-5, 10, 15]} intensity={0.6} />

      <Suspense fallback={null}>
        <Player />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
