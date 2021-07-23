import React, { useEffect, useRef } from 'react'
import shallow from 'zustand/shallow'

import useResources from '@/helpers/resources'

import { AppendGeomtery, AppendTexture } from './appenders'

import {
  useModelInfo,
  useColorManager,
  usePositionManager,
  useLight,
  useEmotionManager,
  useWorldColor,
  useSkinningManager,
} from '@/hooks/models'

const selector = (store) => [
  store.geometries,
  store.materials,
  store.textures,
  store.skeleton,
]

export function Model({ name: elemName, material, file, texture, emotions }) {
  const [geometries, materials, textures, skeleton] = useResources(
    selector,
    shallow
  )

  const model = useRef()

  const { name, src, textureName } = useModelInfo(
    elemName,
    file,
    material,
    texture
  )

  useLight(model)
  useWorldColor(model)

  useColorManager(model, material)
  usePositionManager(model, material)
  useEmotionManager(model, elemName, emotions)
  useSkinningManager(model, skeleton)

  useEffect(() => {
    if (material && textureName && textures[textureName]) {
      materials[material].uniforms.textureMask.value = textures[textureName]
    }
  }, [material, materials, textureName, textures])

  return (
    <>
      {name !== 'Empty' && !geometries[src] && (
        <AppendGeomtery name={name} src={src} file={file} />
      )}

      {name !== 'Empty' && textureName && !textures[textureName] && (
        <AppendTexture name={textureName} />
      )}

      <skinnedMesh
        ref={model}
        geometry={geometries[src] || geometries.Empty}
        material={materials[material]}
        skeleton={skeleton}
      />
    </>
  )
}
