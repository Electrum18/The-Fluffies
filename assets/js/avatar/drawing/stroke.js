export default function(
  stroke,
  type,
  ctx,
  state,

  { getColor, quality, x }
) {
  if (stroke) {
    let lineWidth = stroke[0]
    const strokeVal = stroke[1]

    if (type === 'eye_left_brow' || type === 'eye_right_brow') {
      let side

      if (type === 'eye_left_brow') {
        side = x < 0 ? 'right_width' : 'left_width'
      } else {
        side = x < 0 ? 'left_width' : 'right_width'
      }

      lineWidth += (state['eyes_brows_' + side] - 100) / 10
    } else if (
      ['glasses_left', 'glasses_right', 'glasses_nose'].includes(type)
    ) {
      lineWidth += (state.glasses_width - 100) / 10
    }

    if (getColor[strokeVal]) {
      const { h, s, l, a } = getColor[strokeVal]

      const color = a
        ? 'hsla(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%, ' + a + ')'
        : 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'

      ctx.strokeStyle = color
    } else {
      ctx.strokeStyle = strokeVal
    }

    ctx.lineWidth = lineWidth * quality
  } else {
    ctx.strokeStyle = 'transparent'
  }
}
