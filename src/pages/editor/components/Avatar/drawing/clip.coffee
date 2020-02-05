export default (elem, ctx, state, { horiz, quality, calculated, layer, mirror, absAngle }) ->
  if elem.clip

    # Transformation function

    translate = (clip, back, callback) ->
      back = if back then -1 else 1

      if clip is "head0"
        ctx.translate 0, -horiz * back * 12 * quality

      else if clip is "earRight"
        ctx.translate 0, horiz * back * 10 * quality

      else if layer is "teethUpper"
        upper = ((100 - state.teeth.upper) / 3) * back

        ctx.translate(-upper  * absAngle, upper)

      else if layer is "teethLower"
        lower = ((100 - state.teeth.lower) / 3) * back

        ctx.translate(lower * absAngle, -lower)

      else callback()


    # Start drawing clip path

    ctx.save()
    ctx.beginPath()


    # Finding and adjusting a clipping path

    for clip in elem.clip
      if clip[0] is "!"
        clear  = yes
        clip   = clip.replace "!", ""
        canvas = ctx.canvas

        ctx.rect 0, 0, canvas.width, canvas.height


      # Clipping transformation

      translate(clip, false, () ->
        if clip in ["eyeLeft", "eyeRight"]
          mirrored = if mirror then -1 else 1

          { horiz, verti } = state.eyes.position

          ctx.translate(-((horiz - 50) / 1.5) * mirrored, ((verti - 50) / 1.5))
      )


      # Creating clipping path

      if calculated[clip]
        for part in calculated[clip]
          if part[0] is "M"
            ctx.moveTo(part[1] * quality, part[2] * quality)

          else
            ctx.bezierCurveTo(
              part[1] * quality, part[2] * quality,
              part[3] * quality, part[4] * quality,
              part[5] * quality, part[6] * quality
            )


      # Clipping resetting transformation

      translate(clip, true, () ->
        if clip in ["eyeLeft", "eyeRight"]
          mirrored = if mirror then -1 else 1

          { horiz, verti } = state.eyes.position

          ctx.translate(horiz / 3 * mirrored, -(verti / 3))
      )


    # Apply clipping

    ctx.clip(if clear then "evenodd")
