import * as PIXI from 'pixi.js'

import { initLibrary } from '../library'

import { createBackground } from '../tools/creating'

import face from './face'
import neck from './neck'
import rearHorns from './rear_horns'
import hoovesBehindLeft from './hooves/behind-left'
import hoovesBehindRight from './hooves/behind-right'
import hoovesFrontLeft from './hooves/front-left'
import hoovesFrontRight from './hooves/front-right'

import shortcuts from '~/assets/json/configs/shortcuts.json'

import { ILibrary, TOptions, IShortcutsJSON } from '~/types/graphics'
import { IObject } from '~/types/basic'

const CENTER = 512
const MAX_ANG = 180
const NORMAL_VAL = 0.02

const None = undefined

const { Is, Pos, Angle, Color } = (shortcuts as unknown) as IShortcutsJSON

// Declaring elements as arguments
function applyLayers(..._args: PIXI.Container[]) {
  return arguments
}

// Initialization of layers and editor elements
function layers(library: ILibrary) {
  const { Elem, Mask, Outline, Layer, VarElem, VarOutline } = library

  return applyLayers(
    Layer(
      None,
      None,
      VarElem('tail', 'fill', Color.hair),
      VarOutline('tail', 'fill', Color.hairOutline)
    ),

    Layer(
      None,
      Angle.head,
      VarElem('hair', 'back', Color.hair),
      VarOutline('hair', 'back', Color.hairOutline)
    ),

    hoovesBehindLeft(library),
    hoovesFrontLeft(library),

    Layer(
      None,
      None,
      Elem('wing_left', Color.wing, Is.wings),
      Outline('wing_left', Color.wingOutline, Is.wings),
      Elem('wing_left_fluff', 'fur_basic', Is.wings),
      Outline('wing_left_fluff', 'fur_shade', Is.wings),

      Elem('wing_bat_left', Color.wing, Is.wingsBat),
      Outline('wing_bat_left', Color.wingOutline, Is.wingsBat),
      Elem('wing_bat_left_fluff', 'fur_basic', Is.wingsBat),
      Outline('wing_bat_left_fluff', 'fur_shade', Is.wingsBat),

      Elem('scarf_behind', 'scarf_basic', ['scarf']),
      Outline('scarf_behind', 'scarf_shade', ['scarf']),

      Elem('pelvis', 'fur_basic'),
      Outline('pelvis', 'fur_shade'),

      Elem('chest', 'fur_basic'),
      Outline('chest', 'fur_shade'),

      Elem('body', 'fur_basic'),
      Mask('body'),

      Elem('stripes_body', 'stripes_basic', Is.stripes, 'body'),
      Outline('body', 'fur_shade'),

      VarElem('pants', 'body', 'pants_basic'),
      VarOutline('pants', 'body', 'pants_shade')
    ),

    hoovesBehindRight(library),

    Layer(
      None,
      None,
      Elem('wing_right', Color.wing, Is.wings),
      Outline('wing_right', Color.wingOutline, Is.wings),
      Elem('wing_right_fluff', 'fur_basic', Is.wings),
      Outline('wing_right_fluff', 'fur_shade', Is.wings),

      Elem('wing_bat_right', Color.wing, Is.wingsBat),
      Outline('wing_bat_right', Color.wingOutline, Is.wingsBat),
      Elem('wing_bat_right_fluff', 'fur_basic', Is.wingsBat),
      Outline('wing_bat_right_fluff', 'fur_shade', Is.wingsBat)
    ),

    Layer(
      None,
      Angle.head,
      VarElem('hair', 'tail', Color.hair),
      VarOutline('hair', 'tail', Color.hairOutline)
    ),

    hoovesFrontRight(library),

    Layer(
      None,
      Angle.head,
      Elem('fluff_cheek_left', Color.furSecond, ['fluff_cheeks']),
      Outline('fluff_cheek_left', Color.furSecondOutline, ['fluff_cheeks']),

      Elem('eye_left_lashes_behind', Color.eyelashes)
    ),

    Layer(
      Pos.antiHoriz,
      Angle.head,
      VarElem('ears', 'left', Color.ears),
      VarOutline('ears', 'left', Color.earsOutline),

      rearHorns(library),

      VarElem('ears', 'left_overlay', Color.ears),
      VarOutline('ears', 'left_overlay', Color.earsOutline),

      VarElem('piercing_ears', 'left', 'piercings_basic'),
      VarOutline('piercing_ears', 'left', 'piercings_shade')
    ),

    Layer(
      [Pos.empty, 'empty'],
      Angle.head,
      Elem('head', 'fur_basic'),
      Outline('head', 'fur_shade'),
      Mask('head_mask')
    ),

    Layer(
      [Pos.antiHoriz, 'earRight'],
      Angle.head,
      VarElem('ears', 'right', Color.ears, None, None, true),
      VarOutline('ears', 'right', Color.earsOutline),

      VarElem('ears', 'right_overlay', Color.ears),
      VarOutline('ears', 'right_overlay', Color.earsOutline),

      VarElem('piercing_ears', 'right', 'piercings_basic'),
      VarOutline('piercing_ears', 'right', 'piercings_shade')
    ),

    Layer(
      Pos.horiz,
      Angle.head,
      Elem('fur_second_nose', 'fur_second_basic', ['fur_second_color'], 'head_mask'),

      Elem('stripes_head', 'stripes_basic', Is.stripes, 'head_mask'),

      Elem('freckles_left', 'freckles_basic', ['freckles_cheeks'], 'head_mask'),
      Elem('freckles_right', 'freckles_basic', ['freckles_cheeks'], 'head_mask')
    ),

    neck(library),
    face(library)
  )
}

export default (app: PIXI.Application, self: IObject<any>, options: TOptions) => {
  return () => {
    const { position, scale } = options

    const container = new PIXI.Container()

    container.addChild(...layers(initLibrary(app, self) as ILibrary))

    app.ticker.add(() => {
      const { properties } = self

      const horiz = 1 - properties.position_horizontal * NORMAL_VAL
      const verti = 1 - properties.position_vertical * NORMAL_VAL

      container.x = position.x * horiz
      container.y = position.y * verti

      container.pivot.set(CENTER)
      container.scale.set(scale * properties.position_scale)

      container.rotation = properties.position_angle * (Math.PI / MAX_ANG)
    })

    app.stage.addChild(createBackground(app, self, options))
    app.stage.addChild(container)
  }
}
