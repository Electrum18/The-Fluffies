import create from 'zustand'
import { MeshBasicMaterial, MeshToonMaterial } from 'three'

import Materials from '@/configs/materials/list.json'

import {
  MeshBasicDoubleMaterial,
  MeshToonDoubleMaterial,
  MeshToonTransparentMaterial,
} from '@/libs/materials'

const materialsList = {
  basic: MeshBasicMaterial,
  toon: MeshToonMaterial,
  'double-basic': MeshBasicDoubleMaterial,
  'double-toon': MeshToonDoubleMaterial,
  'transparent-toon': MeshToonTransparentMaterial,
}

function createMaterials() {
  const materials = {}

  for (const key in Materials) {
    const { shader } = Materials[key]

    materials[key] = shader.match(/double-/)
      ? materialsList[shader]()
      : new materialsList[shader]()
  }

  return materials
}

const useMaterials = create((set) => ({
  materials: createMaterials(),
  light: {},
  ambientLight: {},

  setLight: (light) => set({ light }),
  setAmbientLight: (ambientLight) => set({ ambientLight }),
}))

export default useMaterials
