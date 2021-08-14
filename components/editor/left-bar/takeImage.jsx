import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaCamera } from 'react-icons/fa'

import Modal from '@/components/elements/modal'
import useMenu from '@/helpers/menu'
import useParameters from '@/helpers/parameters'
import { getSaveValueInner } from '@/libs/saves'
import en from '@/locales/en/pages/editor/left-bar/takeImage'
import ru from '@/locales/ru/pages/editor/left-bar/takeImage'
import styles from '@/styles/elements.module.css'

import { LeftSection } from '../createSection'

const selector = state => state.closePages
const selectorName = state => getSaveValueInner(state, 'names', 'name')

function Icon({ className, onClick }) {
  return (
    <div onClick={onClick}>
      <FaCamera className={className} />
    </div>
  )
}

export default function TakeImageSection() {
  const router = useRouter()

  const closePages = useMenu(selector)
  const name = useParameters(selectorName)

  const [image, setImage] = useState('')

  const t = router.locale === 'ru' ? ru : en

  return (
    <LeftSection name="TakePhoto" icon={Icon}>
      <Modal
        title={t.title}
        page="TakePhoto"
        onOpen={() =>
          setImage(document.querySelector('canvas').toDataURL('image/png'))
        }
        onClose={() => setImage('')}
      >
        <div className="w-64 h-48 bg-gray-600 rounded-lg md:w-96">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={t.title} className="h-full mx-auto" />
        </div>

        <div className="flex flex-row justify-center text-white">
          <button
            onClick={closePages}
            className={styles.buttonLittle + ' mt-2 mr-2'}
          >
            {t.close}
          </button>

          <a
            download={name + ' - The Fluffies.png'}
            href={image}
            className={styles.buttonLittle + ' mt-2'}
          >
            {t.download}
          </a>
        </div>
      </Modal>
    </LeftSection>
  )
}
