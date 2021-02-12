const earcut = require('earcut')

const MINIMAL_VALUE = 0.01

// Creating indexes from polygon
exports.createIds = (points, startLength) => {
  const data = earcut.flatten([points])

  return earcut(data.vertices, data.holes, data.dimensions).map((item) => item + startLength)
}

// Creates a separate buffer for stroke identifiers
exports.createLineIds = (length, looped, startPoint) => {
  const indexes = []
  const len = length - 2
  const looplen = len - (looped ? 2 : 0)

  for (let i = 0; i < looplen; i += 2) {
    indexes.push(
      i + startPoint,
      i + 1 + startPoint,
      i + 2 + startPoint,
      i + 1 + startPoint,
      i + 2 + startPoint,
      i + 3 + startPoint
    )
  }

  if (looped) {
    indexes.push(looplen + startPoint, looplen + 1 + startPoint, 0, looplen + 1 + startPoint, 0, 1)
  }

  return indexes
}

// Getting count of subdivisions from path length
exports.createSubdiv = (bezier, quality) => {
  return Math.ceil(Math.round(bezier.length()) / quality) + 1
}

// Creating coordinate points from a path
exports.createPoints = (bezier, subdivLength, outline) => {
  const meshArray = {
    points: [],
    flat: [],
    linePoints: []
  }

  // Loop over points using subdivision length
  for (let j = 0; j < subdivLength; j++) {
    const percent = j / subdivLength
    const point = bezier.get(percent)

    meshArray.points.push([point.x, point.y])
    meshArray.flat.push(Math.round(point.x), Math.round(point.y))

    // Geting points if path has a outline
    if (outline) {
      const linePercent = j / (subdivLength - 1)
      const point = bezier.get(linePercent)
      const normal = bezier.normal(
        (j === 0 ? MINIMAL_VALUE : 0) + linePercent - (linePercent === 1 ? MINIMAL_VALUE : 0)
      )

      meshArray.linePoints.push(
        Math.round(point.x + outline * normal.x),
        Math.round(point.y + outline * normal.y),
        Math.round(point.x - outline * normal.x),
        Math.round(point.y - outline * normal.y)
      )
    }
  }

  return meshArray
}
