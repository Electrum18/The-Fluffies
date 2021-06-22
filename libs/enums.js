export function addEnumsToObject(object) {
  const newObject = object

  for (const key in object) {
    const index = object[key]

    newObject[index] = key
  }

  return newObject
}
