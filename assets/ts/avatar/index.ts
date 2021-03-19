import * as PIXI from 'pixi.js'

import initLayers from '../layers'
import getData from '../getting/get-data'

import { elements } from '../library/config'
import { applyFilters } from './filters'

import { IObject } from '~/types/basic'

interface IData {
  originalEvent: {
    movementX: number
    movementY: number
  }
}

let data: IData = {} as IData
let dragging = false

const WIDTH = 1280
const HEIGHT = 720

const AVATAR_WIDTH = 1024
const AVATAR_SIZE_HALF = AVATAR_WIDTH / 2
// eslint-disable-next-line no-magic-numbers
const AVATAR_SIZE_OCT = AVATAR_WIDTH / 8

const SECOND = 1e3

const MAX_ANGLE = 90
const MAX_ANGLE_HALF = MAX_ANGLE / 2

// Engine settings
export const options = {
  XYuv: [0, 0],

  width: 1280,
  height: 720,

  scale: 0.4,

  position: {
    x: WIDTH / 2,
    y: HEIGHT / 3
  }
}

// Screen touch events
function onDragStart(event: { data: IData }) {
  dragging = true

  data = event.data
}

function onDragMove() {
  if (dragging) {
    options.XYuv[0] += data.originalEvent.movementX / AVATAR_SIZE_HALF
    options.XYuv[1] += data.originalEvent.movementY / AVATAR_SIZE_OCT

    if (options.XYuv[0] > 1) options.XYuv[0] = 1
    else if (options.XYuv[0] < -1) options.XYuv[0] = -1

    if (options.XYuv[1] > 1) options.XYuv[1] = 1
    else if (options.XYuv[1] < -1) options.XYuv[1] = -1
  }
}

// Applies properties for the application stage
function setupStage(self: IObject<any>) {
  const { stage, screen } = app

  stage.filters = applyFilters()
  stage.interactive = true
  stage.interactiveChildren = false
  stage.cursor = 'move'
  stage.hitArea = screen

  function onDragEnd() {
    dragging = false

    const slot = +(localStorage.getItem('animationSlot') as string)
    const animations = JSON.parse(localStorage.getItem('animations') as any)

    const frame = animations[slot].frames[self.getFrame].frame

    frame.horiz = self.properties.horiz
    frame.angle = self.properties.angle
    frame.degress = self.properties.degress

    localStorage.setItem('animations', JSON.stringify(animations))

    self.setProper({ path: 'horiz', value: self.properties.horiz })
    self.setProper({ path: 'angle', value: self.properties.angle })
    self.setProper({ path: 'degress', value: self.properties.degress })

    self.setPlayChangedFrame()
  }

  stage
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)

  // eslint-disable-next-line space-before-function-paren
  stage.calculateBounds = function () {
    const { _bounds, _boundsID } = this as IObject<any>

    _bounds.clear()

    _bounds.minX = 0
    _bounds.minY = 0
    _bounds.maxX = options.width
    _bounds.maxY = options.height

    _bounds.updateID = _boundsID
  }
}

export const app = new PIXI.Application({
  width: options.width,
  height: options.height
})

// Launches the PIXI library engine with the necessary calls to Vue
export function initEngine(self: IObject<any>) {
  setupStage(self)

  app.ticker.add(() => {
    const absX = Math.abs(options.XYuv[0] * MAX_ANGLE_HALF)

    if (self.properties.angle === undefined) return

    self.properties.degress = options.XYuv[0] * MAX_ANGLE
    self.properties.horiz = options.XYuv[1] * (MAX_ANGLE_HALF - absX)
    self.properties.angle = options.XYuv[1] * absX
  })

  // Applies element information (coordinates and indices) and runs callback
  getData(elements, initLayers(self))

  setTimeout(() => {
    self.$root.$refs.avatar.parentNode.replaceChild(app.view, self.$root.$refs.avatar)
  }, SECOND)
}
