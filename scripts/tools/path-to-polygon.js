const { Bezier } = require('bezier-js/dist/bezier.common.cjs')

const emotionsMap = require('../config/emotions-map.json')
const { createSubdiv, createPoints } = require('./creating')

const QUALITY = 13 // pixels

const subdivs = {}

// Translation paths from svg format to buffers
exports.pathToPolygon = (elementName, array, outline) => {
  const meshArray = {
    points: [],
    flat: [],
    line: { points: [] }
  }

  let name = elementName.match(/emotion_(.*)/)

  name = (name && name[1]) || elementName

  let fillArray = false
  let subdivIndex = -1

  // Creating array for saving the subdivision.
  if (!emotionsMap[name] && subdivs[name] === undefined) {
    subdivs[name] = []

    fillArray = true
  }

  // Loop over curves of array
  for (let i = 0; i < array.length; i++) {
    const curve = array[i]
    const prevCurve = array[i - 1]

    if (curve[0] === 'M') continue // Skip if this is the starting point

    subdivIndex++

    const prevPointsLen = prevCurve.length - 1

    // Creating a Bezier curve using a previous point
    curve.shift()
    curve.unshift(prevCurve[prevPointsLen - 1], prevCurve[prevPointsLen])

    const bezier = new Bezier(curve)

    if (fillArray) subdivs[name].push(createSubdiv(bezier, QUALITY)) // Subdivision by length

    const lastPoint = +(i === array.length - 1)
    const length = subdivs[emotionsMap[name] || name][subdivIndex] - lastPoint

    if (length === 0) {
      subdivs[name].pop() // Delete subdivision length if there are no points
      continue
    }

    // Creating and write points to an element object
    const { points, flat, linePoints } = createPoints(
      bezier,
      subdivs[emotionsMap[name] || name][subdivIndex],
      outline
    )

    meshArray.points.push(...points)
    meshArray.flat.push(...flat)
    meshArray.line.points.push(...linePoints)
  }

  return meshArray
}
