const { createWriteStream } = require('fs')
const { PNG } = require('pngjs')

// Creating image from a buffer
exports.createPNG = (data, path) => {
  const RGB_BYTES_COUNT = 4

  const buffer = Buffer.alloc(data.length * 2)
  const bitmap = new Int16Array(buffer.buffer)

  data.forEach((val, i) => (bitmap[i] = -val))

  const side = Math.ceil(Math.sqrt(Math.ceil(buffer.length / RGB_BYTES_COUNT)))

  const png = new PNG({ width: side, height: side, bitDepth: 8 })

  png.data = Buffer.concat([
    buffer,
    Buffer.alloc(side * side * RGB_BYTES_COUNT - buffer.length).fill(0)
  ])

  png.pack().pipe(createWriteStream(path))
}
