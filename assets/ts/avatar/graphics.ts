import { ICalculated } from '~/types/paths'
import {
  IDrawProps,
  IWind,
  IWindPropers,
  IWindElemArray,
  IWindElem,
  IColor,
  IMirror,
  TAngle,
  TPosition,
  TClip
} from '~/types/graphics'

import { IObject } from '~/types/basic'

function notNull(value: any) {
  return value !== null && value !== undefined
}

type TDefinedPosition = [number, number]
type TDefinedAngle = [number, TDefinedPosition]

function draw(
  ctx: CanvasRenderingContext2D,
  { male, hair_name_en: hairName, tail_name_en: tailName }: IDrawProps,
  quality: number,
  calculated: ICalculated,
  wind: IWind,
  windPropers: IWindPropers
)
: (element: string) => void
{
  return function(element: string): void {
    const name = male && calculated['male_' + element] ? 'male_' + element : element
    const curves = calculated[name]
    const toRad = Math.PI / 180

    let windOffsetPoints: IWindElemArray | undefined

    if (wind[name]) {
      const HairName = hairName
        .toLowerCase()
        .split(' ')
        .join('_')

      const TailName = tailName
        .toLowerCase()
        .split(' ')
        .join('_')

      if ((wind[name] as IWindElem)[HairName]) {
        windOffsetPoints = (wind[name] as IWindElem)[HairName]
      } else if ((wind[name] as IWindElem)[TailName]) {
        windOffsetPoints = (wind[name] as IWindElem)[TailName]
      } else if (wind[name].constructor === Array) {
        windOffsetPoints = (wind as IWindElem)[name]
      }
    }

    if (!(curves ?? false)) return

    for (let i = 0; i < curves.length; i++) {
      const [command] = curves[i] as string

      let [, x1, y1, x2, y2, x3, y3] = curves[i] as number[]
      let windVector = 0

      if (windPropers.enabled) {
        if (windOffsetPoints && notNull(windOffsetPoints[i])) {
          windVector = Math.sin(
            (windPropers.cycle + ((windOffsetPoints as number[])[i]) * 45) * toRad
          )

          windVector *= 8 * quality

          if (name === 'tail' || name === 'tail_second') windVector *= -1
          if (name === 'eye_left_lashes' || name === 'eye_right_lashes') windVector /= 2
        }
      }

      x1 *= quality
      y1 *= quality
      x2 *= quality
      y2 *= quality
      x3 *= quality
      y3 *= quality

      if (command === 'C') {
        ctx.bezierCurveTo(x1, y1, x2, y2, x3 + windVector, y3)
      } else {
        // If the item is not the first
        if (i > 0) {
          ctx.fill()
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.moveTo(x1 + windVector, y1)
      }
    }
  }
}

function graphics(
  ctx: CanvasRenderingContext2D,
  globals: IDrawProps,
  quality: number,
  calculated: ICalculated,
  wind: IWind,
  windPropers: IWindPropers
) {
  return {
    notNull,

    Clip(elements: any): void {
      if (!(elements ?? false)) return

      ctx.save()

      let clear = false

      function compute(elemIn: string, position = [0, 0]) {
        let elem

        if (elemIn[0] === '!') {
          clear = true

          elem = elemIn.replace('!', '')
        } else {
          elem = elemIn
        }

        const [X, Y] = position

        if (notNull(X) && notNull(Y)) {
          ctx.translate(-X, -Y)

          draw(ctx, globals, quality, calculated, wind, windPropers)(elem)

          if (clear) {
            const { width, height } = ctx.canvas

            ctx.rect(0, 0, width, height)
          }

          ctx.translate(X, Y)
        } else {
          draw(ctx, globals, quality, calculated, wind, windPropers)(elem)
        }
      }

      if (elements[0][0][2]) {
        for (let i = 0; i < elements.length; i++) {
          compute(elements[0][i], elements[1])
        }
      } else {
        compute(elements[0] as string, elements[1])
      }

      if (clear) {
        ctx.clip('evenodd')
      } else {
        ctx.clip()
      }
    },

    Draw: draw(ctx, globals, quality, calculated, wind, windPropers),

    Fill(fill: IColor | string = 'transparent'): void {
      const { h, s, l, a } = fill as IColor

      if (notNull(h) && notNull(s) && notNull(l) && notNull(a)) {
        ctx.fillStyle = 'hsla(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%, ' + a + ')'
      } else if (notNull(h) && notNull(s) && notNull(l)) {
        ctx.fillStyle = 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'
      } else {
        ctx.fillStyle = fill as string
      }
    },

    Stroke([lineWidth, strokeVal]: [number, IColor | string | undefined] = [0, 'transparent']): void {
      ctx.lineWidth = lineWidth * quality

      const { h, s, l, a } = strokeVal as IColor

      if (notNull(h) && notNull(s) && notNull(l) && notNull(a)) {
        ctx.strokeStyle = 'hsla(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%, ' + a + ')'
      } else if (notNull(h) && notNull(s) && notNull(l)) {
        ctx.strokeStyle = 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'
      } else {
        ctx.strokeStyle = strokeVal as string
      }
    }
  }
}

function transforming(
  ctx: CanvasRenderingContext2D,
  quality: number
) {
  return {
    Angle([angle, [shiftX, shiftY]]: TDefinedAngle): void {
      const qIn = quality

      const {
        canvas: { width, height }
      } = ctx

      const X = (width / 4) * 0.9
      const Y = (height / 2) * 0.8

      ctx.translate(X + shiftX * qIn, Y + shiftY * qIn)
      ctx.rotate(angle * (Math.PI / 180))
      ctx.translate(-X - shiftX * qIn, -Y - shiftY * qIn)
    }
  }
}

export default function(
  ctx: CanvasRenderingContext2D,
  quality: number,
  globals: IDrawProps,
  mirror: IMirror,
  absAngle: number,
  calculated: ICalculated,
  wind: IWind,
  windPropers: IWindPropers,
  position: IObject
) {
  const { Angle } = transforming(ctx, quality)
  const { Fill, Stroke, Draw, Clip } = graphics(
    ctx,
    globals,
    quality,
    calculated,
    wind,
    windPropers
  )

  return {
    Layer(
      translate: TPosition[] | TPosition | undefined,
      angle: TAngle[] | TAngle,
      callback: (globals: IDrawProps) => void
    ) {
      const scale = position.scale * 0.7

      const pos = {
        x: (position.horizontal * 11) + 608,
        y: (position.vertical * 5) - 64
      }

      const shift = (absAngle ** 0.5) * (mirror ? -200 : 200)

      const degToRad = Math.PI / 180

      ctx.setTransform(
        mirror ? -scale : scale,
        0,
        0,
        scale,
        (512 + pos.x + shift) * quality,
        (512 + pos.y) * quality
      )

      ctx.rotate(mirror ? (360 - position.angle) * degToRad : position.angle * degToRad)
      ctx.translate(-512 * quality, -512 * quality)

      if (translate && angle) {
        if (
          notNull((translate as TDefinedPosition[])[0][0]) &&
          notNull((angle as TDefinedAngle[])[0][0])
        ) {
          const length = translate.length + angle.length

          let j = 0

          for (let i = 0; i < length; i++) {
            if (i % 2 === 0) {
              const [X, Y] = translate[j] as TDefinedPosition

              ctx.translate(X, Y)
            } else {
              Angle(angle[j] as TDefinedAngle)

              j = j + 1
            }
          }
        } else {
          const [X, Y] = translate as TDefinedPosition

          ctx.translate(X, Y)

          Angle(angle as TDefinedAngle)
        }
      } else {
        if (translate) {
          const [X, Y] = translate as TDefinedPosition

          ctx.translate(X, Y)
        }

        if (angle) Angle(angle as TDefinedAngle)
      }

      callback(globals)
    },

    Elem(
      element: string,
      fill?: string | IColor,
      stroke?: [number, string | IColor | undefined],
      clip?: TClip
    ) : void {
      Clip(clip)
      Fill(fill)
      Stroke(stroke)
      Draw(element)

      ctx.fill()
      ctx.stroke()
      ctx.restore()
    }
  }
}
