function translate(ctx, back, args, callback) {
  const { clipItem, layer, horiz, state, absAngle, quality } = args

  back = back ? -1 : 1

  if (clipItem === 'head0') {
    ctx.translate(0, -horiz * back * 12 * quality)
  } else if (clipItem === 'ear_right') {
    ctx.translate(0, horiz * back * 10 * quality)
  } else if (layer === 'teeth_upper') {
    const upper = ((100 - state.teeth_upper) / 3) * back * quality

    ctx.translate(-upper * absAngle, upper)
  } else if (layer === 'teeth_lower') {
    const lower = ((100 - state.teeth_lower) / 3) * back * quality

    ctx.translate(lower * absAngle, -lower)
  } else {
    callback()
  }
}

export default function(
  clip,
  ctx,
  state,

  { horiz, quality, calculated, layer, mirror, absAngle }
) {
  if (clip) {
    // Start drawing clip path

    ctx.save()
    ctx.beginPath()

    // Finding and adjusting a clipping path

    let clear = false

    for (let i = 0; i < clip.length; i++) {
      let clipItem = clip[i]

      // Reverse statement

      if (clipItem[0] === '!') {
        clear = true

        clipItem = clipItem.replace('!', '')

        const canvas = ctx.canvas

        ctx.rect(0, 0, canvas.width, canvas.height)
      }

      // Clipping transformation

      const args = { clipItem, layer, horiz, state, absAngle, quality }

      translate(ctx, false, args, () => {
        if (clipItem === 'eye_left' || clipItem === 'eye_right') {
          const mirrored = mirror ? -1 : 1

          const inHoriz = (state.eyes_position_horiz - 50) / 1.5
          const inVerti = (state.eyes_position_verti - 50) / 1.5

          ctx.translate(-inHoriz * quality * mirrored, inVerti * quality)
        }
      })

      // Creating clipping path

      calculated = calculated[clipItem]

      if (calculated) {
        for (let i = 0; i < calculated.length; i++) {
          const part = calculated[i]

          if (part[0] === 'M') {
            ctx.moveTo(part[1] * quality, part[2] * quality)
          } else {
            ctx.bezierCurveTo(
              part[1] * quality,
              part[2] * quality,
              part[3] * quality,
              part[4] * quality,
              part[5] * quality,
              part[6] * quality
            )
          }
        }
      }

      // Clipping resetting transformation

      translate(ctx, true, args, () => {
        if (clipItem === 'eye_left' || clipItem === 'eye_right') {
          const mirrored = mirror ? -1 : 1

          const inHoriz = state.eyes_position_horiz / 3
          const inVerti = state.eyes_position_verti / 3

          ctx.translate(inHoriz * quality * mirrored, -inVerti * quality)
        }
      })
    }

    // Apply clipping

    if (clear) {
      ctx.clip('evenodd')
    } else {
      ctx.clip()
    }
  }
}
