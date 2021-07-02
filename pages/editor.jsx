import React, { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'
import Dynamic from 'next/dynamic'

import Customization from '@/components/editor/customization'
import Menu from '@/components/editor/menu'
import Pages from '@/components/editor/pages'

import useUserFetch from '@/hooks/user'

const Canvas = Dynamic(() => import('@/components/editor/world'), {
  ssr: false,
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
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Canvas />
        <Customization />
        <Menu />
        <Pages />
      </main>
    </>
  )
}
