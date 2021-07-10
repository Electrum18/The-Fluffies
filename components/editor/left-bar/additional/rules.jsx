import ModalMini from '@/components/elements/modalMini'

export default function Rules() {
  return (
    <ModalMini title='Chat rules' page='Rules'>
      <p className='w-64 mx-auto my-0 text-sm text-center text-white'>
        The rules for using the chat are simple and must be followed
      </p>

      <div className='flex flex-row p-2 my-2 bg-gray-700 border-2 border-red-500 rounded-lg space-x-2'>
        <p className='text-2xl font-bold text-red-500 m-0.5'> 1 </p>
        <p className='w-64 text-sm font-bold text-white'>
          Any illegal topics of society and discussion of personality are
          prohibited
        </p>
      </div>

      <div className='flex flex-row p-2 my-2 bg-gray-700 border-2 border-red-500 rounded-lg space-x-2'>
        <p className='text-2xl font-bold text-red-500 m-0.5'> 2 </p>
        <p className='w-64 text-sm font-bold text-white'>
          Respect others, do not swear and do not insult
        </p>
      </div>

      <div className='flex flex-row p-2 my-2 bg-gray-700 border-2 border-red-500 rounded-lg space-x-2'>
        <p className='text-2xl font-bold text-red-500 m-0.5'> 3 </p>
        <p className='w-64 text-sm font-bold text-white'>
          Ignorance of the rules does not absolve from responsibility
        </p>
      </div>
    </ModalMini>
  )
}
