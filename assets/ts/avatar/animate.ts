import {
  ICalculated,
  IPaths,
  IScheme,
  IProperties,
  ICompiledPaths
} from '~/types/paths'

import { morph, schemeMorph } from './morphs'

interface IInterpolateProps {
  absAngle: number
  shiftMul: {
    [index: string]: number
  }
  interpolationScheme: IScheme,
  properties: IProperties
}

function interpolate(
  { emotions }: any,
  elements: ICalculated,
  keys: string[],
  calculated: ICalculated,

  { absAngle, shiftMul, interpolationScheme, properties }: IInterpolateProps
) {
  for (let j = 0; j < keys.length; j++) {
    const paths: IPaths = elements[keys[j]]

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
          emotions as ICalculated,
          scheme as any,
          calculated,
          properties
        )
      } else {
        calculated[keys[j]] = morph(paths[frame] as IPaths, paths[frame + 1] as IPaths, range)
      }
    }
  }
}

function interpolationCalculate(elemsList: ICompiledPaths, args: IInterpolateProps) {
  const calculated = {}

  for (let i = 0; i < elemsList.keys.length; i++) {
    const elements = elemsList[elemsList.keys[i]]

    if (elements.name) {
      const elemsInner = elements[elements.name]

      interpolate(elemsList, elemsInner as ICalculated, elemsInner.keys, calculated, args)
    } else if (elements.keys) {
      interpolate(elemsList, elements as ICalculated, elements.keys, calculated, args)
    }
  }

  return calculated
}

interface IChangeCanvas {
  ctx: CanvasRenderingContext2D,
  quality: number
}

function changeCanvas({ ctx, quality }: IChangeCanvas) {
  ctx.canvas.width = (1024 * quality * 2) | 0
  ctx.canvas.height = (1024 * quality * 1.25) | 0

  ctx.lineCap = ctx.lineJoin = 'round'
}

export default function(this: any) {
  this.fps.ticker++

  if (this.fps.ticker >= this.fps.every) {
    this.fps.ticker = 0

    this.quality = this.targetQuality / 1.25

    changeCanvas(this) // Canvas reset

    // Angle correction

    let absAngle = this.degress / 90

    if (absAngle < 0) absAngle = -absAngle
    if (absAngle <= 0.001 && absAngle >= -0.001) absAngle = 0.001

    // Paths calculation

    const { shiftMul, interpolationScheme, properties } = this

    const args = { absAngle, shiftMul, interpolationScheme, properties }
    const interpolation = interpolationCalculate(this.paths, args)

    // Wind calculation

    this.windPropers.cycle += 5 * this.fps.every

    if (this.windPropers.cycle > 360) this.windPropers.cycle = 0

    // Drawing on canvas

    this.draw(this, interpolation, absAngle)

    // Animation rendering

    if (this.rendering) {
      const avatar = this.$refs.avatar
      const canvas = document.createElement('canvas')
      const dimensions = this.setQuality(this.targetQuality)

      const [widthVar, heightVar] = dimensions

      canvas.width = widthVar
      canvas.height = heightVar

      const [width, height] = [avatar.width * 1.25, avatar.height * 1.25]

      // Setting at center

      const xOffset = (widthVar - width) / 2
      const yOffset = (heightVar - height) / 2

      // Drawing image over background at bottom-center

      const ctx = canvas.getContext('2d')

      const { h, s, l, a } = this.getColor.background_basic

      if (ctx instanceof CanvasRenderingContext2D) {
        ctx.fillStyle = a
          ? 'hsla(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%, ' + a + ')'
          : 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'

        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(avatar, xOffset, yOffset, width, height)
      }

      const frameDuration = 1000 / 60

      this.gif.addFrame(ctx, {
        copy: true,
        delay: this.fps.every * frameDuration
      })
    }
  }

  window.requestAnimationFrame(this.animate)
}
