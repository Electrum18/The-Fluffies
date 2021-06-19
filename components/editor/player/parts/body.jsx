import useParameters from '@/helpers/parameters'

import { Model } from '../model'

export default function Body() {
  const params = useParameters((state) => state.booleans)

  return (
    <>
      <Model name='Head' material='body' texture='body' />
      <Model name='Body' material='body' texture='body' />
      <Model name='Hooves' material='body' texture='body' />

      <Model
        name='Ears'
        material='ears'
        file={{ group: 'ears/', key: 'ears' }}
        texture={{ group: 'ears/', key: 'ears' }}
      />

      <Model
        name='Horn_front'
        material='horn_front'
        file={{ group: 'horn_front/', key: 'horn_front' }}
        texture='white'
      />

      <Model
        name='Horn'
        material='horns'
        file={{ group: 'horns/', key: 'horn' }}
      />

      <Model
        name='Hair'
        material='hair'
        file={{ group: 'hairs/', key: 'hair' }}
        texture={{ group: 'hairs/', key: 'hair', postfix: '_second' }}
      />

      <Model
        name='Tail'
        material='tail'
        file={{ group: 'tails/', key: 'tail' }}
        texture={{ group: 'tails/', key: 'tail', postfix: '_second' }}
      />

      <Model
        name='Eyes'
        material='eyes'
        texture={{ group: 'eyes/', key: 'eyes' }}
      />

      {!params.male && <Model name='Eyelashes' material='eyelashes' />}

      {params.canine_nose_enable && <Model name='Canine' material='canine' />}
      {params.fluff_cheeks && <Model name='Cheeks_fluff' material='fluff2' />}
      {params.fluff_chest && <Model name='Chest_fluff' material='fluff2' />}
      {params.fluff_neck && <Model name='Neck_fluff' material='fluff' />}
      {params.fluff_hooves && <Model name='Hooves_fluff' material='fluff' />}

      <Model
        name='Fangs'
        material='fangs'
        file={{ group: 'fangs/', key: 'fangs' }}
      />
    </>
  )
}
