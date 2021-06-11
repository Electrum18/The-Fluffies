import React, { useRef, useEffect } from 'react'

import useMaterials from '@/helpers/materials'

import {
  useColorManager,
  useGeometryManager,
  useOutlinedGeometryManager,
  useModelInfo,
  useTextureManager,
} from '@/hooks/models'

import {
  useDoubleColorManager,
  useToonShaderUpdater,
} from '@/hooks/texturedMaterials'

export function SingleModel({ name: elemName, material, modelKey, src }) {
  const model = useRef()

  const { name, path } = useModelInfo(elemName, { modelKey, src })

  const geometries = useGeometryManager(name, path)
  const materials = useMaterials((store) => store.materials)

  useColorManager(model, material)

  return (
    <mesh
      ref={model}
      geometry={geometries[name]}
      material={materials[material]}
    />
  )
}

export function TexturedModel({
  name: elemName,
  material,
  modelKey,
  textureKey,
  src,
  postfix,
}) {
  const model = useRef()

  const { name, path } = useModelInfo(elemName, { modelKey, src })

  const geometries = useGeometryManager(name, path)
  const materials = useMaterials((store) => store.materials)
  const texture = useTextureManager({ material, textureKey, src, postfix })

  useColorManager(model, material)

  return (
    <mesh
      ref={model}
      geometry={geometries[name]}
      material={materials[material]}
      material-map={texture}
    />
  )
}

export function OutlinedModel({ name: groupName, material, modelKey, src }) {
  const model = useRef()
  const modelOutline = useRef()

  const { name, path } = useModelInfo(groupName, { modelKey, src })

  const geometries = useOutlinedGeometryManager(name, path)
  const materials = useMaterials((store) => store.materials)

  useColorManager(model, material)
  useColorManager(modelOutline, material + '_outline')

  return (
    <group>
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
  modelKey,
  textureKey,
  src,
  postfix,
}) {
  const model = useRef()
  const modelOutline = useRef()

  const { name, path } = useModelInfo(groupName, { modelKey, src })

  const geometries = useOutlinedGeometryManager(name, path)
  const materials = useMaterials((store) => store.materials)
  const texture = useTextureManager({ material, textureKey, src, postfix })

  useToonShaderUpdater(model)

  useDoubleColorManager(model, material)
  useDoubleColorManager(modelOutline, material + '_outline')

  useEffect(() => {
    materials[material].uniforms.textureMask.value = texture
    materials[material + '_outline'].uniforms.textureMask.value = texture
  }, [material, materials, texture])

  return (
    <group>
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
