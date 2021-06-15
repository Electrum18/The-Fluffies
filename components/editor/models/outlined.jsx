import React, { useRef, useEffect } from 'react'

import { useColorManager, useHSLAManager, useModelInfo } from '@/hooks/models'

import {
  useDoubleColorManager,
  useToonShaderUpdater,
} from '@/hooks/texturedMaterials'

import useMaterials from '@/helpers/materials'
import useGeometries from '@/helpers/geometries'
import useTextures from '@/helpers/textures'

import { AppendGeomteryOutlined } from './appenders/geometry'
import AppendTexture from './appenders/texture'

export function OutlinedModel({ name: elemName, material, file }) {
  const geometries = useGeometries((store) => store.geometries)
  const materials = useMaterials((store) => store.materials)

  const model = useRef()
  const modelOutline = useRef()

  const { name, src } = useModelInfo(elemName, file)

  useColorManager(model, material)
  useColorManager(modelOutline, material + '_outline')

  return (
    <group>
      {name !== 'Empty' && !geometries[src] && (
        <AppendGeomteryOutlined name={name} src={src} file={file} />
      )}

      <mesh
        ref={model}
        geometry={geometries[src] || geometries.Empty}
        material={materials[material]}
      />

      <mesh
        ref={modelOutline}
        geometry={geometries[src + '_outline'] || geometries.Empty}
        material={materials[material + '_outline']}
      />
    </group>
  )
}

export function OutlinedTransparentModel({ name: elemName, material, file }) {
  const geometries = useGeometries((store) => store.geometries)
  const materials = useMaterials((store) => store.materials)

  const model = useRef()
  const modelOutline = useRef()

  const { name, src } = useModelInfo(elemName, file)

  useToonShaderUpdater(modelOutline)

  useColorManager(model, material)
  useHSLAManager(modelOutline, material + '_outline')

  return (
    <group>
      {name !== 'Empty' && !geometries[src] && (
        <AppendGeomteryOutlined name={name} src={src} file={file} />
      )}

      <mesh
        ref={model}
        geometry={geometries[src] || geometries.Empty}
        material={materials[material]}
      />

      <mesh
        ref={modelOutline}
        geometry={geometries[src + '_outline'] || geometries.Empty}
        material={materials[material + '_outline']}
      />
    </group>
  )
}

export function OutlinedTexturedModel({
  name: elemName,
  material,
  file,
  texture,
}) {
  const geometries = useGeometries((store) => store.geometries)
  const materials = useMaterials((store) => store.materials)
  const textures = useTextures((store) => store.textures)

  const model = useRef()
  const modelOutline = useRef()

  const { name, src, textureName } = useModelInfo(
    elemName,
    file,
    material,
    texture
  )

  useToonShaderUpdater(model)

  useDoubleColorManager(model, material)
  useDoubleColorManager(modelOutline, material + '_outline')

  useEffect(() => {
    if (material && textureName && textures[textureName]) {
      materials[material].uniforms.textureMask.value = textures[textureName]
      materials[material + '_outline'].uniforms.textureMask.value =
        textures[textureName]
    }
  }, [material, materials, textureName, textures])

  return (
    <group>
      {name !== 'Empty' && !geometries[src] && (
        <AppendGeomteryOutlined name={name} src={src} file={file} />
      )}

      {name !== 'Empty' && textureName && !textures[textureName] && (
        <AppendTexture name={textureName} />
      )}

      <mesh
        ref={model}
        geometry={geometries[src] || geometries.Empty}
        material={materials[material]}
      />

      <mesh
        ref={modelOutline}
        geometry={geometries[src + '_outline'] || geometries.Empty}
        material={materials[material + '_outline']}
      />
    </group>
  )
}
