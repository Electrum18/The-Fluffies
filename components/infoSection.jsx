import Image from 'next/image'

export default function InfoSection({ children, src, alt, flip }) {
  return (
    <section>
      {flip ? (
        <>
          <div className='image-side'>
            <Image
              src={src}
              alt={alt}
              width={1024}
              height={1024}
              draggable={false}
            />
          </div>
          <div className='text-side'>{children}</div>
        </>
      ) : (
        <>
          <div className='text-side'>{children}</div>
          <div className='image-side'>
            <Image
              src={src}
              alt={alt}
              width={1024}
              height={1024}
              draggable={false}
            />
          </div>
        </>
      )}
    </section>
  )
}
