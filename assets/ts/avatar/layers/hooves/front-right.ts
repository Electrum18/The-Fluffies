import shortcuts from '~/assets/json/configs/shortcuts.json'
import { ILibrary, IShortcutsJSON } from '~/types/graphics'

const None = undefined

const { Is, Angle, Color } = (shortcuts as unknown) as IShortcutsJSON

export default ({ Elem, Outline, Layer, VarElem, VarOutline }: ILibrary) => {
  return Layer(
    None,
    Angle.hooveFrontRightShoulder,
    Elem('hooves_right_front_forearm', 'fur_basic'),
    Elem('stripes_hooves_right_front_forearm', 'stripes_basic', Is.stripes),
    Outline('hooves_right_front_forearm', 'fur_shade'),

    VarElem('clothing', 'right_forearm', 'clothing_basic'),
    VarOutline('clothing', 'right_forearm', 'clothing_shade'),

    Layer(
      None,
      Angle.hooveFrontRightElbow,
      Elem('hooves_right_front_tibia', Color.hooves),
      Elem('stripes_hooves_right_front_tibia', 'stripes_basic', Is.stripes),
      Outline('hooves_right_front_tibia', Color.hoovesOutline),

      VarElem('clothing', 'right_tibia', 'clothing_basic'),
      VarOutline('clothing', 'right_tibia', 'clothing_shade'),

      Layer(
        None,
        Angle.hooveFrontRightWrist,
        Elem('hooves_right_front_wrist', Color.hooves),
        Outline('hooves_right_front_wrist', Color.hoovesOutline),

        VarElem('clothing', 'right_wrist', 'clothing_basic'),
        VarOutline('clothing', 'right_wrist', 'clothing_shade')
      )
    )
  )
}
