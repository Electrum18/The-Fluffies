import useParameters from '@/helpers/parameters'

import { Model } from '../model'

export default function Wings() {
  const params = useParameters((state) => state.values)

  return (
    <>
      {params.wings_enable && !params.wings_bat && !params.wings_folded && (
        <Model name='Basic_wings' material='wings' texture='wing_Basic' />
      )}

      {params.wings_enable && !params.wings_bat && params.wings_folded && (
        <Model
          name='Basic_folded_wings'
          material='wings'
          texture='wing_Basic'
        />
      )}

      {params.wings_enable && params.wings_bat && !params.wings_folded && (
        <Model name='Bat_wings' material='wings' texture='wing_Bat' />
      )}

      {params.wings_enable && params.wings_bat && params.wings_folded && (
        <Model name='Bat_folded_wings' material='wings' texture='wing_Bat' />
      )}
    </>
  )
}
