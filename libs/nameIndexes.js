import Clothing from '@/configs/changeable/clothing.json'
import Ears from '@/configs/changeable/ears.json'
import Eyes from '@/configs/changeable/eyes.json'
import Fangs from '@/configs/changeable/fangs.json'
import HornFront from '@/configs/changeable/front_horn.json'
import Glasses from '@/configs/changeable/glasses.json'
import Hairs from '@/configs/changeable/hairs.json'
import Horn from '@/configs/changeable/horn.json'
import Pants from '@/configs/changeable/pants.json'
import PiercingEars from '@/configs/changeable/piercings/ears.json'
import Tails from '@/configs/changeable/tails.json'

function createFileGroup(list) {
  const groups = []
  const keys = Object.keys(list)

  for (let index = 0; index < keys.length; index += 6) {
    groups.push([
      keys[index] && keys[index].replace(/ /g, '_'),
      keys[index + 1] && keys[index + 1].replace(/ /g, '_'),
      keys[index + 2] && keys[index + 2].replace(/ /g, '_'),
      keys[index + 3] && keys[index + 3].replace(/ /g, '_'),
      keys[index + 4] && keys[index + 4].replace(/ /g, '_'),
      keys[index + 5] && keys[index + 5].replace(/ /g, '_')
    ])
  }

  return groups
}

function createNameToFileIndexes(namesInBundle) {
  const fileIndexes = {}

  for (let index = 0; index < namesInBundle.length; index++) {
    const names = namesInBundle[index]

    for (const name of names) {
      if (name) fileIndexes[name] = index
    }
  }

  return fileIndexes
}

const nameIndexGroups = {
  hair: createFileGroup(Hairs),
  tail: createFileGroup(Tails),
  eyes: createFileGroup(Eyes),
  horn: createFileGroup(Horn),
  horn_front: createFileGroup(HornFront),
  glasses: createFileGroup(Glasses),
  clothing: createFileGroup(Clothing),
  pants: createFileGroup(Pants),
  ears: createFileGroup(Ears),
  piercing_ears: createFileGroup(PiercingEars),
  fangs: createFileGroup(Fangs)
}

const nameInFileIndexes = {
  hair: createNameToFileIndexes(nameIndexGroups.hair),
  tail: createNameToFileIndexes(nameIndexGroups.tail),
  eyes: createNameToFileIndexes(nameIndexGroups.eyes),
  horn: createNameToFileIndexes(nameIndexGroups.horn),
  horn_front: createNameToFileIndexes(nameIndexGroups.horn_front),
  glasses: createNameToFileIndexes(nameIndexGroups.glasses),
  clothing: createNameToFileIndexes(nameIndexGroups.clothing),
  pants: createNameToFileIndexes(nameIndexGroups.pants),
  ears: createNameToFileIndexes(nameIndexGroups.ears),
  piercing_ears: createNameToFileIndexes(nameIndexGroups.piercing_ears),
  fangs: createNameToFileIndexes(nameIndexGroups.fangs)
}

export { nameIndexGroups, nameInFileIndexes }
