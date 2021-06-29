import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  FaCamera,
  FaCommentDots,
  FaFile,
  FaFileVideo,
  FaFilm,
  FaLightbulb,
  FaSignOutAlt,
  FaUserCircle,
  FaUsers,
  FaVideo,
} from 'react-icons/fa'

function EmotionIcon({ className }) {
  return (
    <svg
      className={className}
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 701 701'
      height='1em'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M491 675a300 300 0 0075-58c56-58 87-136 87-218a332 332 0 00-3-50c27-29 43-66 48-102 13-64-15-233-101-247-55 3-73 83-75 141a290 290 0 00-342 7C178 89 161 3 104 0 18 14-10 183 3 247c6 40 25 80 56 110a324 324 0 00-2 42c0 82 31 160 87 218a300 300 0 0076 58s134 64 271 0zM192 245c42 0 78 47 92 114-14-23-34-38-56-38-41 0-74 51-74 115s33 115 74 115c13 0 24-5 34-13-18 33-43 53-70 53-54 0-98-78-98-174s44-172 98-172zm162 373h1c33-1 66-9 93-24 0 0-17 73-94 72s-93-72-93-72c26 15 60 23 93 23v1zm93-80c10 8 21 13 33 13 41 0 75-52 75-115s-34-115-75-115c-22 0-42 15-55 38 13-67 50-114 92-114 54 0 98 76 98 172s-44 174-98 174c-28 0-53-20-70-53z' />
    </svg>
  )
}

function LevelIcon() {
  return (
    <div className='w-8 h-8 -m-1 text-lg text-center text-white border-2 border-blue-400 rounded-full'>
      1
    </div>
  )
}

function Home() {
  return (
    <Link href='/'>
      <a className='text-white'>
        <FaSignOutAlt />
      </a>
    </Link>
  )
}

function LangIcon() {
  const router = useRouter()

  const locale = router.locale === 'ru' ? 'en' : 'ru'

  return (
    <Link href={router.route} locale={locale} scroll={false}>
      <a className='p-2 text-lg text-center text-white -ml-1.5'>{locale}</a>
    </Link>
  )
}

const elementsList = [
  { icon: Home, pageName: 'Home' },
  { icon: 'divider' },
  { icon: EmotionIcon, pageName: 'Emotions' },
  { icon: FaLightbulb, pageName: 'Environment' },
  { icon: FaFilm, pageName: 'Animation' },
  { icon: 'divider' },
  { icon: FaCamera, pageName: 'TakePhoto' },
  { icon: FaVideo, pageName: 'TakeVideo' },
  { icon: 'divider' },
  { icon: FaFile, pageName: 'SavePerson' },
  { icon: FaFileVideo, pageName: 'SaveAnimation' },
  { icon: 'divider' },
  { icon: 'spacer' },
  { icon: LangIcon, pageName: 'Language' },
  { icon: 'divider' },
  { icon: LevelIcon, pageName: 'Level' },
  { icon: FaUserCircle, pageName: 'Profile' },
  { icon: 'divider' },
  { icon: FaUsers, pageName: 'Social' },
  { icon: FaCommentDots, pageName: 'Chat' },
]

export default elementsList
