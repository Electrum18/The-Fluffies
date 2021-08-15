import Image from 'next/image'

import styles from '@/styles/index.module.css'

export default function Patrons({ patrons }) {
  return (
    <div className={styles.patrons}>
      {patrons.map(({ nickname, tier, placeholder }) => (
        <div key={((Math.random() * 1000) | 0) + ''}>
          <div>
            <Image
              src="/img/patreon.png"
              alt={placeholder ? 'become patron' : nickname + ' a patron'}
              width="48"
              height="48"
            />
          </div>

          <div>
            <p>{nickname}</p>
            <p>{tier}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
