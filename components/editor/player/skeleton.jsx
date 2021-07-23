import React, { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import shallow from 'zustand/shallow'

import { Skeleton as CreateSkeleton } from 'three'

import useResources from '@/helpers/resources'

const selector = (state) => [
  state.skeleton,
  state.bones,
  state.setSkeleton,
  state.setBones,
]

function getAllBonesFromTree(bone) {
  const bonesList = []
  let mappedList = {}

  if (bone.type === 'Bone') {
    bonesList.push(bone)
    mappedList[bone.name] = bone
  }

  if (bone.children.length > 0) {
    for (const boneIn of bone.children) {
      const { list, map } = getAllBonesFromTree(boneIn)

      bonesList.push(...list)
      mappedList = { ...mappedList, ...map }
    }
  }

  return { list: bonesList, map: mappedList }
}

export default function Skeleton() {
  const { nodes } = useGLTF(`/models/Main.glb`, '/draco-gltf/')

  const [skeleton, bones, setSkeleton, setBones] = useResources(
    selector,
    shallow
  )

  const [boneTree, setBoneTree] = useState()

  useEffect(() => {
    setBoneTree(nodes.Pelvis.clone())
  }, [nodes.Pelvis])

  useEffect(() => {
    if (!bones.Pelvis && boneTree) {
      const { boneInverses } = nodes.Body.skeleton
      const { list, map } = getAllBonesFromTree(boneTree)

      setBones(map)
      setSkeleton(new CreateSkeleton(list, boneInverses))
    }
  }, [boneTree, bones, nodes.Body.skeleton, setBones, setSkeleton])

  useEffect(() => {
    if (skeleton.bones.length) {
      console.log(skeleton)
      skeleton.bones[0].lookAt(0, 1, 2)
    }
  }, [skeleton, skeleton.bones])

  useEffect(() => {
    if (bones.Chest) bones.Chest.lookAt(0, 1, 2)
  }, [bones.Chest])

  return boneTree ? <primitive object={boneTree} /> : null
}
