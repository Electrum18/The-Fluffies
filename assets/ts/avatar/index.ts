import * as PIXI from 'pixi.js'

import { elements } from './library'
import initLayers from './layers'
import getData from './getting/get-data'

import RGBShiftFragmentShader from '~/assets/json/shaders/fragment/rgb-shift.json'
import FastBlurFragmentShader from '~/assets/json/shaders/fragment/fast-blur.json'
import VignetteFragmentShader from '~/assets/json/shaders/fragment/vignette.json'

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
const AVATAR_WIDTH = 1024
const POS_CORRECTION = 1.75

const RGB_SHIFT_AMOUNT = 0.25
const BLUR_AMOUNT = 0.002
const VIGNETTE_OPACITY = 0.1

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
    x: (WIDTH - AVATAR_SIZE_HALF) / POS_CORRECTION,
    y: 64
  },

  angle: {
    front: 0,
    side: 0
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
function setupStage({ stage, screen }: PIXI.Application, self: IObject<any>) {
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

    frame.horiz = self.horiz
    frame.angle = self.angle
    frame.degress = self.degress

    localStorage.setItem('animations', JSON.stringify(animations))

    self.setProper({ path: 'horiz', value: self.horiz })
    self.setProper({ path: 'angle', value: self.angle })

    self.setProper({ path: 'degress', value: self.degress })

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

const {
  FXAAFilter,
  AlphaFilter: { defaultVertexSrc }
} = PIXI.filters

// Filter creating function shorthand
function createFilter(fragmentShader: string[], value: number) {
  return new PIXI.Filter(defaultVertexSrc, fragmentShader.join('\n'), { value })
}

// Creates array of fliters for avatar layer
function applyFilters() {
  return [
    new FXAAFilter(),
    createFilter(RGBShiftFragmentShader, RGB_SHIFT_AMOUNT),
    createFilter(FastBlurFragmentShader, BLUR_AMOUNT),
    createFilter(VignetteFragmentShader, VIGNETTE_OPACITY)
  ]
}

// Launches the PIXI library engine with the necessary calls to Vue
export function initEngine(self: IObject<any>) {
  const app = new PIXI.Application({
    width: options.width,
    height: options.height
  })

  setupStage(app, self)

  app.ticker.add(() => {
    const absX = Math.abs(options.XYuv[0] * MAX_ANGLE_HALF)

    if (self.properties.angle === undefined) return

    self.properties.degress = options.XYuv[0] * MAX_ANGLE
    self.properties.horiz = options.XYuv[1] * (MAX_ANGLE_HALF - absX)
    self.properties.angle = options.XYuv[1] * absX
  })

  const layers = initLayers(app, self, options)

  getData(elements, layers) // Applies element information (coordinates and indices) and runs callback

  setTimeout(() => {
    self.$root.$refs.avatar.parentNode.replaceChild(app.view, self.$root.$refs.avatar)
  }, SECOND)
}
