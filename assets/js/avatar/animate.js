import { morph, schemeMorph } from './morphs'

function interpolate(
  { emotions },
  elements,
  keys,
  calculated,

  { absAngle, shiftMul, interpolationScheme, getProper }
) {
  for (let j = 0; j < keys.length; j++) {
    const paths = elements[keys[j]]

    let [pow, mul] = [1, 1]

    if (shiftMul[keys[j]] === 1.5) {
      if (absAngle > 0.26) {
        ;[pow, mul] = [1.5, 1]
      } else {
        ;[pow, mul] = [1, 1.55]
      }
    } else if (shiftMul[keys[j]]) {
      pow = shiftMul[keys[j]]
    }

    if (paths.length) {
      const fullRange = (1 - absAngle ** (1 / pow) * mul) * (paths.length - 1)

      const frame = fullRange | 0
      const range = fullRange - frame

      const scheme = interpolationScheme[keys[j]]

      if (scheme) {
        schemeMorph(
          { paths, frame, range, key: keys[j] },
          emotions,
          scheme,
          calculated,
          getProper
        )
      } else {
        calculated[keys[j]] = morph(paths[frame], paths[frame + 1], range)
      }
    }
  }
}

function interpolationCalculate(elemsList, args) {
  const calculated = {}

  for (let i = 0; i < elemsList.keys.length; i++) {
    const elements = elemsList[elemsList.keys[i]]

    if (elements.name) {
      const elemsInner = elements[elements.name]

      interpolate(elemsList, elemsInner, elemsInner.keys, calculated, args)
    } else if (elements.keys) {
      interpolate(elemsList, elements, elements.keys, calculated, args)
    }
  }

  return calculated
}

function changeCanvas(self) {
  const ctx = self.ctx

  ctx.canvas.width = Math.round(1024 * self.quality * 2)
  ctx.canvas.height = Math.round(1024 * self.quality * 1.25)

  ctx.lineCap = ctx.lineJoin = 'round'
}

export default function() {
  if (!this.executeAnimation) {
    // Does not calculate with the same paths

    const delay = 10

    if (this.afterChange < delay) this.afterChange++

    this.fullQuality = this.afterChange >= delay
    this.executeAnimation = this.fullQuality && this.quality < 1

    if (this.executeAnimation) {
      const slot = +localStorage.getItem('slot')
      const save = JSON.parse(localStorage.getItem('avatars'))

      save[slot] = {
        propers: this.getProper,
        color: this.getColor,
        horiz: this.horiz,
        angle: this.angle,
        degress: this.degress
      }

      localStorage.setItem('avatars', JSON.stringify(save))
    }

    window.requestAnimationFrame(this.animate)

    return
  }

  this.quality = !this.fullQuality ? this.vmin / 1024 / 2 : 1

  changeCanvas(this)

  let absAngle = this.degress / 90

  if (absAngle < 0) absAngle = -absAngle
  if (absAngle <= 0.001 && absAngle >= -0.001) absAngle = 0.001

  const hairs = this.paths.hairs

  if (hairs[hairs.name]) {
    this.executeAnimation = false // All elements loaded and drawn
  }

  if (!this.fullQuality) this.afterChange = 0 // Reach full quality & reset timer

  const args = {
    absAngle,
    shiftMul: this.shiftMul,
    interpolationScheme: this.interpolationScheme,
    getProper: this.getProper
  }

  const interpolation = interpolationCalculate(this.paths, args)

  this.draw(this, interpolation, absAngle)

  window.requestAnimationFrame(this.animate)
}
