import React, { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import { Vector3 } from 'three'

import useDragging from '@/hooks/dragging'
import { useBoneLengths, useBonesArray } from '@/hooks/bones'

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

export default function Chain({ skeleton, bones, setUp = [0, 1, 0] }) {
  const [helperPos, setHelperPos] = useState(() => new Vector3())

  const bonesArr = useBonesArray(skeleton, bones)
  const lengths = useBoneLengths(bonesArr, setHelperPos)

  useEffect(() => {
    const vector = new Vector3(...setUp)

    for (const bone of bonesArr) {
      bone.up = vector
    }
  }, [bonesArr, setUp])

  useFrame(() => {
    const globalPoses = bonesArr.map((bone) =>
      bone.getWorldPosition(new Vector3())
    )

    const inverses = bonesArr.map(() => new Vector3())

    // Inverse kinematics coordinates

    for (let index = inverses.length - 2; index >= 0; index--) {
      if (index === 0) continue

      const nextPos =
        index + 1 === bonesArr.length - 1 ? helperPos : inverses[index + 1]

      inverses[index].lerpVectors(
        nextPos,
        globalPoses[index],
        lengths[index] / globalPoses[index].distanceTo(nextPos)
      )
    }

    // Forward kinematics (FABRIK)

    const length = inverses.length - 1

    for (let index = 0; index < length; index++) {
      if (index === length) continue

      const next = index + 1
      const bone = bonesArr[index]
      const inverse = next === length ? helperPos : inverses[next]

      bone.lookAt(inverse)
      bone.rotateX(Math.PI / 2)
    }
  })

  return <Helper position={helperPos} setter={setHelperPos} />
}
