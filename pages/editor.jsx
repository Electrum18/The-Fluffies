import Dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import LeftBar from '@/components/editor/left-bar'
import RightBar from '@/components/editor/right-bar'
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
