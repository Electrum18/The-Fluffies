export default function(ifs, type, state, { mirror, absAngle }) {
  if (state.male) {
    if (type === 'eye_left_lashes' || type === 'eye_right_lashes') return true
  } else if (type === 'eye_left_lashes' && absAngle > 0.9) {
    return true
  }

  if (ifs) {
    if (mirror && ifs.includes('piercing')) {
      let alterIf

      if (ifs.includes('left')) {
        alterIf = ifs.split('left').join('right')
      }

      if (ifs.includes('right')) {
        alterIf = ifs.split('right').join('left')
      }

      if (!state[alterIf]) return true
    } else if (!state[ifs]) {
      return true
    }
  }
}
