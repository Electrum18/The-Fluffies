function notNull(value) {
  return value !== null && value !== undefined
}

function draw(ctx, { male }, quality, calculated) {
  return function(element) {
    const name = male && calculated['male_' + element] ? 'male_' + element : element

    const curves = calculated[name]

    if (!notNull(curves)) return

    for (let i = 0; i < curves.length; i++) {
      const [command] = curves[i]

      let [, x1, y1, x2, y2, x3, y3] = curves[i]

      x1 *= quality
      y1 *= quality
      x2 *= quality
      y2 *= quality
      x3 *= quality
      y3 *= quality

      if (command === 'C') {
        ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3)
      } else {
        // If the item is not the first
        if (i > 0) {
          ctx.fill()
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.moveTo(x1, y1)
      }
    }
  }
}

function graphics(ctx, globals, quality, calculated) {
  return {
    notNull,

    Clip(elements) {
      if (!notNull(elements)) return

      ctx.save()

      let clear = false

      function compute(elemIn, position = [0, 0]) {
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

          draw(ctx, globals, quality, calculated)(elem)

          if (clear) {
            const { width, height } = ctx.canvas

            ctx.rect(0, 0, width, height)
          }

          ctx.translate(X, Y)
        } else {
          draw(ctx, globals, quality, calculated)(elem)
        }
      }

      if (elements[0][0][2]) {
        for (let i = 0; i < elements.length; i++) {
          compute(elements[0][i], elements[1])
        }
      } else {
        compute(elements[0], elements[1])
      }

      if (clear) {
        ctx.clip('evenodd')
      } else {
        ctx.clip()
      }
    },

    Draw: draw(ctx, globals, quality, calculated),
    Fill(fill = 'transparent') {
      const { h, s, l, a } = fill

      if (notNull(h) && notNull(s) && notNull(l) && notNull(a)) {
        ctx.fillStyle = 'hsla(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%, ' + a + ')'
      } else if (notNull(h) && notNull(s) && notNull(l)) {
        ctx.fillStyle = 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'
      } else {
        ctx.fillStyle = fill
      }
    },

    Stroke([lineWidth, strokeVal] = [0, 'transparent']) {
      ctx.lineWidth = lineWidth * quality

      const { h, s, l, a } = strokeVal

      if (notNull(h) && notNull(s) && notNull(l) && notNull(a)) {
        ctx.strokeStyle = 'hsla(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%, ' + a + ')'
      } else if (notNull(h) && notNull(s) && notNull(l)) {
        ctx.strokeStyle = 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'
      } else {
        ctx.strokeStyle = strokeVal
      }
    }
  }
}

function transforming(ctx, quality) {
  return {
    Angle([angle, [shiftX, shiftY], ratio]) {
      const qIn = quality * ratio

      const {
        canvas: { width, height }
      } = ctx

      const X = width / 4
      const Y = (height / 2) * 0.8

      ctx.translate(X + shiftX * qIn, Y + shiftY * qIn)
      ctx.rotate(angle * (Math.PI / 180))
      ctx.translate(-X - shiftX * qIn, -Y - shiftY * qIn)
    }
  }
}

export default function(ctx, quality, globals, mirror, calculated) {
  const { Angle } = transforming(ctx, quality)
  const { Fill, Stroke, Draw, Clip } = graphics(ctx, globals, quality, calculated)

  const height = globals.hooves_enable ? 80 : 112

  return {
    Layer(translate, angle, callback) {
      ctx.setTransform(
        mirror ? -1 : 1,
        0,
        0,
        1,
        ctx.canvas.width * (mirror ? 0.75 : 0.25),
        height * quality * 2
      )

      if (translate && angle) {
        if (notNull(translate[0][0]) && notNull(angle[0][0])) {
          const length = translate.length + angle.length

          let j = 0

          for (let i = 0; i < length; i++) {
            if (i % 2 === 0) {
              const [X, Y] = translate[j]

              ctx.translate(X, Y)
            } else {
              Angle(angle[j])

              j = j + 1
            }
          }
        } else {
          const [X, Y] = translate

          ctx.translate(X, Y)

          Angle(angle)
        }
      } else {
        if (translate) {
          const [X, Y] = translate

          ctx.translate(X, Y)
        }

        if (angle) Angle(angle)
      }

      callback(globals)
    },

    Elem(element, fill, stroke = undefined, clip = undefined) {
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
