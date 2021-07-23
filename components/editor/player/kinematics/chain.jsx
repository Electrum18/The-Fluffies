import React, { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import { Vector3 } from 'three'

import useDragging from '@/hooks/dragging'

function Helper({ position, setter }) {
  const helper = useRef()

  useDragging(helper, () => setter(helper.current.position))

  return (
    <mesh ref={helper} position={position}>
      <octahedronGeometry args={[0.15]} />
      <meshBasicMaterial color={'orange'} />
    </mesh>
  )
}

export default function Chain({ skeleton, bones }) {
  const [bonesArr, setBonesArr] = useState([])
  const [lengths, setLengths] = useState([])

  const [helperPos, setHelperPos] = useState(() => new Vector3())
  const [skeletonBefore, setSkeletonBefore] = useState()

  useEffect(() => {
    if (
      skeleton.bones.length > 0 &&
      (!skeletonBefore || skeletonBefore.uuid !== skeleton.uuid)
    ) {
      console.log(skeleton)
      setBonesArr(bones.map((bone) => skeleton.getBoneByName(bone)))
      setSkeletonBefore(skeleton)
    }
  }, [bones, skeleton, skeletonBefore])

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
  }, [bonesArr])

  useFrame(() => {
    const globalPoses = bonesArr.map((bone) =>
      bone.getWorldPosition(new Vector3())
    )

    const inverses = bonesArr.map(() => new Vector3())

    for (let index = bonesArr.length - 2; index >= 0; index--) {
      const bone = bonesArr[index]
      const nextPos =
        index + 1 === bonesArr.length - 1 ? helperPos : inverses[index + 1]

      inverses[index].lerpVectors(
        nextPos,
        globalPoses[index],
        lengths[index] / globalPoses[index].distanceTo(nextPos)
      )

      bone.lookAt(nextPos)
      bone.rotateX(Math.PI / 2)
    }
  })

  return <Helper position={helperPos} setter={setHelperPos} />
}
