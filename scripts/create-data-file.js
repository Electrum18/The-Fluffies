/* eslint-disable no-console */
const { writeFileSync } = require('fs')

const ProgressBar = require('progress')
const chalk = require('chalk')

const parse = require('parse-svg-path')
const abs = require('abs-svg-path')
const curvify = require('curvify-svg-path')

const { readData } = require('./importer')

const { pathToPolygon } = require('./tools/path-to-polygon')
const { createLineIds, createIds } = require('./tools/creating')
const { createPNG } = require('./tools/encoder')

const { flattenJSON } = require('./tools/flatting')
const { flatArrayToJson } = require('./tools/unflatting')

const {
  isEmotion,
  isGlasses,
  isPants,
  isClothing,
  isPiercing,
  isHair,
  isTail
} = require('./tools/checking')

// Configs
const outlines = require('./config/outlines.json')

const elements = flattenJSON(readData('data')) // Prepare data

const elementsLoadingBar = new ProgressBar(
  chalk.blue('»') + ' Creation of data from elements [' + chalk.yellow(':bar') + '] :percent',
  {
    complete: chalk.bgYellow(' '),
    width: 50,
    total: Object.keys(elements).length
  }
)

// Main data
const KEYS_PATH = './assets/ts/avatar/getting/elements.json'
const DATA_PATH = 'static/data.png'

const keys = []
const data = []
const indexesLengths = []

console.log(chalk.blue('Data recording has started\n'))

// Getting data from elements
for (const element in elements) {
  if (isEmotion(element)) continue

  const outline =
    outlines[element] ||
    +isGlasses(element) * outlines.glasses ||
    +isPants(element) * outlines.pants ||
    +isClothing(element) * outlines.clothing ||
    +isPiercing(element) * outlines.piercing ||
    +isHair(element) * outlines.hair ||
    +isTail(element) * outlines.tail

  parseElement(element, elements[element], outline)

  keys.push(element)

  if (outline) keys.push(element + '_outline')

  elementsLoadingBar.tick()
}

// Getting emotion data from elements as separated
for (const element in elements) {
  if (isEmotion(element)) {
    parseElement(element, elements[element], outlines[element])

    keys.push(element)

    if (outlines[element]) keys.push(element + '_outline')

    elementsLoadingBar.tick()
  }
}

// Writes data to arrays from an elements array
function parseElement(elementName, element, outline) {
  const vertices = []
  const indexes = []

  const line = {
    vertices: [],
    indexes: []
  }

  // Reading an element from an array
  element.forEach((frame, frameNum) => {
    let startLength = 0
    let frameLineVerticesLength = 0

    // Separation of paths into separate parts
    frame.match(/M[a-ln-zA-LN-Z 0-9-,]+/g).forEach((path) => {
      const looped = path[path.length - 1] === 'z'

      const normalPaths = curvify(abs(parse(path)))
      const polygon = pathToPolygon(elementName, normalPaths, outline)

      // Creating indexes for all paths
      if (frameNum === 0 && polygon.points.length !== 0) {
        indexes.push(...createIds(polygon.points, startLength))

        startLength += polygon.points.length
      }

      vertices.push(...polygon.flat)

      // Creating outlined path if available
      if (outline) {
        const pointsLen = polygon.line.points.length / 2

        line.vertices.push(...polygon.line.points)

        // Creating indexes for all outlined paths
        if (frameNum === 0) {
          line.indexes.push(...createLineIds(pointsLen, looped, frameLineVerticesLength))
        }

        frameLineVerticesLength += pointsLen
      }
    })
  })

  const elemLen = element.length

  // Applying data bytes of paths to an array
  indexesLengths.push(elemLen, vertices.length / elemLen, indexes.length)
  data.push(...vertices, ...indexes)

  // Applying data bytes of outlined paths
  if (outline) {
    indexesLengths.push(elemLen, line.vertices.length / elemLen, line.indexes.length)
    data.push(...line.vertices, ...line.indexes)
  }
}

// Applying arrays to a buffer of bytes
data.unshift(indexesLengths.length, ...indexesLengths)

console.log('\n' + chalk.green('√') + ' Indexes mounted')

// Writing configs to get data from the buffer
writeFileSync(KEYS_PATH, JSON.stringify(flatArrayToJson(keys)), 'utf8')

console.log(chalk.green('√') + ' JSON with keys is saved at: ' + chalk.cyan(KEYS_PATH))

createPNG(data, DATA_PATH) // Converting a buffer to an image

console.log(chalk.green('√') + ' Image with data is saved at: ' + chalk.cyan(DATA_PATH))
console.log(chalk.green('\nProcess is complete!'))
