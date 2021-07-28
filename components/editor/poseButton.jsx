import shallow from 'zustand/shallow'

import useAnimations from '@/helpers/animations'
import stylesEditor from '@/styles/editor.module.css'
import styles from '@/styles/elements.module.css'

const selector = state => [state.poseEditing, state.setPoseEditing]

export default function PoseButton() {
  const [poseEditing, setPoseEditing] = useAnimations(selector, shallow)

  const style = poseEditing
    ? 'text-primary top-1 ' + stylesEditor.selected
    : 'text-white top-2'

  return (
    <button
      className={
        style + ' ' + styles.buttonLittle + ' absolute right-20 md:right-28'
      }
      onClick={() => setPoseEditing(!poseEditing)}
    >
      Pose
    </button>
  )
}
