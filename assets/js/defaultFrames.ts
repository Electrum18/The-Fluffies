import { IFrame, IFrames } from '~/types/frames'

import propers from '~/assets/json/configs/properties.json'

function cloneObject(object: IFrame): IFrame {
  return JSON.parse(JSON.stringify(object))
}

const FrameObj2 = cloneObject(propers)
const FrameObj3 = cloneObject(propers)
const FrameObj4 = cloneObject(propers)

FrameObj2.eyes_position_horiz = -25

FrameObj3.eyes_position_horiz = -25
FrameObj3.eyes_eyelids_left_up = 15
FrameObj3.eyes_eyelids_right_up = 20
FrameObj3.eyes_brows_right_height = -100

FrameObj3.jaw_open = 100

FrameObj3.hooves_left_shoulder_rise = 100
FrameObj3.hooves_left_shoulder_angle = 66

FrameObj3.hooves_left_elbow_rise = 100
FrameObj3.hooves_left_elbow_angle = -33

FrameObj4.eyes_position_horiz = -25
FrameObj4.eyes_eyelids_left_up = 15
FrameObj4.eyes_eyelids_right_up = 20
FrameObj4.eyes_brows_right_height = -100

FrameObj4.jaw_open = 100

FrameObj4.hooves_left_shoulder_rise = 100
FrameObj4.hooves_left_shoulder_angle = 66

FrameObj4.hooves_left_elbow_rise = 100
FrameObj4.hooves_left_elbow_angle = -75

export default [
  {
    duration: 0.5,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...cloneObject(propers)
    }
  },
  {
    duration: 1.2,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj2
    }
  },
  {
    duration: 0.5,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj3
    }
  },
  {
    duration: 0.5,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj4
    }
  },
  {
    duration: 0.5,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj3
    }
  },
  {
    duration: 0.5,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj4
    }
  },
  {
    duration: 1.2,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj3
    }
  },
  {
    duration: 1.2,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...cloneObject(propers)
    }
  }
] as IFrames
