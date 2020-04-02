export default function(fill, ctx, { getColor }) {
  if (fill) {
    if (getColor[fill]) {
      const { h, s, l, a } = getColor[fill]

      const color = a
        ? 'hsla(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%, ' + a + ')'
        : 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'

      ctx.fillStyle = color
    } else {
      ctx.fillStyle = fill
    }
  } else {
    ctx.fillStyle = 'transparent'
  }
}
