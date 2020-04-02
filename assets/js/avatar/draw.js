import If from './drawing/if'
import Clip from './drawing/clip'
import Stroke from './drawing/stroke'
import Fill from './drawing/fill'

export default function(self, calculated, absAngle) {
  // Caching

  const ctx = self.ctx

  const x = self.x
  const quality = self.quality

  const state = self.getProper
  const getColor = self.getColor

  const horiz = self.horiz

  const mirror = self.mirror

  const center = {
    x: ctx.canvas.width / 4,
    y: (ctx.canvas.height / 2) * 0.8
  }

  function setAng(ang, [shiftX, shiftY], ratio) {
    const qIn = quality * ratio
    const { x, y } = center

    ctx.translate(x + shiftX * qIn, y + shiftY * qIn)
    ctx.rotate(ang * (Math.PI / 180))
    ctx.translate(-x - shiftX * qIn, -y - shiftY * qIn)
  }

  // Shifts ratio

  let posX, scaleX, hoovesSide

  if (mirror) {
    posX = 3 / 4
    scaleX = -1

    hoovesSide = { left: 'hooves_right_', right: 'hooves_left_' }
  } else {
    posX = 1 / 4
    scaleX = 1

    hoovesSide = { left: 'hooves_left_', right: 'hooves_right_' }
  }

  // Left hooves

  const shoulderLRise = state[hoovesSide.left + 'shoulder_rise']
  const shoulderLAngle = state[hoovesSide.left + 'shoulder_angle']

  const elbowLRise = state[hoovesSide.left + 'elbow_rise']
  const elbowLAngle = state[hoovesSide.left + 'elbow_angle']

  const wristLRise = state[hoovesSide.left + 'wrist_rise']
  const wristLAngle = state[hoovesSide.left + 'wrist_angle']

  // Right hooves

  const shoulderRRise = state[hoovesSide.right + 'shoulder_rise']
  const shoulderRAngle = state[hoovesSide.right + 'shoulder_angle']

  const elbowRRise = state[hoovesSide.right + 'elbow_rise']
  const elbowRAngle = state[hoovesSide.right + 'elbow_angle']

  const wristRRise = state[hoovesSide.right + 'wrist_rise']
  const wristRAngle = state[hoovesSide.right + 'wrist_angle']

  // Getting an array of elements from an array of layers

  const layers = self.layers

  for (let i = 0; i < layers.length; i++) {
    const height = state.hooves_enable ? 80 : 112

    const { layer, elems, rotate } = layers[i]

    ctx.setTransform(
      scaleX,
      0,
      0,
      1,
      ctx.canvas.width * posX,
      height * quality * 2
    )

    // Layer transformation

    if (rotate === 'head') {
      setAng(self.angle, [0, 0], 0)

      // Arms
    } else if (['left_forearm', 'left_tibia', 'left_wrist'].includes(layer)) {
      ctx.translate(-(absAngle ** 0.25) * 150 * quality, 0)

      setAng(shoulderLAngle * (mirror ? -1 : 1), [65, 325], 1.5)
    } else if (
      ['right_forearm', 'right_tibia', 'right_wrist'].includes(layer)
    ) {
      ctx.translate(-(absAngle ** 0.25) * 33 * quality, 0)

      setAng(shoulderRAngle * (mirror ? -1 : 1), [-65, 325], 1.5)
    }

    // Tibia's

    if (layer === 'left_tibia' || layer === 'left_wrist') {
      setAng(
        elbowLAngle * (mirror ? -1 : 1),
        [71, 350 - shoulderLRise * 2.22],
        1.4
      )
    } else if (layer === 'right_tibia' || layer === 'right_wrist') {
      setAng(
        elbowRAngle * (mirror ? -1 : 1),
        [-71, 350 - shoulderRRise * 2.22],
        1.4
      )
    }

    // Wrists

    if (layer === 'left_wrist') {
      setAng(
        wristLAngle * (mirror ? -1 : 1),
        [86, 350 - (elbowLRise * 2.5 + shoulderLRise * 1.65)],
        1.4
      )
    } else if (layer === 'right_wrist') {
      setAng(
        wristRAngle * (mirror ? -1 : 1),
        [-86, 350 - (elbowRRise * 2.5 + shoulderRRise * 1.65)],
        1.4
      )
    }

    // Layers

    if (layer === 'left_tibia') {
      ctx.translate(0, -(shoulderLRise - elbowLRise) * 3 * quality)
    } else if (layer === 'right_tibia') {
      ctx.translate(0, -(shoulderRRise - elbowRRise) * 3 * quality)
    } else if (layer === 'left_wrist') {
      ctx.translate(
        15 *
          (1 - wristLRise / 100) *
          (shoulderLRise / 500 + elbowLRise / 120) *
          (1 - wristLRise / 200) *
          quality,
        -(shoulderLRise + elbowLRise - wristLRise * 2) * 3 * quality
      )
    } else if (layer === 'right_wrist') {
      ctx.translate(
        -(15 * (1 - wristRRise / 100)) *
          ((shoulderRRise / 500 + elbowRRise / 120) *
            (1 - wristRRise / 200) *
            quality),
        -(shoulderRRise + elbowRRise - wristRRise * 2) * 3 * quality
      )
    }

    if (layer === 'head') {
      ctx.translate(0, -horiz * 20 * quality)
    } else if (layer === 'eye_left_brow') {
      const side = x < 0 ? 'right' : 'left'

      ctx.translate(
        0,
        (-horiz * 20 - state['eyes_brows_' + side + '_height'] / 5) * quality
      )
    } else if (layer === 'eye_right_brow') {
      const side = x < 0 ? 'left' : 'right'

      ctx.translate(
        0,
        (-horiz * 20 - state['eyes_brows_' + side + '_height'] / 5) * quality
      )
    } else if (layer === 'head2') {
      ctx.translate(0, horiz * 10 * quality)
    }

    if (layer === 'eye_left' || layer === 'eye_right') {
      const mirrored = mirror ? -1 : 1

      const inHoriz = (state.eyes_position_horiz - 50) / 1.5
      const inVerti = (state.eyes_position_verti - 50) / 1.5

      ctx.translate(
        inHoriz * quality * mirrored,
        (-horiz * 20 - inVerti) * quality
      )
    } else if (layer === 'teeth_upper') {
      const upper = (100 - state.teeth_upper) / 3

      ctx.translate(upper * absAngle * quality, (-horiz * 20 - upper) * quality)
    } else if (layer === 'teeth_lower') {
      const lower = (100 - state.teeth_lower) / 3

      ctx.translate(
        -lower * absAngle * quality,
        (-horiz * 20 + lower) * quality
      )
    }

    // Work with array of elements

    for (let i = 0; i < elems.length; i++) {
      const elem = elems[i]

      if (!calculated[elem.type]) continue

      if (If(elem.if, elem.type, state, { mirror, absAngle })) continue

      Clip(elem.clip, ctx, state, {
        horiz,
        quality,
        calculated,
        layer,
        mirror,
        absAngle
      })

      Fill(elem.fill, ctx, { getColor, mirror })

      Stroke(elem.stroke, elem.type, ctx, state, {
        getColor,
        quality,
        x
      })

      // Checking for male elements

      let type

      if (state.male) {
        type = calculated['male_' + elem.type] ? 'male_' + elem.type : elem.type
      } else {
        type = elem.type
      }

      // Drawing the elements themselves

      const calcType = calculated[type]

      for (let i = 0; i < calcType.length; i++) {
        const part = calcType[i]

        if (part[0] === 'C') {
          ctx.bezierCurveTo(
            part[1] * quality,
            part[2] * quality,
            part[3] * quality,
            part[4] * quality,
            part[5] * quality,
            part[6] * quality
          )
        } else {
          if (i > 0) {
            // If the item is not the first

            ctx.fill()
            ctx.stroke()
          }

          ctx.beginPath()
          ctx.moveTo(part[1] * quality, part[2] * quality)
        }
      }

      // Apply context settings

      ctx.fill()
      ctx.stroke()
      ctx.restore()
    }
  }
}
