import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from '@/styles/editor.module.css'

import Background from './index/background'

export default function Loading() {
  const router = useRouter()

  const t = router.locale === 'ru' ? 'Загрузка' : 'Loading'

  return (
    <div className={styles.loading + ' background-gradient'}>
      <Background />

      <div>
        <div>
          <Image
            src="/svg/The Fluffies logo.svg"
            alt="The Fluffies logo"
            width={256}
            height={104}
            draggable={false}
          />
        </div>

        <p>{t}...</p>
      </div>
    </div>
  )
}
