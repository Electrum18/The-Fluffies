import Names from '@/configs/default/names.json'

import Hairs from '@/configs/changeable/hairs.json'
import Tails from '@/configs/changeable/tails.json'
import Eyes from '@/configs/changeable/eyes.json'
import Horn from '@/configs/changeable/horn.json'
import HornFront from '@/configs/changeable/front_horn.json'
import Glasses from '@/configs/changeable/glasses.json'
import Clothing from '@/configs/changeable/clothing.json'
import Pants from '@/configs/changeable/pants.json'
import Ears from '@/configs/changeable/ears.json'
import PiercingEars from '@/configs/changeable/piercings/ears.json'
import Fangs from '@/configs/changeable/fangs.json'

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
      keys[index + 5] && keys[index + 5].replace(/ /g, '_'),
    ])
  }

  return groups
}

function findIndex(list, target) {
  return (
    (Object.keys(list).findIndex((value) => value === Names[target]) / 6) | 0
  )
}

const nameIndexGroups = {
  hair: createFileGroup(Hairs),
  tail: createFileGroup(Tails),
  eys: createFileGroup(Eyes),
  horn: createFileGroup(Horn),
  horn_front: createFileGroup(HornFront),
  glasses: createFileGroup(Glasses),
  clothing: createFileGroup(Clothing),
  pants: createFileGroup(Pants),
  ears: createFileGroup(Ears),
  piercing_ears: createFileGroup(PiercingEars),
  fangs: createFileGroup(Fangs),
}

export function generateNameIndexes() {
  return {
    hair: findIndex(Hairs, 'hair'),
    tail: findIndex(Tails, 'tail'),
    eyes: findIndex(Eyes, 'eyes'),
    horn: findIndex(Horn, 'horn'),
    horn_front: findIndex(HornFront, 'horn_front'),
    glasses: findIndex(Glasses, 'glasses'),
    clothing: findIndex(Clothing, 'clothing'),
    pants: findIndex(Pants, 'pants'),
    ears: findIndex(Ears, 'ears'),
    piercing_ears: findIndex(PiercingEars, 'piercing_ears'),
    fangs: findIndex(Fangs, 'fangs'),
  }
}

export { nameIndexGroups }
