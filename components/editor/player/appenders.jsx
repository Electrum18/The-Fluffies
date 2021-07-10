import { useGLTF, useTexture } from '@react-three/drei'
import shallow from 'zustand/shallow'

import useResources from '@/helpers/resources'
import useAnimations from '@/helpers/animations'

import { nameIndexGroups, nameInFileIndexes } from '@/libs/nameIndexes'

const selectorSkeletonAndGeometry = (store) => [
  store.skeleton,
  store.setSkeleton,
  store.addGeometry,
]

const selectorMorphsList = (store) => [store.morphsList, store.setMorphsList]
const selectorAddTexture = (store) => store.addTexture

export function AppendGeomtery({
  name,
  src,
  file: { group, key, postfix } = {},
}) {
  const [morphsList, setMorphsList] = useAnimations(selectorMorphsList, shallow)
  const [skeleton, setSkeleton, addGeometry] = useResources(
    selectorSkeletonAndGeometry,
    shallow
  )

  const index = key && nameInFileIndexes[key][name]

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
  const addTexture = useResources(selectorAddTexture)
  const texture = useTexture('/img/textures/' + name + '.png')

  texture.flipY = false

  addTexture(name, texture)

  return null
}
