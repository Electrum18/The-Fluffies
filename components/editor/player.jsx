import Models from '@/configs/character.json'
import Materials from '@/configs/materials.json'

import {
  SingleModel,
  TexturedModel,
  OutlinedModel,
  OutlinedTexturedModel,
} from './models'

export default function Player(props) {
  return (
    <group rotation={[0, 0.7, 0]} {...props} dispose={null}>
      {Object.keys(Models).map((modelName) => {
        const { material, haveOutline } = Models[modelName]
        const { texture } = Materials[material]

        const modelProps = { key: modelName, name: modelName, material }

        if (haveOutline && texture) {
          return <OutlinedTexturedModel {...modelProps} texture={texture} />
        } else if (haveOutline) {
          return <OutlinedModel {...modelProps} />
        } else if (texture) {
          return <TexturedModel {...modelProps} />
        } else {
          return <SingleModel {...modelProps} />
        }
      })}
    </group>
  )
}
