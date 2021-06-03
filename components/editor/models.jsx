import React, { useRef } from 'react'

import useMaterials from '@/helpers/materials'

import {
  useColorManager,
  useGeometryManager,
  useModelInfo,
  useTextureManager,
} from '@/hooks/models'

export function SingleModel({ name: elemName, material }) {
  const model = useRef()

  const { name, path } = useModelInfo(elemName)

  const geometries = useGeometryManager(name, path)
  const materials = useMaterials((store) => store.materials)

  useColorManager(model, material)

  return (
    <mesh
      ref={model}
      geometry={geometries[name]}
      material={materials[material]}
      scale={0.1}
    />
  )
}

export function TexturedModel({ name: elemName, material }) {
  const model = useRef()

  const { name, path } = useModelInfo(elemName)

  const geometries = useGeometryManager(name, path)
  const materials = useMaterials((store) => store.materials)
  const texture = useTextureManager(material)

  useColorManager(model, material)

  return (
    <mesh
      ref={model}
      geometry={geometries[name]}
      material={materials[material]}
      material-map={texture}
      scale={0.1}
    />
  )
}

export function OutlinedModel({ name: groupName, material }) {
  const model = useRef()
  const modelOutline = useRef()

  const { name, path } = useModelInfo(groupName)

  const geometries = useGeometryManager(name, path, groupName)
  const materials = useMaterials((store) => store.materials)

  useColorManager(model, material)
  useColorManager(modelOutline, material + '_outline')

  return (
    <group scale={0.1}>
      <mesh
        ref={model}
        geometry={geometries[name]}
        material={materials[material]}
      />

      <mesh
        ref={modelOutline}
        geometry={geometries[name + '_outline']}
        material={materials[material + '_outline']}
      />
    </group>
  )
}

export function OutlinedTexturedModel({
  name: groupName,
  material,
  texture: textureName,
}) {
  const model = useRef()
  const modelOutline = useRef()

  const { name, path } = useModelInfo(groupName)

  const geometries = useGeometryManager(name, path, groupName)
  const materials = useMaterials((store) => store.materials)
  const texture = useTextureManager(name + '_second', textureName)

  useColorManager(model, material)
  useColorManager(modelOutline, material + '_outline')

  return (
    <group scale={0.1}>
      <mesh
        ref={model}
        geometry={geometries[name]}
        material={materials[material]}
        material-map={texture}
      />

      <mesh
        ref={modelOutline}
        geometry={geometries[name + '_outline']}
        material={materials[material + '_outline']}
      />
    </group>
  )
}
