/* eslint-disable no-magic-numbers */
// Finding the word "emotion_" at the beginning of a line
exports.isEmotion = (elemName) => {
  return (
    elemName[0] === 'e' &&
    elemName[1] === 'm' &&
    elemName[2] === 'o' &&
    elemName[3] === 't' &&
    elemName[4] === 'i' &&
    elemName[5] === 'o' &&
    elemName[6] === 'n' &&
    elemName[7] === '_'
  )
}

// Finding the word "glasses_" at the beginning of a line
exports.isGlasses = (elemName) => {
  return (
    elemName[0] === 'g' &&
    elemName[1] === 'l' &&
    elemName[2] === 'a' &&
    elemName[3] === 's' &&
    elemName[4] === 's' &&
    elemName[5] === 'e' &&
    elemName[6] === 's' &&
    elemName[7] === '_'
  )
}

// Finding the word "pants_" at the beginning of a line
exports.isPants = (elemName) => {
  return (
    elemName[0] === 'p' &&
    elemName[1] === 'a' &&
    elemName[2] === 'n' &&
    elemName[3] === 't' &&
    elemName[4] === 's' &&
    elemName[5] === '_'
  )
}

// Finding the word "clothing_" at the beginning of a line
exports.isClothing = (elemName) => {
  return (
    elemName[0] === 'c' &&
    elemName[1] === 'l' &&
    elemName[2] === 'o' &&
    elemName[3] === 't' &&
    elemName[4] === 'h' &&
    elemName[5] === 'i' &&
    elemName[6] === 'n' &&
    elemName[7] === 'g' &&
    elemName[8] === '_'
  )
}

// Finding the word "piercing_" at the beginning of a line
exports.isPiercing = (elemName) => {
  return (
    elemName[0] === 'p' &&
    elemName[1] === 'i' &&
    elemName[2] === 'e' &&
    elemName[3] === 'r' &&
    elemName[4] === 'c' &&
    elemName[5] === 'i' &&
    elemName[6] === 'n' &&
    elemName[7] === 'g' &&
    elemName[8] === '_'
  )
}

// Finding the word "hair_" at the beginning of a line
exports.isHair = (elemName) => {
  return (
    elemName[0] === 'h' &&
    elemName[1] === 'a' &&
    elemName[2] === 'i' &&
    elemName[3] === 'r' &&
    elemName[4] === '_'
  )
}

// Finding the word "hair_" at the beginning of a line
exports.isTail = (elemName) => {
  return (
    elemName[0] === 't' &&
    elemName[1] === 'a' &&
    elemName[2] === 'i' &&
    elemName[3] === 'l' &&
    elemName[4] === '_'
  )
}

// Finding the word ".json" at the end of a line
exports.isJSON = (filename) => {
  const length = filename.length

  return (
    filename[length - 5] === '.' &&
    filename[length - 4] === 'j' &&
    filename[length - 3] === 's' &&
    filename[length - 2] === 'o' &&
    filename[length - 1] === 'n'
  )
}

// Marks key with a special character at beginning, if key is last in the array
exports.isElementKey = (element, index) => {
  return element[index] === element[element.length - 1] ? '$' : ''
}
