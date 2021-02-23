import shortcuts from '~/assets/json/configs/shortcuts.json'
import { ILibrary, IShortcutsJSON } from '~/types/graphics'

const None = undefined

const { Is, Pos, Angle, Color, Masking } = (shortcuts as unknown) as IShortcutsJSON

export default ({ Elem, Mask, Outline, Layer, VarElem, VarOutline }: ILibrary) => {
  return Layer(
    None,
    Angle.head,
    Layer(
      Pos.horiz,
      None,
      Elem('freckles_nose', 'freckles_basic', ['freckles_nose']),

      Elem('eye_left', 'eyes_sclera', None, 'head_mask', true)
    ),

    Layer(
      [Pos.eyeLeft, 'eyeLeft'],
      None,
      Elem('eye_left_iris', 'eyes_left_basic', None, Masking.eyeLeft),
      Elem('eye_left_pupil', 'eyes_pupil', None, Masking.eyeLeft)
    ),

    Layer(
      Pos.horiz,
      None,
      Elem('eye_left_flare', 'white', None, Masking.eyeLeft),
      Elem('eye_left_lid_up', 'fur_basic', None, 'head_mask'),
      Elem('eye_left_lid_down', 'fur_basic', None, 'head_mask'),
      Elem('eye_left_lashes', Color.eyelashes, None, 'head_mask'),

      VarElem('glasses', 'left', 'glasses_lenses'),
      VarOutline('glasses', 'left', 'glasses_frame')
    ),

    Layer(None, None, Elem('nose', Color.furSecond), Mask('nose')),

    Layer(
      Pos.horiz,
      None,
      Elem('mouth_inner', 'jaw_basic'),
      Mask('mouth_inner'),

      Elem('tongue', 'tongue_basic', None, 'mouth_inner'),

      Elem('teeth_lower', 'white', Is.teeth, 'mouth_inner'),
      Outline('teeth_lower', 'light_gray', Is.teeth, 'mouth_inner'),
      Elem('teeth_upper', 'white', Is.teeth, 'mouth_inner'),
      Outline('teeth_upper', 'light_gray', Is.teeth, 'mouth_inner'),

      Elem('teeth_sharp_lower', 'white', Is.teethSharp, 'mouth_inner'),
      Outline('teeth_sharp_lower', 'light_gray', Is.teethSharp, 'mouth_inner'),
      Elem('teeth_sharp_upper', 'white', Is.teethSharp, 'mouth_inner'),
      Outline('teeth_sharp_upper', 'light_gray', Is.teethSharp, 'mouth_inner'),

      Outline('mouth_lower', Color.furSecondOutline, None, 'nose')
    ),

    Layer(None, None, Elem('chin_lower', Color.furSecondOutline)),

    Layer(
      Pos.horiz,
      None,
      Elem('fangs', 'white', Is.fangs),

      Elem('mouth_fill', Color.furSecond, None, 'nose'),
      Elem('mouth', Color.furSecond),
      Outline('mouth', Color.furSecondOutline, None, 'nose')
    ),

    Layer(None, None, Elem('chin_upper', Color.furSecondOutline)),

    Layer(
      Pos.horiz,
      None,
      Elem('nostrils', Color.furSecondOutline, None, 'nose'),
      Elem('bridge', Color.furSecondOutline),

      Elem('nose_point', 'canine_nose_basic', ['canine_nose_enable']),
      Outline('nose_point', 'canine_nose_shade', ['canine_nose_enable']),

      Elem('fluff_cheek_right', Color.furSecond, ['fluff_cheeks']),
      Outline('fluff_cheek_right', Color.furSecondOutline, ['fluff_cheeks']),

      Elem('eye_right', 'eyes_sclera'),
      Mask('eye_right')
    ),

    Layer(
      Pos.eyeRight,
      None,
      Elem('eye_right_iris', 'eyes_right_basic', None, 'eye_right'),
      Elem('eye_right_pupil', 'eyes_pupil', None, 'eye_right')
    ),

    Layer(
      Pos.horiz,
      None,
      Elem('eye_right_flare', 'white', None, 'eye_right'),
      Elem('eye_right_lid_up', 'fur_basic'),
      Elem('eye_right_lid_down', 'fur_basic'),
      Elem('eye_right_lashes', Color.eyelashes),

      VarOutline('glasses', 'nose', 'glasses_frame'),
      VarElem('glasses', 'right', 'glasses_lenses'),
      VarOutline('glasses', 'right', 'glasses_frame')
    ),

    Layer(
      None,
      None,
      VarElem('hair', 'front', Color.hair, None, Masking.earRight),
      VarOutline('hair', 'front', Color.hairOutline, None, Masking.earRight),

      VarElem('horn_front', 'fill', Color.horn),
      VarOutline('horn_front', '', Color.hornOutline)
    )
  )
}
