/* eslint-disable camelcase */

import layers from './graphics'

function shortcuts(
  horiz,
  angle,
  quality,
  mirror,

  { eyes_position_horiz, eyes_position_verti },
  { fur_shade, wings_shade, piercings_shade, horn_rear_shade, hair_basic, hair_shade }
) {
  const Positions = {
    empty: undefined,
    head: [0, -horiz * 20 * quality],
    head2: [0, horiz * 10 * quality],
    cheeks: [0, -horiz * 10 * quality],
    eyes: [
      (eyes_position_horiz / 3) * quality * (mirror ? -1 : 1),
      (-horiz * 20 - eyes_position_verti / 3) * quality
    ]
  }

  const Rotate = {
    empty: undefined,
    head: [angle, [0, 0], 0],
    cheeks: [angle / 2, [0, 0], 0]
  }

  const Stroke = {
    fur: [12, fur_shade],
    wing: [12, wings_shade],
    piercing: [7, piercings_shade],
    horn: [12, horn_rear_shade],
    hair: [12, hair_shade],
    dreads: [20, hair_basic],
    dreads_tint: [45, hair_shade]
  }

  const Clip = {
    eye_left: ['eye_left', Positions.eyes],
    eye_right: ['eye_right', Positions.eyes],
    head2: ['head2', Positions.head]
  }

  return { Positions, Rotate, Stroke, Clip }
}

export default function(
  { ctx, quality, properties, globals, getColor, horiz, mirror, angle, wind, windPropers },

  calculated,
  absAngle
) {
  const { Layer, Elem } = layers(ctx, quality, globals, mirror, calculated, wind, windPropers)
  const { Positions, Rotate, Stroke, Clip } = shortcuts(
    horiz,
    angle,
    quality,
    mirror,
    properties,
    getColor
  )

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
    hooves_enable,
    collar_enable,
    bowtie_enable
  } = globals

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
    bowtie_shade
  } = getColor

  const {
    hooves_LEFT_SHOULDER_RISE: shoulderLRise,
    hooves_LEFT_SHOULDER_ANGLE: shoulderLAngle,

    hooves_LEFT_ELBOW_RISE: elbowLRise,
    hooves_LEFT_ELBOW_ANGLE: elbowLAngle,

    hooves_LEFT_WRIST_RISE: wristLRise,
    hooves_LEFT_WRIST_ANGLE: wristLAngle,

    hooves_RIGHT_SHOULDER_RISE: shoulderRRise,
    hooves_RIGHT_SHOULDER_ANGLE: shoulderRAngle,

    hooves_RIGHT_ELBOW_RISE: elbowRRise,
    hooves_RIGHT_ELBOW_ANGLE: elbowRAngle,

    hooves_RIGHT_WRIST_RISE: wristRRise,
    hooves_RIGHT_WRIST_ANGLE: wristRAngle,

    eyes_BROWS_LEFT_WIDTH: browsLWidth,
    eyes_BROWS_RIGHT_WIDTH: browsRWidth
  } = properties

  const transparent = undefined

  let height

  // Declaration of layers

  // Wings

  Layer(Positions.empty, Rotate.empty, () => {
    if (wings_enable) {
      if (wings_bat) {
        Elem('wing_bat_left', wings_basic, Stroke.wing)
        Elem('wing_bat_left_fluff', fur_basic, Stroke.fur)

        Elem('wing_bat_right', wings_basic, Stroke.wing)
        Elem('wing_bat_right_fluff', fur_basic, Stroke.fur)
      } else {
        Elem('wing_left', wings_basic, Stroke.wing)
        Elem('wing_left_fluff', fur_basic, Stroke.fur)

        Elem('wing_right', wings_basic, Stroke.wing)
        Elem('wing_right_fluff', fur_basic, Stroke.fur)
      }
    }
  })

  // ---------------------------------------------------------------------------

  // Left ear

  Layer(Positions.head2, Rotate.head, () => {
    Elem('ear_left', fur_basic, Stroke.fur)

    if (tassels) {
      Elem('ear_left_tassel_inside', transparent, [8, fur_basic])
      Elem('ear_left_tassel', fur_basic, [8, fur_shade])
    }

    if (fluff_ears) Elem('fluff_ear_left', fur_basic, [8, fur_shade])

    Elem('ear_left_pinna', transparent, [7, fur_shade])

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

  // Body

  Layer(Positions.empty, Rotate.empty, () => {
    Elem('head', fur_basic, Stroke.fur)
    Elem('chest', fur_basic, Stroke.fur)
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

    Elem('chest_bottom', fur_basic, Stroke.fur)
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

  Layer(Positions.eyes, Rotate.head, () => {
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
      Elem('eye_left_brow', transparent, [browsLWidth / 10, '#222'], Clip.head2)
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
  const upperPos = [(angle / 1.5) * upper2 * quality, (-horiz * 20 - upper) * quality]

  Layer(upperPos, Rotate.head, () => {
    Elem('teeth_upper', '#fff', [5, '#ddd'], ['mouth', [0, -(30 - properties.teeth_upper / 3.33)]])
  })

  const lower = (100 - properties.teeth_lower) / 2
  const lower2 = (100 - properties.teeth_lower) / 100
  const lowerPos = [-(angle / 1.5) * lower2 * quality, (-horiz * 20 + lower) * quality]

  Layer(lowerPos, Rotate.head, () => {
    Elem('teeth_lower', '#fff', [5, '#ddd'], ['mouth', [0, 30 - properties.teeth_lower / 3.33]])
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

  Layer(Positions.eyes, Rotate.head, () => {
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
    if (eyes_brows_show) Elem('eye_right_brow', transparent, [browsRWidth / 10, '#222'])
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
    Elem('ear_right', fur_basic, Stroke.fur, ['!head0', Positions.head2])

    if (tassels) {
      Elem('ear_right_tassel_inside', transparent, [8, fur_basic])
      Elem('ear_right_tassel', fur_basic, [9, fur_shade])
    }

    if (fluff_ears) Elem('fluff_ear_right', fur_basic, [8, fur_shade], ['!head0', Positions.head2])

    Elem('ear_right_pinna', transparent, [9, fur_shade])

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

  // Left arm / hoof

  // Shoulder

  const leftArm = {
    pos:
      absAngle < 0.5
        ? [-absAngle * 2 * 160 * quality, 0]
        : [((absAngle - 0.5) * 60 - 160) * quality, 0],

    angle: [shoulderLAngle * (mirror ? -1 : 1), [65, 325], 1.5]
  }

  Layer(leftArm.pos, leftArm.angle, () => {
    if (hooves_enable) Elem('hooves_left_forearm', fur_basic, Stroke.fur)
  })

  // Tibia

  const leftArmTibia = {
    pos: [0, -(shoulderLRise - elbowLRise) * 3 * quality],
    angle: [elbowLAngle * (mirror ? -1 : 1), [71, 350 - elbowLRise * 2.22], 1.4]
  }

  Layer([leftArm.pos, leftArmTibia.pos], [leftArm.angle, leftArmTibia.angle], () => {
    if (hooves_enable) Elem('hooves_left_tibia', fur_basic, Stroke.fur)
  })

  // Wrist

  const leftArmWrist = {
    pos: [
      15 *
        (1 - wristLRise / 100) *
        (shoulderLRise / 500 + elbowLRise / 90) *
        (1 - wristLRise / 200) *
        quality,
      -(elbowLRise - wristLRise) * 6 * quality
    ],

    angle: [
      wristLAngle * (mirror ? -1 : 1),
      [86, 350 - elbowLRise * 4.15 + (100 - wristLRise) * 4.15],
      1.4
    ]
  }

  Layer(
    [leftArm.pos, leftArmTibia.pos, leftArmWrist.pos],
    [leftArm.angle, leftArmTibia.angle, leftArmWrist.angle],
    () => {
      if (hooves_enable) {
        Elem('hooves_left_wrist', fur_basic, Stroke.fur)
        Elem('hooves_left_hoof', transparent, [6, fur_shade])
      }
    }
  )

  // ---------------------------------------------------------------------------

  // Right arm / hoof

  // Shoulder

  const rightArm = {
    pos:
      absAngle < 0.5 ? [-absAngle * 80 * quality, 0] : [((absAngle - 0.5) * 60 - 40) * quality, 0],

    angle: [shoulderRAngle * (mirror ? -1 : 1), [-65, 325], 1.5]
  }

  Layer(rightArm.pos, rightArm.angle, () => {
    if (hooves_enable) Elem('hooves_right_forearm', fur_basic, Stroke.fur)
  })

  // Tibia

  const rightArmTibia = {
    pos: [0, -(shoulderRRise - elbowRRise) * 3 * quality],
    angle: [elbowRAngle * (mirror ? -1 : 1), [-71, 350 - elbowRRise * 2.22], 1.4]
  }

  Layer([rightArm.pos, rightArmTibia.pos], [rightArm.angle, rightArmTibia.angle], () => {
    if (hooves_enable) Elem('hooves_right_tibia', fur_basic, Stroke.fur)
  })

  // Wrist

  const rightArmWrist = {
    pos: [
      -15 *
        (1 - wristRRise / 100) *
        (shoulderRRise / 500 + elbowRRise / 90) *
        (1 - wristRRise / 200) *
        quality,
      -(elbowRRise - wristRRise) * 6 * quality
    ],

    angle: [
      wristRAngle * (mirror ? -1 : 1),
      [86, 350 - elbowRRise * 4.15 + (100 - wristRRise) * 4.15],
      1.4
    ]
  }

  Layer(
    [rightArm.pos, rightArmTibia.pos, rightArmWrist.pos],
    [rightArm.angle, rightArmTibia.angle, rightArmWrist.angle],
    () => {
      if (hooves_enable) {
        Elem('hooves_right_wrist', fur_basic, Stroke.fur)
        Elem('hooves_right_hoof', transparent, [6, fur_shade])
      }
    }
  )
}
