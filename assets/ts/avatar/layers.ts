/* eslint-disable camelcase */

import layers from './graphics'
import createOrigins from './computeOrigins'

import { IProperties, ICalculated } from "~/types/paths"
import { IColor, IColors, IWind, IWindPropers, IDrawProps, IMirror, TPosition, TAngle } from "~/types/graphics"
import { IObject } from '~/types/basic'

interface IPositionsConfig {
  [index: string]: TPosition
}

interface IRotateConfig {
  [index: string]: TAngle
}

interface IStrokeConfig {
  [index: string]: [number, IColor | undefined]
}

function shortcuts(
  horiz: number,
  angle: number,
  quality: number,
  mirror: IMirror,

  { wings_second_color }: IObject,
  { eyes_position_horiz, eyes_position_verti, eyes_focus }: IProperties,
  { fur_shade, wings_shade, piercings_shade, horn_rear_shade, hair_basic, hair_shade }: IColors
) {
  const eyesPos = [
    (eyes_position_horiz / 3) * quality * (mirror ? -1 : 1),
    (-horiz * 20 - eyes_position_verti / 3) * quality
  ]

  const Positions: IPositionsConfig = {
    empty: undefined,
    zero: [0, 0],
    head: [0, -horiz * 20 * quality],
    head2: [0, horiz * 10 * quality],
    cheeks: [0, -horiz * 10 * quality],
    eye_left: [-(eyes_focus / 3) * quality + eyesPos[0], eyesPos[1]],
    eye_right: [(eyes_focus / 3) * quality + eyesPos[0], eyesPos[1]]
  }

  const Rotate: IRotateConfig = {
    empty: undefined,
    head: [angle, [0, 0]],
    cheeks: [angle / 2, [0, 0]]
  }

  const Stroke: IStrokeConfig = {
    fur: [12, fur_shade],
    wing: [12, wings_second_color ? wings_shade : fur_shade],
    piercing: [7, piercings_shade],
    horn: [12, horn_rear_shade],
    hair: [12, hair_shade],
    dreads: [20, hair_basic],
    dreads_tint: [45, hair_shade]
  }

  const Clip: any = {
    eye_left: ['eye_left', Positions.eye_left],
    eye_right: ['eye_right', Positions.eye_right],
    head2: ['head2', Positions.head]
  }

  return { Positions, Rotate, Stroke, Clip }
}

interface IModule {
  ctx: CanvasRenderingContext2D
  quality: number
  properties: IProperties
  globals: IDrawProps
  getColor: IColors
  horiz: number
  mirror: IMirror
  angle: number
  wind: IWind
  windPropers: IWindPropers
  position: IObject
}

export default function(
  { ctx, quality, properties, globals, getColor, horiz, mirror, angle, wind, windPropers, position }: IModule,

  calculated: ICalculated,
  absAngle: number
) {
  const { Layer, Elem } = layers(ctx, quality, globals, mirror, absAngle, calculated, wind, windPropers, position)
  const { Positions, Rotate, Stroke, Clip } = shortcuts(
    horiz,
    angle,
    quality,
    mirror,
    globals,
    properties,
    getColor
  )

  const origins = createOrigins(absAngle)

  const {
    male,
    wings_enable,
    wings_bat,
    tassels,
    fluff_ears,
    piercings_left_upper: piercingLUpper,
    piercings_left_middle: piercingLMiddle,
    piercings_left_lower: piercingLLower,
    piercings_right_upper: piercingRUpper,
    piercings_right_middle: piercingRMiddle,
    piercings_right_lower: piercingRLower,
    horn_rear,
    hair_dreads,
    hair_second,
    tail_dreads,
    tail_name_en,
    fur_second_color,
    stripes_enable,
    fluff_chest,
    fluff_cheeks,
    glasses_enable,
    eyes_brows_show,
    canine_nose_enable,
    fangs,
    horn_enable,
    horn_changeling,
    collar_enable,
    bowtie_enable,
    eyes_brows_color,
    wings_second_color,
    ear_second_color,
    hooves_second_color,
    sharp_teeth
  } = globals as IObject

  const {
    wings_basic,
    fur_basic,
    fur_second_basic,
    fur_shade,
    piercings_basic,
    horn_rear_basic,
    hair_basic,
    hair_second: hair_second_color,
    stripes_basic,
    fur_SECOND,
    fur_SECOND_SHADE,
    eyes_sclera,
    eyes_left_basic,
    eyes_right_basic,
    eyes_pupil,
    glasses_lenses,
    glasses_frame,
    jaw_basic,
    tongue_basic,
    tongue_shade,
    canine_nose_basic,
    canine_nose_shade,
    collar_basic,
    collar_shade,
    bowtie_basic,
    bowtie_shade,
    brows,
    ear_basic,
    ear_shade,
    hooves_second_basic,
    hooves_second_shade
  } = getColor

  const {
    hooves_FRONT_LEFT_SHOULDER_ANGLE: shoulderLAngle,
    hooves_FRONT_LEFT_ELBOW_ANGLE: elbowLAngle,
    hooves_FRONT_LEFT_WRIST_ANGLE: wristLAngle,

    hooves_FRONT_RIGHT_SHOULDER_ANGLE: shoulderRAngle,
    hooves_FRONT_RIGHT_ELBOW_ANGLE: elbowRAngle,
    hooves_FRONT_RIGHT_WRIST_ANGLE: wristRAngle,

    hooves_BACK_LEFT_THIGH_ANGLE: thighLAngle,
    hooves_BACK_LEFT_FOREARM_ANGLE: forearmLAngle,
    hooves_BACK_LEFT_KNEE_ANGLE: kneeLAngle,
    hooves_BACK_LEFT_FOOT_ANGLE: footLAngle,

    hooves_BACK_RIGHT_THIGH_ANGLE: thighRAngle,
    hooves_BACK_RIGHT_FOREARM_ANGLE: forearmRAngle,
    hooves_BACK_RIGHT_KNEE_ANGLE: kneeRAngle,
    hooves_BACK_RIGHT_FOOT_ANGLE: footRAngle,

    eyes_BROWS_LEFT_WIDTH: browsLWidth,
    eyes_BROWS_RIGHT_WIDTH: browsRWidth
  } = properties

  const transparent = undefined

  const brows_color = eyes_brows_color ? brows : '#222'

  const wings_color_second = wings_second_color ? wings_basic : fur_basic

  const ears_color = ear_second_color ? ear_basic : fur_basic
  const ears_color_shade = ear_second_color ? ear_shade : fur_shade

  const hooves_color = hooves_second_color ? hooves_second_basic : fur_basic
  const hooves_color_shade = hooves_second_color ? hooves_second_shade : fur_shade

  let height

  // Declaration of layers

  // Rear

  Layer(Positions.empty, Rotate.empty, () => {
    Elem('pelvis', transparent, Stroke.fur)
  })

  // ---------------------------------------------------------------------------

  // Tail of body

  Layer(Positions.empty, Rotate.empty, () => {
    if (tail_dreads) {
      Elem('body_tail', transparent, Stroke.dreads_tint)
      Elem('body_tail', transparent, Stroke.dreads)
    } else if (tail_name_en === 'Deer') {
      Elem('body_tail', fur_basic)

      if (fur_second_color) Elem('body_tail_second', fur_second_basic)

      Elem('body_tail', transparent, Stroke.fur)
    } else {
      Elem('body_tail', hair_basic)

      if (hair_second) Elem('body_tail_second', hair_second_color)

      Elem('body_tail', transparent, Stroke.hair)
    }
  })

  // ---------------------------------------------------------------------------

  // Wings

  Layer(Positions.empty, Rotate.empty, () => {
    if (wings_enable) {
      if (wings_bat) {
        Elem('wing_bat_left', wings_color_second, Stroke.wing)
        Elem('wing_bat_left_fluff', fur_basic, Stroke.fur)
      } else {
        Elem('wing_left', wings_color_second, Stroke.wing)
        Elem('wing_left_fluff', fur_basic, Stroke.fur)
      }
    }
  })

  // ---------------------------------------------------------------------------

  // Left ear

  Layer(Positions.head2, Rotate.head, () => {
    Elem('ear_left', ears_color, [12, ears_color_shade])

    if (tassels) {
      Elem('ear_left_tassel_inside', transparent, [8, ears_color])
      Elem('ear_left_tassel', ears_color, [8, ears_color_shade])
    }

    if (fluff_ears) Elem('fluff_ear_left', ears_color, [8, ears_color_shade])

    Elem('ear_left_pinna', transparent, [7, ears_color_shade])

    if (piercingLUpper) Elem('piercings_ear_left_upper', piercings_basic, Stroke.piercing)
    if (piercingLMiddle) Elem('piercings_ear_left_middle', piercings_basic, Stroke.piercing)
    if (piercingLLower) Elem('piercings_ear_left_lower', piercings_basic, Stroke.piercing)

    if (horn_rear) {
      Elem('horn_left', horn_rear_basic, Stroke.horn)
      Elem('horn_right', horn_rear_basic, Stroke.horn)
    }
  })

  // ---------------------------------------------------------------------------

  // Tail and back of hair

  Layer(Positions.empty, Rotate.head, () => {
    if (hair_dreads) {
      Elem('back', transparent, Stroke.dreads_tint)
      Elem('back', transparent, Stroke.dreads)

      Elem('tail', transparent, Stroke.dreads_tint)
      Elem('tail', transparent, Stroke.dreads)
    } else {
      Elem('back', hair_basic)

      if (hair_second) Elem('back_second', hair_second_color)

      Elem('back', transparent, Stroke.hair)

      Elem('tail', hair_basic)

      if (hair_second) Elem('tail_second', hair_second_color)

      Elem('tail', transparent, Stroke.hair)
    }
  })

  // ---------------------------------------------------------------------------

  // Left arm / hoof

  const leftBehindThighAng: [number, TPosition] = [thighLAngle, origins.hooves_left_behind_thigh]
  const leftBehindForearmAng: [number, TPosition] = [forearmLAngle, origins.hooves_left_behind_forearm]
  const lefBehindtTibiaAng: [number, TPosition] = [kneeLAngle, origins.hooves_left_behind_tibia]
  const lefBehindtWristAng: [number, TPosition] = [footLAngle, origins.hooves_left_behind_wrist]

  Layer(Positions.empty, leftBehindThighAng, () => {
    Elem('hooves_left_behind_thigh', fur_basic, Stroke.fur)

    if (stripes_enable) {
      Elem('stripes_front_hooves_left_behind_thigh', stripes_basic, transparent, ['hooves_left_behind_thigh', Positions.empty])
      Elem('stripes_back_hooves_left_behind_thigh', stripes_basic, transparent, ['hooves_left_behind_thigh', Positions.empty])
    }
  })

  Layer([Positions.zero, Positions.zero], [leftBehindThighAng, leftBehindForearmAng], () => {
    Elem('hooves_left_behind_forearm', fur_basic, Stroke.fur)
  })

  Layer(
    [Positions.zero, Positions.zero, Positions.zero],
    [leftBehindThighAng, leftBehindForearmAng, lefBehindtTibiaAng],
    () => {
      Elem('hooves_left_behind_tibia', hooves_color, [12, hooves_color_shade])

      if (stripes_enable) {
        Elem('stripes_front_hooves_left_behind_tibia', stripes_basic, transparent, ['hooves_left_behind_tibia', Positions.empty])
        Elem('stripes_back_hooves_left_behind_tibia', stripes_basic, transparent, ['hooves_left_behind_tibia', Positions.empty])
      }
    }
  )

  Layer(
    [Positions.zero, Positions.zero, Positions.zero, Positions.zero],
    [leftBehindThighAng, leftBehindForearmAng, lefBehindtTibiaAng, lefBehindtWristAng],
    () => {
      Elem('hooves_left_behind_wrist', hooves_color, [12, hooves_color_shade])
    }
  )


  const leftForearmAng: [number, TPosition] = [shoulderLAngle, origins.hooves_left_front_forearm]
  const leftTibiaAng: [number, TPosition] = [elbowLAngle, origins.hooves_left_front_tibia]
  const leftWristAng: [number, TPosition] = [wristLAngle, origins.hooves_left_front_wrist]

  Layer(Positions.empty, leftForearmAng, () => {
    Elem('hooves_left_front_forearm', fur_basic, Stroke.fur)

    if (stripes_enable) {
      Elem('stripes_front_hooves_left_front_forearm', stripes_basic, transparent, ['hooves_left_front_forearm', Positions.empty])
      Elem('stripes_back_hooves_left_front_forearm', stripes_basic, transparent, ['hooves_left_front_forearm', Positions.empty])
    }
  })

  Layer([Positions.zero, Positions.zero], [leftForearmAng, leftTibiaAng], () => {
    Elem('hooves_left_front_tibia', hooves_color, [12, hooves_color_shade])

    if (stripes_enable) {
      Elem('stripes_front_hooves_left_front_tibia', stripes_basic, transparent, ['hooves_left_front_tibia', Positions.empty])
      Elem('stripes_back_hooves_left_front_tibia', stripes_basic, transparent, ['hooves_left_front_tibia', Positions.empty])
    }
  })

  Layer([Positions.zero, Positions.zero, Positions.zero], [leftForearmAng, leftTibiaAng, leftWristAng], () => {
    Elem('hooves_left_front_wrist', hooves_color, [12, hooves_color_shade])
  })

  // ---------------------------------------------------------------------------

  // Body

  Layer(Positions.empty, Rotate.empty, () => {
    Elem('head', fur_basic, Stroke.fur)
    Elem('chest', fur_basic, Stroke.fur)
    Elem('body', fur_basic, Stroke.fur)

    if (stripes_enable) Elem('stripes_body', stripes_basic, transparent, ['body', Positions.empty])
    if (fur_second_color) Elem('fur_second_body', fur_second_basic)
  })


  const rightBehindThighAng: [number, TPosition] = [thighRAngle, origins.hooves_right_behind_thigh]
  const rightBehindForearmAng: [number, TPosition] = [forearmRAngle, origins.hooves_right_behind_forearm]
  const rightBehindTibiaAng: [number, TPosition] = [kneeRAngle, origins.hooves_right_behind_tibia]
  const rightBehindWristAng: [number, TPosition] = [footRAngle, origins.hooves_right_behind_wrist]

  Layer(Positions.empty, rightBehindThighAng, () => {
    Elem('hooves_right_behind_thigh', fur_basic, Stroke.fur)

    if (stripes_enable) {
      Elem('stripes_front_hooves_right_behind_thigh', stripes_basic, transparent, ['hooves_right_behind_thigh', Positions.empty])
      Elem('stripes_back_hooves_right_behind_thigh', stripes_basic, transparent, ['hooves_right_behind_thigh', Positions.empty])
    }
  })

  Layer([Positions.zero, Positions.zero], [rightBehindThighAng, rightBehindForearmAng], () => {
    Elem('hooves_right_behind_forearm', fur_basic, Stroke.fur)
  })

  Layer(
    [Positions.zero, Positions.zero, Positions.zero],
    [rightBehindThighAng, rightBehindForearmAng, rightBehindTibiaAng],
    () => {
      Elem('hooves_right_behind_tibia', hooves_color, [12, hooves_color_shade])

      if (stripes_enable) {
        Elem('stripes_front_hooves_right_behind_tibia', stripes_basic, transparent, ['hooves_right_behind_tibia', Positions.empty])
        Elem('stripes_back_hooves_right_behind_tibia', stripes_basic, transparent, ['hooves_right_behind_tibia', Positions.empty])
      }
    }
  )

  Layer(
    [Positions.zero, Positions.zero, Positions.zero, Positions.zero],
    [rightBehindThighAng, rightBehindForearmAng, rightBehindTibiaAng, rightBehindWristAng],
    () => {
      Elem('hooves_right_behind_wrist', hooves_color, [12, hooves_color_shade])
    }
  )


  Layer(Positions.empty, Rotate.empty, () => {
    Elem('neck', fur_basic, [7, fur_basic])

    if (fur_second_color) Elem('fur_second_chest', fur_second_basic)
    if (stripes_enable) {
      Elem('stripes_neck_left', stripes_basic, transparent, ['neck', Positions.empty])
      Elem('stripes_neck_right', stripes_basic, transparent, ['neck', Positions.empty])
    }

    Elem('neck_lines', transparent, Stroke.fur)

    if (fluff_chest) Elem('fluff_chest', fur_SECOND, [8, fur_SECOND_SHADE])
    if (collar_enable) Elem('collar', collar_basic, [8, collar_shade])
    if (bowtie_enable) Elem('bowtie', bowtie_basic, [8, bowtie_shade])

    if (wings_enable) {
      if (wings_bat) {
        Elem('wing_bat_right', wings_color_second, Stroke.wing)
        Elem('wing_bat_right_fluff', fur_basic, Stroke.fur)
      } else {
        Elem('wing_right', wings_color_second, Stroke.wing)
        Elem('wing_right_fluff', fur_basic, Stroke.fur)
      }
    }
  })

  Layer(Positions.empty, Rotate.cheeks, () => {
    if (fur_second_color) {
      Elem('fur_second_nose', fur_second_basic, transparent, ['head3', Positions.empty])
    }
  })

  Layer(Positions.head, Rotate.head, () => {
    if (stripes_enable) {
      Elem('stripes_left', stripes_basic, transparent, Clip.head2)
      Elem('stripes_right', stripes_basic, transparent, Clip.head2)
      Elem('stripes_fore', stripes_basic, transparent, Clip.head2)
      Elem('stripes_crust', stripes_basic, transparent, Clip.head2)
    }
  })

  // ---------------------------------------------------------------------------

  // Cheek left

  Layer(Positions.cheeks, Rotate.cheeks, () => {
    if (fluff_cheeks) Elem('fluff_cheek_left', fur_SECOND, [8, fur_SECOND_SHADE])
  })

  // ---------------------------------------------------------------------------

  // Eye left

  Layer(Positions.head, Rotate.head, () => {
    Elem('eye_left', eyes_sclera, transparent, Clip.head2)
  })

  Layer(Positions.eye_left, Rotate.head, () => {
    Elem('eye_left_iris', eyes_left_basic, transparent, Clip.eye_left)
    Elem('eye_left_pupil', eyes_pupil, transparent, Clip.eye_left)
    Elem('eye_left_flare', '#fff', transparent, Clip.eye_left)
  })

  Layer(Positions.head, Rotate.head, () => {
    Elem('eye_left_lid_up_fill', fur_basic, [2, fur_basic], Clip.head2)
    Elem('eye_left_lid_down_fill', fur_basic, [2, fur_basic], Clip.head2)
    Elem('eye_left_lid_up', transparent, [9, '#222'], Clip.head2)

    if (!male) Elem('eye_left_lashes', transparent, [9, '#222'])
    if (glasses_enable) Elem('glasses_left', glasses_lenses, [12, glasses_frame])
  })

  height = properties.eyes_BROWS_LEFT_HEIGHT

  Layer([0, (-horiz * 20 - height / 5) * quality], Rotate.head, () => {
    if (eyes_brows_show) {
      Elem('eye_left_brow', transparent, [browsLWidth / 10, brows_color], Clip.head2)
    }
  })

  // ---------------------------------------------------------------------------

  // Face

  Layer(Positions.head, Rotate.head, () => {
    Elem('nose', fur_SECOND, [7, fur_SECOND])
  })

  Layer(Positions.empty, Rotate.head, () => {
    Elem('chin_angulus', transparent, [12, fur_SECOND_SHADE])
    Elem('chin', fur_SECOND, [12, fur_SECOND_SHADE])
  })

  Layer(Positions.head, Rotate.head, () => {
    Elem('bridge', transparent, [12, fur_SECOND_SHADE])
    Elem('mouth', jaw_basic, transparent)
    Elem('tongue', tongue_basic, [5, tongue_shade], ['mouth', Positions.head])

    if (canine_nose_enable) Elem('nose_point', canine_nose_basic, [7, canine_nose_shade])
  })

  const upper = (100 - properties.teeth_upper) / 2
  const upper2 = (100 - properties.teeth_upper) / 100

  const upperPos: [number, number] = [(angle / 1.5) * upper2 * quality, (-horiz * 20 - upper) * quality]

  Layer(upperPos, Rotate.head, () => {
    if (sharp_teeth) {
      Elem('teeth_sharp_upper', '#fff', [5, '#ddd'], ['mouth', [0, -(30 - properties.teeth_upper / 3.33)]])
    } else {
      Elem('teeth_upper', '#fff', [5, '#ddd'], ['mouth', [0, -(30 - properties.teeth_upper / 3.33)]])
    }
  })

  const lower = (100 - properties.teeth_lower) / 2
  const lower2 = (100 - properties.teeth_lower) / 100

  const lowerPos: [number, number] = [-(angle / 1.5) * lower2 * quality, (-horiz * 20 + lower) * quality]

  Layer(lowerPos, Rotate.head, () => {
    if (sharp_teeth) {
      Elem('teeth_sharp_lower', '#fff', [5, '#ddd'], ['mouth', [0, 30 - properties.teeth_lower / 3.33]])
    } else {
      Elem('teeth_lower', '#fff', [5, '#ddd'], ['mouth', [0, 30 - properties.teeth_lower / 3.33]])
    }
  })

  Layer(Positions.head, Rotate.head, () => {
    Elem('mouth', transparent, [7, fur_SECOND_SHADE])

    if (fangs) {
      Elem('fangs_left', '#fff', [3, '#ddd'], [['head2', 'nose'], Positions.head])
      Elem('fangs_right', '#fff', [3, '#ddd'])
    }

    if (!canine_nose_enable) {
      Elem('nostril_left', transparent, [8, fur_SECOND_SHADE], [['head2', 'nose'], Positions.head])
      Elem('nostril_right', transparent, [8, fur_SECOND_SHADE])
    }
  })

  // ---------------------------------------------------------------------------

  // Cheek right

  Layer(Positions.cheeks, Rotate.cheeks, () => {
    if (fluff_cheeks) Elem('fluff_cheek_right', fur_SECOND, [8, fur_SECOND_SHADE])
  })

  // ---------------------------------------------------------------------------

  // Eye right

  Layer(Positions.head, Rotate.head, () => {
    Elem('eye_right', eyes_sclera)
  })

  Layer(Positions.eye_right, Rotate.head, () => {
    Elem('eye_right_iris', eyes_right_basic, transparent, Clip.eye_right)
    Elem('eye_right_pupil', eyes_pupil, transparent, Clip.eye_right)
    Elem('eye_right_flare', '#fff', transparent, Clip.eye_right)
  })

  Layer(Positions.head, Rotate.head, () => {
    Elem('eye_right_lid_up_fill', fur_basic, [2, fur_basic], Clip.head2)
    Elem('eye_right_lid_down_fill', fur_basic, [2, fur_basic], Clip.head2)
    Elem('eye_right_lid_up', transparent, [9, '#222'])

    if (!male) Elem('eye_right_lashes', transparent, [9, '#222'])
    if (glasses_enable) {
      Elem('glasses_nose', transparent, [12, glasses_frame])
      Elem('glasses_right', glasses_lenses, [12, glasses_frame])
    }
  })

  height = properties.eyes_BROWS_RIGHT_HEIGHT

  Layer([0, (-horiz * 20 - height / 5) * quality], Rotate.head, () => {
    if (eyes_brows_show) Elem('eye_right_brow', transparent, [browsRWidth / 10, brows_color])
  })

  // ---------------------------------------------------------------------------

  // Front hair

  Layer(Positions.empty, Rotate.head, () => {
    if (hair_dreads) {
      Elem('front', transparent, Stroke.dreads_tint)
      Elem('front', transparent, Stroke.dreads)
    } else {
      Elem('front', hair_basic)

      if (hair_second) Elem('front_second', hair_second_color, transparent)

      Elem('front', transparent, Stroke.hair)
    }
  })

  // ---------------------------------------------------------------------------

  // Ear right

  Layer(Positions.head2, Rotate.head, () => {
    Elem('ear_right', ears_color, [12, ears_color_shade], ['!head0', Positions.head2])

    if (tassels) {
      Elem('ear_right_tassel_inside', transparent, [8, ears_color])
      Elem('ear_right_tassel', ears_color, [9, ears_color_shade])
    }

    if (fluff_ears) Elem('fluff_ear_right', ears_color, [8, ears_color_shade], ['!head0', Positions.head2])

    Elem('ear_right_pinna', transparent, [9, ears_color_shade])

    if (piercingRUpper) Elem('piercings_ear_right_upper', piercings_basic, Stroke.piercing)
    if (piercingRMiddle) Elem('piercings_ear_right_middle', piercings_basic, Stroke.piercing)
    if (piercingRLower) Elem('piercings_ear_right_lower', piercings_basic, Stroke.piercing)
  })

  // ---------------------------------------------------------------------------

  // Front horn

  Layer(Positions.head, Rotate.head, () => {
    if (horn_enable) {
      if (horn_changeling) {
        Elem('horn_changeling', fur_basic, Stroke.fur)
      } else {
        Elem('horn', fur_basic, Stroke.fur)
        Elem('horn_second', transparent, [9, fur_shade])
      }
    }
  })

  // ---------------------------------------------------------------------------

  // Right arm / hoof

  const rightForearmAng: [number, TPosition] = [shoulderRAngle, origins.hooves_right_front_forearm]
  const rightTibiaAng: [number, TPosition] = [elbowRAngle, origins.hooves_right_front_tibia]
  const rightWristAng: [number, TPosition] = [wristRAngle, origins.hooves_right_front_wrist]

  Layer(Positions.empty, rightForearmAng, () => {
    Elem('hooves_right_front_forearm', fur_basic, Stroke.fur)

    if (stripes_enable) {
      Elem('stripes_front_hooves_right_front_forearm', stripes_basic, transparent, ['hooves_right_front_forearm', Positions.empty])
      Elem('stripes_back_hooves_right_front_forearm', stripes_basic, transparent, ['hooves_right_front_forearm', Positions.empty])
    }
  })

  Layer([Positions.zero, Positions.zero], [rightForearmAng, rightTibiaAng], () => {
    Elem('hooves_right_front_tibia', hooves_color, [12, hooves_color_shade])

    if (stripes_enable) {
      Elem('stripes_front_hooves_right_front_tibia', stripes_basic, transparent, ['hooves_right_front_tibia', Positions.empty])
      Elem('stripes_back_hooves_right_front_tibia', stripes_basic, transparent, ['hooves_right_front_tibia', Positions.empty])
    }
  })

  Layer([Positions.zero, Positions.zero, Positions.zero], [rightForearmAng, rightTibiaAng, rightWristAng], () => {
    Elem('hooves_right_front_wrist', hooves_color, [12, hooves_color_shade])
  })
}
