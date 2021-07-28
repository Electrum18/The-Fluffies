import { useEffect, useState } from 'react'
import { Vector3 } from 'three'

export function useBonesArray(skeleton, bones) {
  const [bonesArr, setBonesArr] = useState([])
  const [skeletonBefore, setSkeletonBefore] = useState()

  useEffect(() => {
    if (
      skeleton.bones.length > 0 &&
      (!skeletonBefore || skeletonBefore.uuid !== skeleton.uuid)
    ) {
      setBonesArr(bones.map(bone => skeleton.getBoneByName(bone)))
      setSkeletonBefore(skeleton)
    }
  }, [bones, skeleton, skeletonBefore])

  return bonesArr
}

export function useBoneLengths(bonesArr, setHelperPos) {
  const [lengths, setLengths] = useState([])

  useEffect(() => {
    const bone = bonesArr[bonesArr.length - 1]

    if (bone) {
      const _lengths = []

      bonesArr.forEach((bone, index, array) => {
        if (index === array.length - 1) return

        const position = bone.getWorldPosition(new Vector3())
        const posTarget = array[index + 1].getWorldPosition(new Vector3())

        _lengths.push(position.distanceTo(posTarget))
      })

      setLengths(_lengths)
      setHelperPos(bone.getWorldPosition(new Vector3()))
    }
  }, [bonesArr, setHelperPos])

  return lengths
}
