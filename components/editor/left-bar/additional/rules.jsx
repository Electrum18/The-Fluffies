import { useRouter } from 'next/router'

import ModalMini from '@/components/elements/modalMini'
import en from '@/locales/en/pages/editor/left-bar/additional/rules'
import ru from '@/locales/ru/pages/editor/left-bar/additional/rules'

export default function Rules() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <ModalMini title={t.title} page="Rules">
      <p className="w-64 mx-auto my-0 text-sm text-center text-white">
        {t.text}
      </p>

      <div className="flex flex-row p-2 my-2 bg-gray-700 border-2 border-red-500 rounded-lg space-x-2">
        <p className="text-2xl font-bold text-red-500 m-0.5"> 1 </p>
        <p className="w-64 text-sm font-bold text-white">{t.rule1}</p>
      </div>

      <div className="flex flex-row p-2 my-2 bg-gray-700 border-2 border-red-500 rounded-lg space-x-2">
        <p className="text-2xl font-bold text-red-500 m-0.5"> 2 </p>
        <p className="w-64 text-sm font-bold text-white">{t.rule2}</p>
      </div>

      <div className="flex flex-row p-2 my-2 bg-gray-700 border-2 border-red-500 rounded-lg space-x-2">
        <p className="text-2xl font-bold text-red-500 m-0.5"> 3 </p>
        <p className="w-64 text-sm font-bold text-white">{t.rule3}</p>
      </div>
    </ModalMini>
  )
}
