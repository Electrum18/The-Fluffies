import { useGLTF, useTexture } from '@react-three/drei'

import useResources from '@/helpers/resources'

export function AppendGeomtery({ name, src, file: { group, key } = {} }) {
  const addGeometry = useResources((store) => store.addGeometry)
  const { nodes } = useGLTF(
    `/models/${group ? group + name : 'main'}.glb`,
    '/draco-gltf/'
  )

  for (const node in nodes) {
    const element = nodes[node]

    if (element.morphTargetInfluences) console.log(element)
  }

  const model = nodes[name] || nodes[name + '_' + key]

  addGeometry(src, model.geometry || model.children[0].geometry)

  return null
}

export function AppendTexture({ name }) {
  const addTexture = useResources((store) => store.addTexture)
  const texture = useTexture('/img/textures/' + name + '.png')

  texture.flipY = false

  addTexture(name, texture)

  return null
}
