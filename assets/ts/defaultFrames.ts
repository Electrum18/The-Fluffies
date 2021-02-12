import propers from '~/assets/json/configs/properties.json'

import { IObject } from '~/types/basic'

function cloneObject(object: IObject<any>): IObject<any> {
  return JSON.parse(JSON.stringify(object))
}

// ! object assign

const FrameObj2 = cloneObject(propers)

FrameObj2.eyes_position_horiz = -80
FrameObj2.eyes_position_verti = -20

FrameObj2.teeth_upper = 0
FrameObj2.teeth_lower = 0

FrameObj2.jaw_open = 100

FrameObj2.hooves_front_left_shoulder_angle = -90
FrameObj2.hooves_front_left_elbow_angle = 90
FrameObj2.hooves_front_left_wrist_angle = 90

FrameObj2.hooves_front_right_shoulder_angle = -90
FrameObj2.hooves_front_right_elbow_angle = 90
FrameObj2.hooves_front_right_wrist_angle = 90

FrameObj2.hooves_back_left_thigh_angle = 20
FrameObj2.hooves_back_right_thigh_angle = 20

FrameObj2.wing_left_folded = 100
FrameObj2.wing_right_folded = 100

export default [
  {
    duration: 1.2,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,

      position_horizontal: 0,
      position_vertical: 0,
      position_scale: 1,
      position_angle: 0,

      ...cloneObject(propers)
    }
  },
  {
    duration: 1.2,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 30,

      position_horizontal: 0,
      position_vertical: 0,
      position_scale: 1,
      position_angle: -20,

      ...FrameObj2
    }
  },
  {
    duration: 1.2,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 30,

      position_horizontal: 0,
      position_vertical: 0,
      position_scale: 1,
      position_angle: -20,

      ...FrameObj2
    }
  },
  {
    duration: 1.2,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,

      position_horizontal: 0,
      position_vertical: 0,
      position_scale: 1,
      position_angle: 0,

      ...cloneObject(propers)
    }
  }
]
