import React, { Children, cloneElement } from 'react'

import useResources from '@/helpers/resources'

const selectorSkeleton = state => state.skeleton

export default function IK({ children }) {
  const skeleton = useResources(selectorSkeleton)

  if (skeleton.bones.length < 1) return null

  return (
    <>
      {Children.map(children, child =>
        cloneElement(child, { skeleton, ...child.props })
      )}
    </>
  )
}
