import Dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import Loading from '@/components/loading'
import SiteHead from '@/components/siteHead'
import useSocketConnection from '@/hooks/socket'
import useUserFetch from '@/hooks/user'
import en from '@/locales/en/pages/editor'
import ru from '@/locales/ru/pages/editor'

const Canvas = Dynamic(() => import('@/components/editor/world'), {
  ssr: false,
  loading: Loading
})

const LeftBar = Dynamic(() => import('@/components/editor/left-bar'), {
  ssr: false
})

const RightBar = Dynamic(() => import('@/components/editor/right-bar'), {
  ssr: false
})

export default function Editor() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden'
  }, [])

  useUserFetch()
  useSocketConnection()

  return (
    <>
      <SiteHead t={t} />

      <main>
        <Canvas />
        <LeftBar />
        <RightBar />
      </main>
    </>
  )
}
