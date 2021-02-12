const { readFileSync, readdirSync } = require('fs')
const { isJSON } = require('./tools/checking')

const PATH = './scripts'

// Writing file data to an object
function writeToObject(data, targetObject) {
  for (const element in data) {
    targetObject[element] = data[element]
  }
}

// Writing file data to an object with name
function writeToObjectWithName(data, filename, targetObject) {
  const [name] = filename.match(/[a-z0-9_]+/)

  targetObject[name] = {}

  for (const element in data) {
    targetObject[name][element] = data[element]
  }
}

// Reading a file and writing to an object
function readData(dirPath, dir = undefined) {
  const absPath = PATH + '/' + dirPath
  const data = {}

  readdirSync(absPath).forEach((filename) => {
    if (isJSON(filename)) {
      const dataIn = JSON.parse(readFileSync(absPath + '/' + filename, 'utf8'))

      dir ? writeToObjectWithName(dataIn, filename, data, dir) : writeToObject(dataIn, data)
    } else {
      data[filename] = readData(dirPath + '/' + filename, filename)
    }
  })

  return data
}

exports.readData = readData
