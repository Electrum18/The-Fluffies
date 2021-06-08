import Head from 'next/head'
import { useRouter } from 'next/router'
import Dynamic from 'next/dynamic'

import Customization from '@/components/editor/customization'

import Hairs from '@/configs/changeable/hairs.json'

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
        <Customization
          config={{
            fur_basic: {
              label: 'Fur color',
              type: 'color',
              shade: 'fur_shade',
            },
            hair_basic: {
              label: 'Hair color',
              type: 'color',
              shade: 'hair_shade',
            },
            hair_second: {
              label: 'Fur second color',
              type: 'color',
              shade: 'hair_second_shade',
            },
            eyelashes_basic: { label: 'Eyelashes color', type: 'color' },
            hair_name_en: { label: 'Hairs', type: 'value', list: Hairs },
          }}
        />
      </main>
    </>
  )
}
