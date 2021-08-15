import { useRouter } from 'next/router'
import { FaHeart } from 'react-icons/fa'

import ModalMini from '@/components/elements/modalMini'
import en from '@/locales/en/pages/editor/left-bar/additional/notice'
import ru from '@/locales/ru/pages/editor/left-bar/additional/notice'

export default function Notice() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <ModalMini title={t.title} page="Notice">
      <p className="w-64 mx-auto my-0 text-sm text-center text-white">
        {t.welcome}
      </p>

      <p className="w-64 mx-auto my-2 text-sm text-center text-white">
        {t.text}
      </p>

      <div className="flex flex-row p-2 my-2 bg-gray-700 border-2 border-gray-600 rounded-lg space-x-2">
        <p className="my-2 text-2xl font-bold text-red-500 mx-0.5">
          <FaHeart />
        </p>

        <p className="w-64 text-sm font-bold text-white">{t.thanks}</p>
      </div>
    </ModalMini>
  )
}
