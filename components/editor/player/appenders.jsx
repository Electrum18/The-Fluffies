import { useGLTF, useTexture } from '@react-three/drei'
import shallow from 'zustand/shallow'

import useResources from '@/helpers/resources'
import useParameters from '@/helpers/parameters'
import useAnimations from '@/helpers/animations'

import { nameIndexGroups } from '@/libs/nameIndexes'

export function AppendGeomtery({
  name,
  src,
  file: { group, key, postfix } = {},
}) {
  const [skeleton, setSkeleton, addGeometry] = useResources(
    (store) => [store.skeleton, store.setSkeleton, store.addGeometry],
    shallow
  )

  const [morphsList, setMorphsList] = useAnimations(
    (store) => [store.morphsList, store.setMorphsList],
    shallow
  )

  const indexes = useParameters((store) => store.nameIndexes)

  const index = indexes[key]

  const { nodes } = useGLTF(
    `/models/${group ? group + index : 'main'}.glb`,
    '/draco-gltf/'
  )

  function add(_group, _name) {
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
  }

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
    if (!skeleton.bones && nodes.Armature) setSkeleton(nodes.Armature)

    add(src, name)
  }

  return null
}

export function AppendTexture({ name }) {
  const addTexture = useResources((store) => store.addTexture)
  const texture = useTexture('/img/textures/' + name + '.png')

  texture.flipY = false

  addTexture(name, texture)

  return null
}
