// Finds two closest objects with similar content and concatenates them into one
// Then it stops working and returns the remaining objects
function mergeSimilarKeys(json) {
  const newJson = {}

  const keys = Object.keys(json)
  const lastIndex = keys.length - 1

  let changed = false

  for (let keyId = 0; keyId < keys.length; keyId++) {
    const key = keys[keyId]
    const nextKey = keys[keyId + 1]

    const contents = JSON.stringify(json[key])
    const nextContents = JSON.stringify(json[nextKey])

    // Finds duplicate objects and stops working
    if (contents === nextContents && !changed && keyId < lastIndex) {
      newJson[key + '|' + nextKey] = mergeSimilarKeys(json[key])

      keyId++

      changed = true
    } else {
      newJson[key] = mergeSimilarKeys(json[key]) // Returns remaining object
    }
  }

  return changed ? mergeSimilarKeys(newJson) : newJson
}

exports.mergeSimilarKeys = mergeSimilarKeys
