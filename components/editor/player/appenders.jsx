import { useGLTF, useTexture } from '@react-three/drei'

import useResources from '@/helpers/resources'
import useParameters from '@/helpers/parameters'

import { nameIndexGroups } from '@/libs/nameIndexes'

export function AppendGeomtery({ name, src, file: { group, key } = {} }) {
  const addGeometry = useResources((store) => store.addGeometry)
  const indexes = useParameters((store) => store.nameIndexes)

  const index = indexes[key]

  const { nodes } = useGLTF(
    `/models/${group ? group + index : 'main'}.glb`,
    '/draco-gltf/'
  )

  function add(_group, _name) {
    addGeometry(_group, (nodes[_name] || nodes[_name + '_' + key]).geometry)
  }

  /*
  for (const node in nodes) {
    const element = nodes[node]

    if (element.morphTargetInfluences) console.log(node, element)
  }
  */

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
  const addTexture = useResources((store) => store.addTexture)
  const texture = useTexture('/img/textures/' + name + '.png')

  texture.flipY = false

  addTexture(name, texture)

  return null
}
