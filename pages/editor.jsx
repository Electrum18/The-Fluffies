import Head from 'next/head'
import { useRouter } from 'next/router'
import Dynamic from 'next/dynamic'

const Canvas = Dynamic(() => import('../components/editor/canvas'), {
  ssr: false,
})

export default function Editor() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Canvas />
      </main>
    </>
  )
}
