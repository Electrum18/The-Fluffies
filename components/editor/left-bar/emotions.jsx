import { useRouter } from 'next/router'

import en from '@/locales/en/pages/editor/left-bar/emotions'
import ru from '@/locales/ru/pages/editor/left-bar/emotions'

import Controls from '../createControls'
import { LeftSection } from '../createSection'

function Icon({ className, onClick }) {
  return (
    <div onClick={onClick}>
      <svg
        className={className}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 701 701"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M491 675a300 300 0 0075-58c56-58 87-136 87-218a332 332 0 00-3-50c27-29 43-66 48-102 13-64-15-233-101-247-55 3-73 83-75 141a290 290 0 00-342 7C178 89 161 3 104 0 18 14-10 183 3 247c6 40 25 80 56 110a324 324 0 00-2 42c0 82 31 160 87 218a300 300 0 0076 58s134 64 271 0zM192 245c42 0 78 47 92 114-14-23-34-38-56-38-41 0-74 51-74 115s33 115 74 115c13 0 24-5 34-13-18 33-43 53-70 53-54 0-98-78-98-174s44-172 98-172zm162 373h1c33-1 66-9 93-24 0 0-17 73-94 72s-93-72-93-72c26 15 60 23 93 23v1zm93-80c10 8 21 13 33 13 41 0 75-52 75-115s-34-115-75-115c-22 0-42 15-55 38 13-67 50-114 92-114 54 0 98 76 98 172s-44 174-98 174c-28 0-53-20-70-53z" />
      </svg>
    </div>
  )
}

export default function EmotionsSection() {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return (
    <LeftSection name="Emotions" icon={Icon}>
      <Controls
        title={t.emotions.title}
        data={{
          [t.emotions.open]: { value: 'jaw_open', min: 1, max: 100 },
          [t.emotions.happy]: { value: 'jaw_happy', min: 1, max: 100 },
          [t.emotions.sad]: { value: 'jaw_sad', min: 1, max: 100 },
          [t.emotions.surprised]: { value: 'jaw_surprised', min: 1, max: 100 },
          [t.emotions.nya]: { value: 'jaw_cat', min: 1, max: 100 }
        }}
      />

      <Controls
        title={t.tongue.title}
        data={{
          [t.tongue.raised]: { value: 'tongue_raised', min: 1, max: 100 },
          [t.tongue.out]: { value: 'tongue_out', min: 1, max: 100 }
        }}
      />

      <Controls
        title={t.eyes.title}
        data={{
          [t.eyes.scale]: {
            value: 'eyes_iris_scale',
            min: 50,
            max: 125,
            step: 1
          },

          [t.eyes.horizontal]: {
            value: 'eyes_position_horiz',
            min: -100,
            max: 100
          },

          [t.eyes.vertical]: {
            value: 'eyes_position_verti',
            min: -100,
            max: 100
          }
        }}
      />

      <Controls
        title={t.eyelids.title}
        data={{
          [t.eyelids.upper]: { value: 'eyes_eyelids_up', min: 1, max: 100 },
          [t.eyelids.lower]: { value: 'eyes_eyelids_down', min: 1, max: 100 },
          [t.eyelids.angry]: { value: 'eyes_eyelids_angry', min: 1, max: 100 },
          [t.eyelids.sad]: { value: 'eyes_eyelids_sad', min: 1, max: 100 }
        }}
      />
    </LeftSection>
  )
}
