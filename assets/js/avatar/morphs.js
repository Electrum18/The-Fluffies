export function morph(a, b, range) {
  const newPath = []

  for (let i = 0; i < a.length; i++) {
    const part = a[i]

    const newPart = []

    for (let j = 0; j < part.length; j++) {
      const point = part[j]

      // Avoiding the move command
      if (j > 0) {
        newPart[j] = (point + (b[i][j] - point) * range) | 0
      } else {
        newPart[j] = point // Setting move command
      }
    }

    newPath[i] = newPart
  }

  return newPath
}

function emotionMorph(emotions, scheme, paths, frame, range, getProper) {
  const path1 = emotions[scheme[0][0]] || paths
  const path2 = emotions[scheme[0][1]] || paths

  return morph(
    morph(path1[frame], path1[frame + 1], range),
    morph(path2[frame], path2[frame + 1], range),

    getProper[scheme[1]] / 100
  )
}

export function schemeMorph(
  { paths, frame, range, key },
  emotions,
  scheme,
  calculated,
  getProper
) {
  const nested = !scheme[0][0][3]

  if (!nested) {
    calculated[key] = emotionMorph(
      emotions,
      scheme,
      paths,
      frame,
      range,
      getProper
    )
  } else {
    calculated[key] = morph(
      emotionMorph(emotions, scheme[0][0], paths, frame, range, getProper),
      emotionMorph(emotions, scheme[0][1], paths, frame, range, getProper),

      getProper[scheme[1]] / 100
    )
  }
}
