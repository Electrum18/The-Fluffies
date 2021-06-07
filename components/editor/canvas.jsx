import React, { Suspense, useEffect, useRef } from 'react'
import { useControls } from 'leva'
import shallow from 'zustand/shallow'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'

import useParameters from '@/helpers/parameters'
import useMaterials from '@/helpers/materials'

import Hairs from '@/configs/changeable/hairs.json'

import Player from './player'

export default function ExportCanvas() {
  const pointLight = useRef()
  const ambientLight = useRef()

  const [setLight, setAmbientLight] = useMaterials(
    (state) => [state.setLight, state.setAmbientLight],
    shallow
  )

  const setColor = useParameters((state) => state.setColor)

  const [, set] = useControls(() => ({
    fur_basic: {
      value: useParameters.getState().colors.fur_basic,
      onChange: ({ h, s, l }) => {
        setColor('fur_basic', { h: h / 360, s, l })
        setColor('fur_shade', { h: h / 360, s, l: l / 2 })
      },
    },
    hair_basic: {
      value: useParameters.getState().colors.hair_basic,
      onChange: ({ h, s, l }) => {
        setColor('hair_basic', { h: h / 360, s, l })
        setColor('hair_shade', { h: h / 360, s, l: l / 2 })
      },
    },
    hair_second: {
      value: useParameters.getState().colors.hair_second,
      onChange: ({ h, s, l }) => {
        setColor('hair_second', { h: h / 360, s, l })
        setColor('hair_second_shade', { h: h / 360, s, l: l / 2 })
      },
    },
    eyelashes_basic: {
      value: useParameters.getState().colors.eyelashes_basic,
      onChange: (color) => setColor('eyelashes_basic', color),
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
        <Player />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
