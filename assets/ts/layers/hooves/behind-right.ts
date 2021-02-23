import shortcuts from '~/assets/json/configs/shortcuts.json'
import { ILibrary, IShortcutsJSON } from '~/types/graphics'

const None = undefined

const { Is, Angle, Color } = (shortcuts as unknown) as IShortcutsJSON

export default ({ Elem, Outline, Layer, VarElem, VarOutline }: ILibrary) => {
  return Layer(
    None,
    Angle.hooveBackRightThigh,
    Elem('hooves_right_behind_thigh', 'fur_basic'),
    Elem('stripes_hooves_right_behind_thigh', 'stripes_basic', Is.stripes),
    Outline('hooves_right_behind_thigh', 'fur_shade'),

    VarElem('pants', 'right_thigh', 'pants_basic'),
    VarOutline('pants', 'right_thigh', 'pants_shade'),

    Layer(
      None,
      Angle.hooveBackRightForearm,
      Elem('hooves_right_behind_forearm', 'fur_basic'),
      Outline('hooves_right_behind_forearm', 'fur_shade'),

      VarElem('pants', 'right_forearm', 'pants_basic'),
      VarOutline('pants', 'right_forearm', 'pants_shade'),

      Layer(
        None,
        Angle.hooveBackRightKnee,
        Elem('hooves_right_behind_tibia', Color.hooves),
        Elem('stripes_hooves_right_behind_tibia', 'stripes_basic', Is.stripes),
        Outline('hooves_right_behind_tibia', Color.hoovesOutline),

        VarElem('pants', 'right_tibia', 'pants_basic'),
        VarOutline('pants', 'right_tibia', 'pants_shade'),

        Layer(
          None,
          Angle.hooveBackRightFoot,
          Elem('hooves_right_behind_wrist', Color.hooves),
          Outline('hooves_right_behind_wrist', Color.hoovesOutline),

          VarElem('pants', 'right_wrist', 'pants_basic'),
          VarOutline('pants', 'right_wrist', 'pants_shade')
        )
      )
    )
  )
}
