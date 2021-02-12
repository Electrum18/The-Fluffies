const { isElementKey } = require('./checking')
const { mergeSimilarKeys } = require('./merging')

// Splits a string into an array based on the "_" sign
function splitArray(array) {
  const newArray = []

  array.forEach((element) =>
    newArray.push(element.match(/((left|right)_[a-z]+|[a-z]+_\d|[a-z]+)/g))
  )

  return newArray
}

// Removes the "$" character at the beginning of a word
function getKeyWithout$(element) {
  return element[0] === '$' ? element.substring(1) : element
}

// Searches for object data regardless of whether or not the key has a "$" character
function getKey(nestingObject, elemName) {
  const elemNameReal = getKeyWithout$(elemName)

  return nestingObject[elemNameReal] || nestingObject['$' + elemNameReal]
}

/*
 * Algorithm for the compression array index using a object notation
 * It also reduces two identical subobjects into one with a single key
 * Many thanks to this person:
 * @author{Devyan}
 */
exports.flatArrayToJson = (array) => {
  const splitted = splitArray(array)
  const json = {}

  for (let index = 0; index < array.length; index++) {
    const element = splitted[index]

    let nestingObject = json

    for (let nestLevel = 0; nestLevel < element.length; nestLevel++) {
      const elemName = isElementKey(element, nestLevel) + element[nestLevel]

      if (!getKey(nestingObject, elemName)) nestingObject[elemName] = {}

      nestingObject = getKey(nestingObject, elemName)
    }
  }

  return mergeSimilarKeys(json) // JSON reduction algorithm
}
