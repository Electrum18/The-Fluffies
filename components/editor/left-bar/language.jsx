import Link from 'next/link'
import { useRouter } from 'next/router'

import { LeftSection } from '../createSection'

function Icon() {
  const router = useRouter()

  const locale = router.locale === 'ru' ? 'en' : 'ru'

  return (
    <div>
      <Link href={router.route} locale={locale} scroll={false}>
        <a className='p-2 text-lg text-center text-white -ml-1.5'>{locale}</a>
      </Link>
    </div>
  )
}

export default function LanguageSection() {
  return <LeftSection name='Language' icon={Icon} />
}
