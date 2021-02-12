// Creates an object with one nesting level
exports.flattenJSON = (json) => {
  for (const elementsKeys in json) {
    if (json[elementsKeys].constructor === Object) {
      // Finding an object of variable elements
      for (const elementsName in json[elementsKeys]) {
        const elements = json[elementsKeys][elementsName]

        // Finding elements from a selectable name
        for (const element in elements) {
          const newKey = elementsKeys + '_' + elementsName + '_' + element

          json[newKey] = json[elementsKeys][elementsName][element]
        }
      }

      delete json[elementsKeys]
    }
  }

  return json
}
