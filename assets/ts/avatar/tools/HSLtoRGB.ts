import { TRGBA } from '~/types/graphics'

const MAX_ANGLE = 360
const HALF = 0.5

const THIRD = 1 / 3
const TWO_THIRDS = 2 / 3
const COLORS_COUNT = 6

// Converts a hue to a color channel
function hueToColor(p: number, q: number, t: number): number {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / COLORS_COUNT) return p + (q - p) * COLORS_COUNT * t
  if (t < HALF) return q
  if (t < TWO_THIRDS) return p + (q - p) * (TWO_THIRDS - t) * COLORS_COUNT

  return p
}

// HSL to RGB conversion
interface IHSLA {
  h: number
  s: number
  l: number
  a: number
}

export function hslToRgb({ h, s, l, a = 1 }: IHSLA): TRGBA {
  if (s === 0) return [l, l, l, a] // Achromatic

  h /= MAX_ANGLE

  const q = l < HALF ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  return [hueToColor(p, q, h + THIRD), hueToColor(p, q, h), hueToColor(p, q, h - THIRD), a]
}
