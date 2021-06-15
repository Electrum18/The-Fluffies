import { useTexture } from '@react-three/drei'

import useTextures from '@/helpers/textures'

export default function AppendTexture({ name }) {
  const addTexture = useTextures((store) => store.addTexture)
  const texture = useTexture('/img/textures/' + name + '.png')

  texture.flipY = false

  addTexture(name, texture)

  return null
}
