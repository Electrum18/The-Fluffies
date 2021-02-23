// Concatenates a sequence of bytes using an index pattern
export function findIndexes(data: number[], startGroupIndex: number, startIndex: number) {
  const array = []

  for (let i = startGroupIndex; i < startIndex; i += 3) {
    array.push([data[i], data[i + 1], data[i + 2]])
  }

  return array
}

// Finds bytes from an array using a numeric range
export function findDataFromRange(data: number[], startIndex: number, endIndex: number) {
  const array = []

  for (let i = 0; i < endIndex; i++) {
    array.push(data[startIndex + i])
  }

  return array
}
