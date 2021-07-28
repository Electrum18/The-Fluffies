import Dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import LeftBar from '@/components/editor/left-bar'
import PoseButton from '@/components/editor/poseButton'
import RightBar from '@/components/editor/right-bar'
import useUserFetch from '@/hooks/user'

const Canvas = Dynamic(() => import('@/components/editor/world'), {
  ssr: false
})

export default function Editor() {
  const router = useRouter()

  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden'
  }, [])

  useUserFetch()

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Canvas />
        <LeftBar />
        <RightBar />
        <PoseButton />
      </main>
    </>
  )
}
