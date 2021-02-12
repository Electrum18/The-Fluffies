import shortcuts from '~/assets/json/configs/shortcuts.json'
import { ILibrary, IShortcutsJSON } from '~/types/graphics'

const None = undefined

const { Is, Angle, Color } = (shortcuts as unknown) as IShortcutsJSON

export default ({ Elem, Outline, Layer, VarElem, VarOutline }: ILibrary) => {
  return Layer(
    None,
    Angle.hooveFrontLeftShoulder,
    Elem('hooves_left_front_forearm', 'fur_basic'),
    Elem('stripes_hooves_left_front_forearm', 'stripes_basic', Is.stripes),
    Outline('hooves_left_front_forearm', 'fur_shade'),

    VarElem('clothing', 'left_forearm', 'clothing_basic'),
    VarOutline('clothing', 'left_forearm', 'clothing_shade'),

    Layer(
      None,
      Angle.hooveFrontLeftElbow,
      Elem('hooves_left_front_tibia', Color.hooves),
      Elem('stripes_hooves_left_front_tibia', 'stripes_basic', Is.stripes),
      Outline('hooves_left_front_tibia', Color.hoovesOutline),

      VarElem('clothing', 'left_tibia', 'clothing_basic'),
      VarOutline('clothing', 'left_tibia', 'clothing_shade'),

      Layer(
        None,
        Angle.hooveFrontLeftWrist,
        Elem('hooves_left_front_wrist', Color.hooves),
        Outline('hooves_left_front_wrist', Color.hoovesOutline),

        VarElem('clothing', 'left_wrist', 'clothing_basic'),
        VarOutline('clothing', 'left_wrist', 'clothing_shade')
      )
    )
  )
}
