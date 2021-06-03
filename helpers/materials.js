import create from 'zustand'
import { MeshBasicMaterial, MeshToonMaterial } from 'three'

import Materials from '@/configs/materials.json'

const materialsList = {
  toon: MeshToonMaterial,
  basic: MeshBasicMaterial,
}

function createMaterials() {
  const materials = {}

  for (const key in Materials) {
    const { shader } = Materials[key]

    materials[key] = new materialsList[shader]()
  }

  return materials
}

const useMaterials = create((set) => ({
  materials: createMaterials(),
}))

console.log(MeshBasicMaterial)

export default useMaterials
