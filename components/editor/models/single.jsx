import React, { useRef } from 'react'

import { useColorManager, useModelInfo } from '@/hooks/models'

import useMaterials from '@/helpers/materials'
import useGeometries from '@/helpers/geometries'
import useTextures from '@/helpers/textures'

import { AppendGeomtery } from './appenders/geometry'
import AppendTexture from './appenders/texture'

export function SingleModel({ name: elemName, material, file }) {
  const geometries = useGeometries((store) => store.geometries)
  const materials = useMaterials((store) => store.materials)

  const model = useRef()

  const { name, src } = useModelInfo(elemName, file)

  useColorManager(model, material)

  return (
    <>
      {name !== 'Empty' && !geometries[src] && (
        <AppendGeomtery name={name} src={src} file={file} />
      )}

      <mesh
        ref={model}
        geometry={geometries[src] || geometries.Empty}
        material={materials[material]}
      />
    </>
  )
}

export function TexturedModel({ name: elemName, material, file, texture }) {
  const geometries = useGeometries((store) => store.geometries)
  const materials = useMaterials((store) => store.materials)
  const textures = useTextures((store) => store.textures)

  const model = useRef()

  const { name, src, textureName } = useModelInfo(
    elemName,
    file,
    material,
    texture
  )

  useColorManager(model, material)

  return (
    <>
      {name !== 'Empty' && !geometries[src] && (
        <AppendGeomtery name={name} src={src} file={file} />
      )}

      {name !== 'Empty' && textureName && !textures[textureName] && (
        <AppendTexture name={textureName} />
      )}

      <mesh
        ref={model}
        geometry={geometries[src] || geometries.Empty}
        material={materials[material]}
        material-map={(textureName && textures[textureName]) || null}
      />
    </>
  )
}
