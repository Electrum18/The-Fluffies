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

function Marker({ position }) {
  return (
    <mesh position={position}>
      <octahedronGeometry args={[0.1]} />
      <meshBasicMaterial color={'red'} />
    </mesh>
  )
}

function getBonePosition(bone) {
  const position = bone.getWorldPosition(new Vector3())

  return position.multiplyScalar(0.1).add(new Vector3(0, -3, 0))
}

export default function Chain({ skeleton, bones }) {
  const [bonesArr, setBonesArr] = useState([])
  const [inverses, setInverses] = useState([])
  const [lengths, setLengths] = useState([])

  const [helperPos, setHelperPos] = useState(() => new Vector3())
  const [skeletonBefore, setSkeletonBefore] = useState()

  useEffect(() => {
    if (!skeletonBefore || skeletonBefore.uuid !== skeleton.uuid) {
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

        _lengths.push(
          getBonePosition(bone).distanceTo(getBonePosition(array[index + 1]))
        )
      })

      setLengths(_lengths)
      setHelperPos(getBonePosition(bone))
    }
  }, [bonesArr])

  useFrame(() => {
    const globalPoses = bonesArr.map((bone) => getBonePosition(bone))
    const _inverses = bonesArr.map(() => new Vector3())

    setInverses(_inverses)

    for (let index = bonesArr.length - 2; index >= 0; index--) {
      const bone = bonesArr[index]
      const nextPos =
        index + 1 === bonesArr.length - 1 ? helperPos : _inverses[index + 1]

      _inverses[index].lerpVectors(
        nextPos,
        globalPoses[index],
        lengths[index] / globalPoses[index].distanceTo(nextPos)
      )

      bone.lookAt(nextPos)
      bone.rotateX(Math.PI / 2)
    }
  })

  //console.log(bonesArr)

  return (
    <>
      <Helper position={helperPos} setter={setHelperPos} />

      {inverses[0] && <Marker position={inverses[0]} />}
      {inverses[1] && <Marker position={inverses[1]} />}
      {inverses[2] && <Marker position={inverses[2]} />}
    </>
  )
}
