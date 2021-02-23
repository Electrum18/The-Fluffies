import shortcuts from '~/assets/json/configs/shortcuts.json'
import { ILibrary, IShortcutsJSON } from '~/types/graphics'

const None = undefined

const { Is, Angle, Color } = (shortcuts as unknown) as IShortcutsJSON

export default ({ Elem, Outline, Layer, VarElem, VarOutline }: ILibrary) => {
  return Layer(
    None,
    Angle.hooveBackLeftThigh,
    Elem('hooves_left_behind_thigh', 'fur_basic'),
    Elem('stripes_hooves_left_behind_thigh', 'stripes_basic', Is.stripes),
    Outline('hooves_left_behind_thigh', 'fur_shade'),

    VarElem('pants', 'left_thigh', 'pants_basic'),
    VarOutline('pants', 'left_thigh', 'pants_shade'),

    Layer(
      None,
      Angle.hooveBackLeftForearm,
      Elem('hooves_left_behind_forearm', 'fur_basic'),
      Outline('hooves_left_behind_forearm', 'fur_shade'),

      VarElem('pants', 'left_forearm', 'pants_basic'),
      VarOutline('pants', 'left_forearm', 'pants_shade'),

      Layer(
        None,
        Angle.hooveBackLeftKnee,
        Elem('hooves_left_behind_tibia', Color.hooves),
        Elem('stripes_hooves_left_behind_tibia', 'stripes_basic', Is.stripes),
        Outline('hooves_left_behind_tibia', Color.hoovesOutline),

        VarElem('pants', 'left_tibia', 'pants_basic'),
        VarOutline('pants', 'left_tibia', 'pants_shade'),

        Layer(
          None,
          Angle.hooveBackLeftFoot,
          Elem('hooves_left_behind_wrist', Color.hooves),
          Outline('hooves_left_behind_wrist', Color.hoovesOutline),

          VarElem('pants', 'left_wrist', 'pants_basic'),
          VarOutline('pants', 'left_wrist', 'pants_shade')
        )
      )
    )
  )
}
