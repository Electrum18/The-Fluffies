import Image from 'next/image'

function Patrons({ patrons }) {
  return (
    <div className='flex w-full p-2 overflow-x-scroll overflow-y-hidden bg-gray-200 shadow-inner flex-nowrap'>
      {patrons.map(({ nickname, tier }) => (
        <div
          key={((Math.random() * 1000) | 0) + ''}
          className='flex flex-shrink-0 p-3 m-2 bg-white shadow-md rounded-md transition-transform transform-gpu hover:scale-110'
        >
          <div className='flex-shrink-0 rounded-md'>
            <Image
              src='/8344290.png'
              alt={nickname + 'a patron'}
              width='48'
              height='48'
            />
          </div>
          <div className='flex flex-col justify-between px-3'>
            <p className='w-32 my-0 text-lg font-bold truncate'>{nickname}</p>
            <p className='my-0 text-sm uppercase'>{tier}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Patrons
