export default (elem, ctx, state, { getColor, quality, x }) ->
  if elem.stroke

    # Finding a path for a stroke variable

    if elem.stroke[1][0][1] and elem.stroke[1][1][1]
      color = getColor[elem.stroke[1][0]][elem.stroke[1][1]]

    else color = elem.stroke[1]

    if elem.type is "hornSecond" and state.horn.notlines
      color = "transparent"


    # Stroke setting

    ctx.strokeStyle = color
    ctx.lineWidth   = elem.stroke[0] * quality

    if elem.type is "eyeLeftBrow"
      if x < 0
            side = "right"
      else side = "left"

      ctx.lineWidth += (state.eyes.brows[side].width - 100) / 10

    else if elem.type is "eyeRightBrow"
      if x < 0
            side = "left"
      else side = "right"

      ctx.lineWidth += (state.eyes.brows[side].width - 100) / 10

    else if elem.type is "glassesLeft"
      ctx.lineWidth += (state.glasses.width - 100) / 10

    else if elem.type is "glassesRight"
      ctx.lineWidth += (state.glasses.width - 100) / 10

    else if elem.type is "glassesNose"
      ctx.lineWidth += (state.glasses.width - 100) / 10

  else ctx.strokeStyle = "transparent"
