import { useGLTF, useTexture } from '@react-three/drei'
import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import useEmotions from '@/helpers/emotions'
import useResources from '@/helpers/resources'
import { nameIndexGroups, nameInFileIndexes } from '@/libs/nameIndexes'

const selectorAddGeometry = store => store.addGeometry
const selectorMorphsList = store => [store.morphsList, store.setMorphsList]
const selectorAddTexture = store => store.addTexture

export function AppendGeomtery({
  name,
  src,
  file: { group, key, postfix } = {}
}) {
  const [morphsList, setMorphsList] = useEmotions(selectorMorphsList, shallow)
  const addGeometry = useResources(selectorAddGeometry)

  const index = key && nameInFileIndexes[key][name]

  const { nodes } = useGLTF(
    `/models/${group ? group + index : 'Main'}.glb`,
    '/draco-gltf/'
  )

  const add = useCallback(
    (_group, _name) => {
      const mesh = nodes[_name] || nodes[_name + '_' + key + (postfix || '')]
      const { geometry } = mesh

      if (geometry.morphAttributes.position) {
        const { position } = mesh.geometry.morphAttributes

        position.forEach((value, index) => {
          geometry.attributes['morphTarget' + index] = value
        })
      }

      if (mesh.morphTargetDictionary && !morphsList[name]) {
        setMorphsList(name, mesh.morphTargetDictionary)
      }

      addGeometry(_group, geometry)
    },
    [addGeometry, key, morphsList, name, nodes, postfix, setMorphsList]
  )

  if (group) {
    const [first, second, third, fourth, fifth, sixth] =
      nameIndexGroups[key][index]

    if (first && first !== 'Empty') add(group + first, first)
    if (second) add(group + second, second)
    if (third) add(group + third, third)
    if (fourth) add(group + fourth, fourth)
    if (fifth) add(group + fifth, fifth)
    if (sixth) add(group + sixth, sixth)
  } else {
    add(src, name)
  }

  return null
}

export function AppendTexture({ name }) {
  const addTexture = useResources(selectorAddTexture)
  const texture = useTexture('/img/textures/' + name + '.png')

  texture.flipY = false

  addTexture(name, texture)

  return null
}
