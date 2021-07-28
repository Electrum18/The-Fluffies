import React, { useEffect, useState } from 'react'
import { FaVideo } from 'react-icons/fa'
import shallow from 'zustand/shallow'

import ListButtons from '@/components/elements/listButtons'
import ListChips from '@/components/elements/listChips'
import ListDropdown from '@/components/elements/listDropdown'
import ListSquares from '@/components/elements/listSquares'
import useMenu from '@/helpers/menu'
import styles from '@/styles/menu.module.css'

import { LeftSection } from '../createSection'

function Icon({ className, onClick }) {
  return (
    <div onClick={onClick}>
      <FaVideo className={className} />
    </div>
  )
}

const selector = state => [state.page, state.closePages]

export default function TakeAnimationSection() {
  const [page, closePages] = useMenu(selector, shallow)

  const [translate, setTranslate] = useState(100)

  useEffect(() => {
    setTranslate(100 - +(page === 'TakeVideo') * 100)
  }, [page])

  return (
    <LeftSection name="TakeVideo" icon={Icon}>
      <div
        style={{ transform: `translateY(${translate}%)` }}
        className={styles.bottomMenu}
      >
        <div>
          <div />

          <ListDropdown
            label="Quality"
            list={['2160p', '1440p', '1080p', '720p', '420p']}
          />

          <ListDropdown label="FPS" list={[60, 30, 24, 15]} />

          <ListSquares
            label="Ratio"
            list={[
              { style: 'w-10 h-6 mx-1 my-3' },
              { style: 'w-6 h-10 mx-3 my-1' }
            ]}
          />

          <ListChips label="Format" list={['GIF']} />

          <div>
            <div className="px-4 py-2 text-white bg-gray-800 rounded-lg">
              <div className="flex flex-col">
                <span className="w-40">
                  Total time: <span className="text-primary">100.0s</span>
                </span>
                <span className="w-40">
                  Render time: <span className="text-primary">100.0s</span>
                </span>
              </div>
            </div>
          </div>

          <ListButtons
            list={[
              { text: 'Close', style: 'bg-gray-800', onClick: closePages },
              { text: 'Start', style: 'bg-primary' }
            ]}
          />

          <div />
        </div>
      </div>
    </LeftSection>
  )
}
