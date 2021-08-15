import useParameters from '@/helpers/parameters'
import { getSaveValue } from '@/libs/saves'

import { Model } from '../model'

const selector = state => getSaveValue(state, 'booleans')

export default function Accessories() {
  const params = useParameters(selector)

  return (
    <>
      <Model
        name="Glasses"
        material="glasses"
        file={{ group: 'glasses/', key: 'glasses' }}
        texture="double"
      />

      {params.collar_enable && <Model name="Collar" material="collar" />}
      {params.bowtie_enable && <Model name="Bowtie" material="bowtie" />}

      <Model
        name="Piercing ears"
        material="piercings"
        file={{ group: 'piercings/ears/', key: 'piercing_ears' }}
      />

      <Model
        name="Clothing"
        material="clothing"
        file={{ group: 'clothing/', key: 'clothing' }}
      />

      {params.scarf && <Model name="Scarf" material="scarf" />}

      <Model
        name="Pants"
        material="pants"
        file={{ group: 'pants/', key: 'pants' }}
      />
    </>
  )
}
