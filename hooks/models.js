import { useEffect } from 'react'

import { useGLTF, useTexture } from '@react-three/drei'
import shallow from 'zustand/shallow'

import Materials from '@/configs/materials/list.json'

import useGeometries from '@/helpers/geometries'
import useTextures from '@/helpers/textures'
import useParameters from '@/helpers/parameters'

export function useModelInfo(elemName, { modelKey, src } = {}) {
  const properties = useParameters((state) => state.values)

  const name = modelKey ? properties[modelKey].replace(/ /g, '_') : elemName
  const path = modelKey && src ? src + name : 'main'

  return { name, path }
}

export function useGeometryManager(name, path) {
  const [geometries, addGeometry] = useGeometries(
    (store) => [store.geometries, store.addGeometry],
    shallow
  )

  const { nodes } = useGLTF('/models/' + path + '.glb', '/draco-gltf/')

  if (!geometries[name]) addGeometry(name, nodes[name].geometry)

  return geometries
}

export function useOutlinedGeometryManager(name, path) {
  const [geometries, addGeometry] = useGeometries(
    (store) => [store.geometries, store.addGeometry],
    shallow
  )

  const { nodes } = useGLTF('/models/' + path + '.glb', '/draco-gltf/')

  if (!geometries[name]) {
    const [main, outline] = nodes[name].children

    addGeometry(name, main.geometry)
    addGeometry(name + '_outline', outline.geometry)
  }

  return geometries
}

export function useColorManager(model, material) {
  const { color } = Materials[material]

  useEffect(() => {
    if (color) {
      const { material } = model.current

      const { h, s, l } = useParameters.getState().colors[color]

      material.color.setHSL(h / 360, s, l)

      useParameters.subscribe(
        ({ h, s, l }) => material.color.setHSL(h / 360, s, l),
        (state) => state.colors[color]
      )
    }
  }, [color, model])
}

export function useTextureManager({ material, textureKey, src, postfix }) {
  const properties = useParameters((state) => state.values)

  const [textures, addTexture] = useTextures(
    (store) => [store.textures, store.addTexture],
    shallow
  )

  let textureName =
    src && textureKey
      ? src + properties[textureKey].replace(/ /g, '_')
      : Materials[material].texture

  if (postfix) textureName += postfix

  const texture = useTexture('/img/textures/' + textureName + '.png')

  texture.flipY = false

  if (!textures[textureName]) addTexture(textureName, texture)

  return textures[textureName]
}
