import Image from 'next/image'

import cardStyles from '@/styles/cards.module.css'

export default function CardLittle({ children, src, alt }) {
  return (
    <div
      className={'w-1/3 mx-8 my-4 md:w-1/4 lg:w-1/5 ' + cardStyles.cardOutlined}
    >
      <div className="flex mx-12 mt-4 overflow-hidden rounded-full">
        <Image src={src} alt={alt} width={512} height={512} draggable={false} />
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
