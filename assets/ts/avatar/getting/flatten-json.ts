/* eslint-disable space-before-function-paren */
import elementNames from './elements.json'

import { IObject } from '~/types/basic'

type TNewJson = IObject<string | TNewJson>

// Divides sub-objects into separate objects with their own keys
function unmergeKeys(json: TNewJson) {
  const newJson: TNewJson = {}
  const keys = Object.keys(json)

  for (let keyId = 0; keyId < keys.length; keyId++) {
    const key = keys[keyId]
    const gettedKeys = key.split('|')

    for (let gettedKeyId = 0; gettedKeyId < gettedKeys.length; gettedKeyId++) {
      const gettedKey = gettedKeys[gettedKeyId]

      newJson[gettedKey] = unmergeKeys(json[key] as IObject<TNewJson>)
    }
  }

  return newJson
}

// Removes the "$" character at the beginning of a word
function getKeyWithout$(element: string) {
  return element[0] === '$' ? element.substring(1) : element
}

// Creates a flat array of keys from json format
function createFlatArray(json: TNewJson, alias: string = '') {
  const array: string[] = []
  const keys = Object.keys(json)

  for (let keyId = 0; keyId < keys.length; keyId++) {
    const key = keys[keyId]
    const realKey = getKeyWithout$(key)

    if (key[0] === '$') array.push(alias + realKey)

    const subArray = createFlatArray(json[key] as IObject<TNewJson>, alias + realKey + '_')

    if (subArray) array.push(...subArray)
  }

  return array
}

export default createFlatArray(unmergeKeys(elementNames))
