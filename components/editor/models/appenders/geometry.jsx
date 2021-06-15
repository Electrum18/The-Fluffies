import { useGLTF } from '@react-three/drei'

import useGeometries from '@/helpers/geometries'

export function AppendGeomtery({ name, src, file: { group, key } = {} }) {
  const addGeometry = useGeometries((store) => store.addGeometry)
  const { nodes } = useGLTF(
    `/models/${group ? group + name : 'main'}.glb`,
    '/draco-gltf/'
  )

  addGeometry(src, (nodes[name] || nodes[name + '_' + key]).geometry)

  return null
}

export function AppendGeomteryOutlined({
  name,
  src,
  file: { group, key } = {},
}) {
  const addGeometry = useGeometries((store) => store.addGeometry)
  const { nodes } = useGLTF(
    `/models/${group ? group + name : 'main'}.glb`,
    '/draco-gltf/'
  )

  const [main, outline] = (nodes[name] || nodes[name + '_' + key]).children

  addGeometry(src, main.geometry)
  addGeometry(src + '_outline', outline.geometry)

  return null
}
