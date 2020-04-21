import { morph, schemeMorph } from './morphs'

function interpolate(
  { emotions },
  elements,
  keys,
  calculated,

  { absAngle, shiftMul, interpolationScheme, properties }
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
          properties
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
    this.executeAnimation = this.fullQuality && this.quality !== 1

    if (this.executeAnimation) {
      const slot = +localStorage.getItem('slot')
      const save = JSON.parse(localStorage.getItem('avatars'))

      const { globals, properties, getColor: color } = this

      save[slot] = {
        globals,
        propers: properties,
        color
      }

      localStorage.setItem('avatars', JSON.stringify(save))

      // Setting animation frame save

      const slot2 = +localStorage.getItem('animationSlot')
      const animations = JSON.parse(localStorage.getItem('animations'))

      animations[slot2].frames[this.getFrame].frame = properties

      localStorage.setItem('animations', JSON.stringify(animations))

      if (this.getPlayChangedFrame) {
        this.setPlayRedraw()
        this.resetPlayChangedFrame()
      }
    }

    window.requestAnimationFrame(this.animate)

    return
  }

  this.fps.ticker++

  if (this.fps.ticker >= this.fps.every) {
    this.fps.ticker = 0

    this.quality = !this.fullQuality ? this.targetQuality / 1.25 : 1

    changeCanvas(this)

    let absAngle = this.degress / 90

    if (absAngle < 0) absAngle = -absAngle
    if (absAngle <= 0.001 && absAngle >= -0.001) absAngle = 0.001

    const hairs = this.paths.hairs

    if (hairs[hairs.name]) {
      this.executeAnimation = false // All elements loaded and drawn
    }

    const { shiftMul, interpolationScheme, properties } = this

    const args = { absAngle, shiftMul, interpolationScheme, properties }
    const interpolation = interpolationCalculate(this.paths, args)

    this.draw(this, interpolation, absAngle)

    if (this.rendering) {
      const avatar = this.$refs.avatar
      const ratio = avatar.width / avatar.height

      const canvas = document.createElement('canvas')

      const dimensions = this.setQuality(this.targetQuality)

      let width = dimensions[0]
      let height = dimensions[1]

      // Canvas setting

      canvas.width = width
      canvas.height = height

      // Setting at center

      width = canvas.width
      height = width / ratio

      if (height > canvas.height) {
        height = canvas.height
        width = canvas.height * ratio
      }

      width *= 1.25

      const xOffset = (canvas.width - width) / 2
      const yOffset = canvas.height - height * 1.125

      height *= 1.25

      // Drawing image over background at bottom-center

      const ctx = canvas.getContext('2d')

      const { h, s, l, a } = this.getColor.background_basic

      ctx.fillStyle = a
        ? 'hsla(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%, ' + a + ')'
        : 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'

      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(avatar, xOffset, yOffset, width, height)

      this.gif.addFrame(ctx, {
        copy: true,
        delay: this.fps.every * 16.666
      })
    }
  }

  if (!this.fullQuality) this.afterChange = 0 // Reach full quality & reset timer

  window.requestAnimationFrame(this.animate)
}
