import { useEffect } from 'react'

import { useGLTF, useTexture } from '@react-three/drei'
import shallow from 'zustand/shallow'

import Models from '@/configs/character.json'
import Materials from '@/configs/materials/list.json'
import Changeable from '@/configs/changeable.json'

import useGeometries from '@/helpers/geometries'
import useTextures from '@/helpers/textures'
import useParameters from '@/helpers/parameters'

export function useModelInfo(elemName) {
  const isChangable = Changeable[elemName]

  const geometrySelected = useParameters((state) => state.values)

  const name = isChangable
    ? geometrySelected[isChangable.name].replace(/ /g, '_')
    : elemName

  const path = isChangable ? isChangable.src + name : 'main'

  return { name, path }
}

export function useGeometryManager(name, path, groupName = undefined) {
  const [geometries, addGeometry] = useGeometries(
    (store) => [store.geometries, store.addGeometry],
    shallow
  )

  const { nodes } = useGLTF('/models/' + path + '.glb', '/draco-gltf/')

  if (!geometries[name]) {
    if (groupName && Models[groupName].haveOutline) {
      const [main, outline] = nodes[name].children

      addGeometry(name, main.geometry)
      addGeometry(name + '_outline', outline.geometry)
    } else {
      addGeometry(name, nodes[name].geometry)
    }
  }

  return geometries
}

export function useColorManager(model, material) {
  const { color } = Materials[material]

  useEffect(() => {
    if (color) {
      const { material } = model.current

      const { colors } = useParameters.getState()
      const { h, s, l } = colors[color]

      material.color.setHSL(h, s, l)

      useParameters.subscribe(
        ({ h, s, l }) => material.color.setHSL(h, s, l),
        (state) => state.colors[color]
      )
    }
  }, [color, model])
}

export function useTextureManager(material, group = undefined) {
  const [textures, addTexture] = useTextures(
    (store) => [store.textures, store.addTexture],
    shallow
  )

  const textureName = group ? group + material : Materials[material].texture

  const texture = useTexture('/img/textures/' + textureName + '.png')

  texture.flipY = false

  if (!textures[material]) addTexture(material, texture)

  return textures[material]
}
