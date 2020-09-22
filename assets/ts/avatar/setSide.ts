import { IProperties } from '~/types/paths'

export default function(mirror: boolean, propers: IProperties): void {
  if (mirror) {
    propers.eyes_EYELIDS_LEFT_UP = propers.eyes_eyelids_right_up
    propers.eyes_EYELIDS_LEFT_DOWN = propers.eyes_eyelids_right_down

    propers.eyes_EYELIDS_RIGHT_UP = propers.eyes_eyelids_left_up
    propers.eyes_EYELIDS_RIGHT_DOWN = propers.eyes_eyelids_left_down

    propers.eyes_BROWS_LEFT_WIDTH = propers.eyes_brows_right_width
    propers.eyes_BROWS_LEFT_HEIGHT = propers.eyes_brows_right_height
    propers.eyes_BROWS_LEFT_EVIL = propers.eyes_brows_right_evil
    propers.eyes_BROWS_LEFT_WIDE = propers.eyes_brows_right_wide

    propers.eyes_BROWS_RIGHT_WIDTH = propers.eyes_brows_left_width
    propers.eyes_BROWS_RIGHT_HEIGHT = propers.eyes_brows_left_height
    propers.eyes_BROWS_RIGHT_EVIL = propers.eyes_brows_left_evil
    propers.eyes_BROWS_RIGHT_WIDE = propers.eyes_brows_left_wide

    propers.eyes_BROWS_LEFT_HEIGHT = propers.eyes_brows_right_height
    propers.eyes_BROWS_RIGHT_HEIGHT = propers.eyes_brows_left_height

    propers.hooves_FRONT_LEFT_SHOULDER_ANGLE = propers.hooves_right_shoulder_angle
    propers.hooves_FRONT_LEFT_ELBOW_ANGLE = propers.hooves_right_elbow_angle
    propers.hooves_FRONT_LEFT_WRIST_ANGLE = propers.hooves_right_wrist_angle

    propers.hooves_FRONT_RIGHT_SHOULDER_ANGLE = propers.hooves_left_shoulder_angle
    propers.hooves_FRONT_RIGHT_ELBOW_ANGLE = propers.hooves_left_elbow_angle
    propers.hooves_FRONT_RIGHT_WRIST_ANGLE = propers.hooves_left_wrist_angle

    propers.hooves_BACK_LEFT_THIGH_ANGLE = propers.hooves_back_right_thigh_angle
    propers.hooves_BACK_LEFT_FOREARM_ANGLE = propers.hooves_back_right_forearm_angle
    propers.hooves_BACK_LEFT_KNEE_ANGLE = propers.hooves_back_right_knee_angle
    propers.hooves_BACK_LEFT_FOOT_ANGLE = propers.hooves_back_right_foot_angle

    propers.hooves_BACK_RIGHT_THIGH_ANGLE = propers.hooves_back_left_thigh_angle
    propers.hooves_BACK_RIGHT_FOREARM_ANGLE = propers.hooves_back_left_forearm_angle
    propers.hooves_BACK_RIGHT_KNEE_ANGLE = propers.hooves_back_left_knee_angle
    propers.hooves_BACK_RIGHT_FOOT_ANGLE = propers.hooves_back_left_foot_angle

    propers.wing_LEFT_FOLDED = propers.wing_right_folded
    propers.wing_RIGHT_FOLDED = propers.wing_left_folded
  } else {
    propers.eyes_EYELIDS_LEFT_UP = propers.eyes_eyelids_left_up
    propers.eyes_EYELIDS_LEFT_DOWN = propers.eyes_eyelids_left_down

    propers.eyes_EYELIDS_RIGHT_UP = propers.eyes_eyelids_right_up
    propers.eyes_EYELIDS_RIGHT_DOWN = propers.eyes_eyelids_right_down

    propers.eyes_BROWS_LEFT_WIDTH = propers.eyes_brows_left_width
    propers.eyes_BROWS_LEFT_HEIGHT = propers.eyes_brows_left_height
    propers.eyes_BROWS_LEFT_EVIL = propers.eyes_brows_left_evil
    propers.eyes_BROWS_LEFT_WIDE = propers.eyes_brows_left_wide

    propers.eyes_BROWS_RIGHT_WIDTH = propers.eyes_brows_right_width
    propers.eyes_BROWS_RIGHT_HEIGHT = propers.eyes_brows_right_height
    propers.eyes_BROWS_RIGHT_EVIL = propers.eyes_brows_right_evil
    propers.eyes_BROWS_RIGHT_WIDE = propers.eyes_brows_right_wide

    propers.hooves_FRONT_LEFT_SHOULDER_ANGLE = propers.hooves_front_left_shoulder_angle
    propers.hooves_FRONT_LEFT_ELBOW_ANGLE = propers.hooves_front_left_elbow_angle
    propers.hooves_FRONT_LEFT_WRIST_ANGLE = propers.hooves_front_left_wrist_angle

    propers.hooves_FRONT_RIGHT_SHOULDER_ANGLE = propers.hooves_front_right_shoulder_angle
    propers.hooves_FRONT_RIGHT_ELBOW_ANGLE = propers.hooves_front_right_elbow_angle
    propers.hooves_FRONT_RIGHT_WRIST_ANGLE = propers.hooves_front_right_wrist_angle

    propers.hooves_BACK_LEFT_THIGH_ANGLE = propers.hooves_back_left_thigh_angle
    propers.hooves_BACK_LEFT_FOREARM_ANGLE = propers.hooves_back_left_forearm_angle
    propers.hooves_BACK_LEFT_KNEE_ANGLE = propers.hooves_back_left_knee_angle
    propers.hooves_BACK_LEFT_FOOT_ANGLE = propers.hooves_back_left_foot_angle

    propers.hooves_BACK_RIGHT_THIGH_ANGLE = propers.hooves_back_right_thigh_angle
    propers.hooves_BACK_RIGHT_FOREARM_ANGLE = propers.hooves_back_right_forearm_angle
    propers.hooves_BACK_RIGHT_KNEE_ANGLE = propers.hooves_back_right_knee_angle
    propers.hooves_BACK_RIGHT_FOOT_ANGLE = propers.hooves_back_right_foot_angle

    propers.wing_LEFT_FOLDED = propers.wing_left_folded
    propers.wing_RIGHT_FOLDED = propers.wing_right_folded
  }
}
