import ModalMini from '@/components/elements/modalMini'

export default function LevelModal() {
  return (
    <ModalMini title='Your level' page='Level'>
      <div className='flex flex-col pb-4'>
        <div className='w-16 h-16 py-3 mx-auto text-2xl text-center text-white border-2 border-blue-400 rounded-full'>
          1
        </div>

        <p className='px-2 pt-2 mx-auto text-sm text-center text-white'>
          Keep logging in every day <br /> to level up, share your <br />
          achievements with your friends!
        </p>
      </div>
    </ModalMini>
  )
}
