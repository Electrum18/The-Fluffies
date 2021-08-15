import Image from 'next/image'

export default function Background() {
  return (
    <>
      <div className="absolute top-0 left-0 flex pointer-events-none max-w-vmin">
        <Image
          src="/svg/blob up.svg"
          alt="upper blob background"
          width={1282}
          height={472}
          draggable={false}
        />
      </div>

      <div className="absolute bottom-0 right-0 hidden pointer-events-none md:flex max-w-vmin">
        <Image
          src="/svg/blob down.svg"
          alt="lower blob background"
          width={1418}
          height={513}
          draggable={false}
        />
      </div>
    </>
  )
}
