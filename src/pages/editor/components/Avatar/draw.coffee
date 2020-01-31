import Stroke from "./drawing/stroke.coffee"
import Fill from "./drawing/fill.ts"

export default ->

  # Caching

  last = @last
  quality = @quality
  ctx = @ctx

  x = @x

  calculated = @calculated
  state = @state
  getColor = @color
  horiz = @horiz
  angle = @angle
  mirror = @mirror
  hooves = @state.hooves


  absAngle = if x < 0 then -x else x
  toRad    = Math.PI / 180


  capitalize = (text) ->
    text.charAt(0).toUpperCase() + text.slice(1)


  # Ear display calculation

  state.ear.isFront = if absAngle < 1 / 3 and horiz > 0.1 then off else on
  state.ear.isBack  = !state.earFront


  if mirror
    posX   = 3 / 4
    scaleX = -1
  else
    posX   = 1 / 4
    scaleX = 1


  rotatable = [
    "head", "head2", "chin", "hair", "glasses",
    "eyeLeft", "eyeLeftBrow", "eyeRight", "eyeRightBrow",
    "teethUpper", "teethLower"
  ]

  for elems in @layers  # Getting an array of elements from an array of layers
    layer = elems[0]

    if hooves.enable
      height = 80
    else
      height = 112


    # Layer set & reset position

    ctx.setTransform scaleX, 0, 0, 1, ctx.canvas.width * posX, height * quality * 2


    elbowL    = hooves.left.elbow.rise
    shoulderL = hooves.left.shoulder.rise
    wristL    = hooves.left.wrist.rise

    elbowR    = hooves.right.elbow.rise
    shoulderR = hooves.right.shoulder.rise
    wristR    = hooves.right.wrist.rise


    # Layer transformation

    if layer in rotatable
      ctx.translate  (ctx.canvas.width / 2) * (1 / 2),  ctx.canvas.height / 2 * (4 / 5)
      ctx.rotate angle * toRad
      ctx.translate -(ctx.canvas.width / 2) * (1 / 2), -ctx.canvas.height / 2 * (4 / 5)


    else if layer in ["leftForearm", "leftTibia", "leftWrist"]
      ctx.translate -(absAngle ** 0.25) * 150 * quality, 0

      ctx.translate ((ctx.canvas.width / 2) * (1 / 2)) + 65 * (quality * 1.5),
        ctx.canvas.height / 2 * (4 / 5) + 325 * (quality * 1.5)

      ctx.rotate hooves.left.shoulder.angle * toRad

      ctx.translate -((ctx.canvas.width / 2) * (1 / 2)) - 65 * (quality * 1.5),
        -ctx.canvas.height / 2 * (4 / 5) - 325 * (quality * 1.5)

    else if layer in ["rightForearm", "rightTibia", "rightWrist"]
      ctx.translate -(absAngle ** 0.25) * 33 * quality, 0

      ctx.translate  (ctx.canvas.width / 2) * (1 / 2) - 65 * (quality * 1.5),
        ctx.canvas.height / 2 * (4 / 5) + 325 * (quality * 1.5)

      ctx.rotate hooves.right.shoulder.angle * toRad

      ctx.translate -(ctx.canvas.width / 2) * (1 / 2) + 65 * (quality * 1.5),
        -ctx.canvas.height / 2 * (4 / 5) - 325 * (quality * 1.5)


    if layer in ["leftTibia", "leftWrist"]
      ctx.translate ((ctx.canvas.width / 2) * (1 / 2)) + 71 * (quality * 1.4),
        ctx.canvas.height / 2 * (4 / 5) + (350 - (shoulderL * 2.22)) * (quality * 1.4)

      ctx.rotate hooves.left.elbow.angle * toRad

      ctx.translate -((ctx.canvas.width / 2) * (1 / 2)) - 71 * (quality * 1.4),
        -ctx.canvas.height / 2 * (4 / 5) - (350 - (shoulderL * 2.22)) * (quality * 1.4)

    else if layer in ["rightTibia", "rightWrist"]
      ctx.translate  (ctx.canvas.width / 2) * (1 / 2) - 71 * (quality * 1.4),
        ctx.canvas.height / 2 * (4 / 5) + (350 - (shoulderR * 2.22)) * (quality * 1.4)

      ctx.rotate hooves.right.elbow.angle * toRad

      ctx.translate -(ctx.canvas.width / 2) * (1 / 2) + 71 * (quality * 1.4),
        -ctx.canvas.height / 2 * (4 / 5) - (350 - (shoulderR * 2.22)) * (quality * 1.4)


    if layer is "leftWrist"
      ctx.translate  (ctx.canvas.width / 2) * (1 / 2) + 86 * (quality * 1.4),
        ctx.canvas.height / 2 * (4 / 5) + (350 - ((elbowL * 2.5) + (shoulderL * 1.65))) * (quality * 1.4)

      ctx.rotate hooves.left.wrist.angle * toRad

      ctx.translate -(ctx.canvas.width / 2) * (1 / 2) - 86 * (quality * 1.4),
        -ctx.canvas.height / 2 * (4 / 5) - (350 - ((elbowL * 2.5) + (shoulderL * 1.65))) * (quality * 1.4)

    else if layer is "rightWrist"
      ctx.translate  (ctx.canvas.width / 2) * (1 / 2) - 86 * (quality * 1.4),
        ctx.canvas.height / 2 * (4 / 5) + (350 - ((elbowR * 2.5) + (shoulderR * 1.65))) * (quality * 1.4)

      ctx.rotate hooves.right.wrist.angle * toRad

      ctx.translate -(ctx.canvas.width / 2) * (1 / 2) + 86 * (quality * 1.4),
        -ctx.canvas.height / 2 * (4 / 5) - (350 - ((elbowR * 2.5) + (shoulderR * 1.65))) * (quality * 1.4)


    if layer is "head"
      ctx.translate 0, -horiz * 20 * quality

    else if layer is "eyeLeftBrow"
      if x < 0
            side = "right"
      else side = "left"

      ctx.translate 0, -horiz * 20 * quality - parseInt(state.eyes.brows[side].height / 7)

    else if layer is "eyeRightBrow"
      if x < 0
            side = "left"
      else side = "right"

      ctx.translate 0,
        -horiz * 20 * quality - parseInt(state.eyes.brows[side].height / 7)

    else if layer is "head2"
      ctx.translate 0,
        horiz * 10 * quality

    else if layer is "leftTibia"
      ctx.translate 0, -(shoulderL - elbowL) * 3 * quality

    else if layer is "rightTibia"
      ctx.translate 0, -(shoulderR - elbowR) * 3 * quality

    else if layer is "leftWrist"
      ctx.translate ((15 * (1 - (wristL / 100))) * (((shoulderL / 500) + (elbowL / 120)) * (1 - (wristL / 200)))),
        -(shoulderL + elbowL - (wristL * 2)) * 3 * quality

    else if layer is "rightWrist"
      ctx.translate -((15 * (1 - (wristR / 100))) * (((shoulderR / 500) + (elbowR / 120)) * (1 - (wristR / 200)))),
        -(shoulderR + elbowR - (wristR * 2)) * 3 * quality


    if layer in ["eyeLeft", "eyeRight"]
      mirrored = if mirror then -1 else 1

      ctx.translate(
        (((state.eyes.position.horiz - 50) / 1.5) * mirrored),
        (-horiz * 20 * quality) - ((state.eyes.position.verti - 50) / 1.5)
      )

    else if layer is "teethUpper"
      ctx.translate(
        ((100 - state.teeth.upper) / 3) * absAngle,
        (-horiz * 20 * quality) - ((100 - state.teeth.upper) / 3)
      )

    else if layer is "teethLower"
      ctx.translate(
        -((100 - state.teeth.lower) / 3) * absAngle,
        (-horiz * 20 * quality) + ((100 - state.teeth.lower) / 3)
      )


    # Work with array of elements

    for elem in elems[1]

      # Permission check for drawing an element

      if not calculated[elem.type] then continue

      if elem.type is "eyeLeftLashes"  and (absAngle > 0.9 or state.male) then continue
      if elem.type is "eyeRightLashes" and state.male then continue


      if elem.if
        if typeof elem.if isnt "string"
          if elem.if[2] and elem.if[2][1]
            if not state[elem.if[0]][elem.if[1]][elem.if[2]] then continue

            if elem.if[0] is "piercings"
              if mirror
                sidePiercing = { left: "right", right: "left" }
              else
                sidePiercing = { left: "left", right: "right" }

              if not state[elem.if[0]][sidePiercing[elem.if[1]]][elem.if[2]] then continue
              else if not state[elem.if[0]][sidePiercing[elem.if[1]]].enable then continue

          else if not state[elem.if[0]][elem.if[1]] then continue

        else if not state[elem.if] then continue

      # Clip calulations

      if elem.clip
        ctx.save()
        ctx.beginPath()

        for clip in elem.clip  # Getting a clip array
          if clip[0] is "!"
            clear = yes
            clip  = clip.replace "!", ""

          else clear = no

          if clear
            ctx.rect 0, 0, ctx.canvas.width, ctx.canvas.height


          # Clipping transformation

          if clip is "head0"
            ctx.translate 0, -horiz * 12 * quality

          else if clip is "earRight"
            ctx.translate 0, horiz * 10 * quality

          else if clip in ["eyeLeft", "eyeRight"]
            mirrored = if mirror then -1 else 1

            ctx.translate(
              -((((state.eyes.position.horiz - 100) + 50) / 1.5) * mirrored),
              (((state.eyes.position.verti - 100) + 50) / 1.5)
            )

          else if layer is "teethUpper"
            ctx.translate(
              -((100 - state.teeth.upper) / 3) * absAngle,
              ((100 - state.teeth.upper) / 3)
            )

          else if layer is "teethLower"
            ctx.translate(
              ((100 - state.teeth.lower) / 3) * absAngle,
              -((100 - state.teeth.lower) / 3)
            )


          # Creating clipping path

          if calculated[clip]
            for part in calculated[clip]
              if part[0] is "C"
                ctx.bezierCurveTo part[1] * quality, part[2] * quality, part[3] * quality,
                  part[4] * quality, part[5] * quality, part[6] * quality

              else ctx.moveTo part[1] * quality, part[2] * quality


          # Clipping resetting transformation

          if clip is "head0"
            ctx.translate 0, horiz * 12 * quality

          else if clip is "earRight"
            ctx.translate 0, -horiz * 10 * quality

          else if clip in ["eyeLeft", "eyeRight"]
            mirrored = if mirror then -1 else 1

            ctx.translate(
              (((state.eyes.position.horiz) / 3) * mirrored),
              -((state.eyes.position.verti) / 3)
            )

          else if layer is "teethUpper"
            ctx.translate(
              ((100 - state.teeth.upper) / 3) * absAngle,
              -((100 - state.teeth.upper) / 3)
            )

          else if layer is "teethLower"
            ctx.translate(
              -((100 - state.teeth.lower) / 3) * absAngle,
              ((100 - state.teeth.lower) / 3)
            )


        ctx.closePath()
        ctx.clip(if clear then "evenodd")


      Fill(elem.fill, ctx,        { getColor, mirror })
      Stroke(elem,    ctx, state, { getColor, quality, x })


      # Checking for male elements

      if calculated["male" + capitalize(elem.type)] and state.male
            type = "male" + capitalize(elem.type)
      else type = elem.type


      # Drawing the elements themselves

      for part, i in calculated[type]
        if part[0] is "C"
          ctx.bezierCurveTo part[1] * quality, part[2] * quality, part[3] * quality,
            part[4] * quality, part[5] * quality, part[6] * quality
        else
          if i > 0
            ctx.fill()
            ctx.stroke()

          ctx.beginPath()
          ctx.moveTo part[1] * quality, part[2] * quality


      # Apply context settings

      ctx.fill()
      ctx.stroke()
      ctx.restore()

  ###
  ctx.globalCompositeOperation = "source-atop"

  grd = ctx.createLinearGradient(0, 0, ctx.canvas.width / 3, 0)
  grd.addColorStop(0, "#000000aa")
  grd.addColorStop(1, "transparent")

  ctx.fillStyle = grd
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ###