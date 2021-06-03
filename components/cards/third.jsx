import Image from 'next/image'

export default function CardThird({ children, icon, src, alt }) {
  const hasImageData = src && alt
  const hasImageStyle = hasImageData
    ? 'w-full background-gradient rounded-t-xl'
    : 'w-full'

  return (
    <div className='card-third'>
      <div className={hasImageStyle}>
        <div className='inline-block w-full icon-upper'>{icon}</div>

        {hasImageData && (
          <div className='flex w-1/2 mx-auto'>
            <Image
              src={src}
              alt={alt}
              width={512}
              height={512}
              draggable={false}
            />
          </div>
        )}
      </div>
      <div className='p-4'>{children}</div>
    </div>
  )
}
