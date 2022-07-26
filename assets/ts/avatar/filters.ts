import * as PIXI from 'pixi.js'

import RGBShiftFragmentShader from '~/assets/json/shaders/fragment/filters/rgb-shift.json'
import VignetteFragmentShader from '~/assets/json/shaders/fragment/filters/vignette.json'

const RGB_SHIFT_AMOUNT = 0.2
const VIGNETTE_OPACITY = 0.1

const {
  FXAAFilter,
  AlphaFilter: { defaultVertexSrc }
} = PIXI.filters

// Filter creating function shorthand
function createFilter(fragmentShader: string[], value: number) {
  return new PIXI.Filter(defaultVertexSrc, fragmentShader.join('\n'), { value })
}

// Creates array of fliters for avatar layer
export function applyFilters() {
  return [
    new FXAAFilter(),
    createFilter(RGBShiftFragmentShader, RGB_SHIFT_AMOUNT),
    createFilter(VignetteFragmentShader, VIGNETTE_OPACITY)
  ]
}
