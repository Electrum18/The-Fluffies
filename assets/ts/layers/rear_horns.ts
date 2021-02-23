import shortcuts from '~/assets/json/configs/shortcuts.json'
import { ILibrary, IShortcutsJSON } from '~/types/graphics'

const None = undefined

const { Color } = (shortcuts as unknown) as IShortcutsJSON

export default ({ Layer, VarElem, VarOutline }: ILibrary) => {
  return Layer(
    None,
    None,
    VarElem('horn', 'left', Color.hornRear),
    VarOutline('horn', 'left', Color.hornRearOutline),

    VarElem('horn', 'left_overlay', Color.hornRear),
    VarOutline('horn', 'left_overlay', Color.hornRearOutline),

    VarElem('horn', 'left_overlay_second', Color.hornRear),
    VarOutline('horn', 'left_overlay_second', Color.hornRearOutline),

    VarElem('horn', 'right', Color.hornRear),
    VarOutline('horn', 'right', Color.hornRearOutline),

    VarElem('horn', 'right_overlay', Color.hornRear),
    VarOutline('horn', 'right_overlay', Color.hornRearOutline),

    VarElem('horn', 'right_overlay_second', Color.hornRear),
    VarOutline('horn', 'right_overlay_second', Color.hornRearOutline)
  )
}
