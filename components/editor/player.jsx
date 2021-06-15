import useParameters from '@/helpers/parameters'

import { SingleModel, TexturedModel } from './models/single'
import {
  OutlinedModel,
  OutlinedTransparentModel,
  OutlinedTexturedModel,
} from './models/outlined'

export default function Player(props) {
  const params = useParameters((state) => state.values)

  return (
    <group scale={0.1} dispose={null} {...props}>
      <OutlinedModel name='Head' material='body' />
      <OutlinedModel name='Body' material='body' />
      <OutlinedModel name='Hooves' material='body' />

      <OutlinedModel
        name='Ears'
        material='body'
        file={{ group: 'ears/', key: 'ears' }}
      />

      <OutlinedModel
        name='Horn_front'
        material='body'
        file={{ group: 'horn_front/', key: 'horn_front' }}
      />

      <OutlinedModel
        name='Horn'
        material='horns'
        file={{ group: 'horns/', key: 'horn' }}
      />

      <OutlinedTransparentModel
        name='Glasses'
        material='glasses'
        file={{ group: 'glasses/', key: 'glasses' }}
      />

      <OutlinedTexturedModel
        name='Hair'
        material='hair'
        file={{ group: 'hairs/', key: 'hair' }}
        texture={{ group: 'hairs/', key: 'hair', postfix: '_second' }}
      />

      <OutlinedTexturedModel
        name='Tail'
        material='tail'
        file={{ group: 'tails/', key: 'tail' }}
        texture={{ group: 'tails/', key: 'tail', postfix: '_second' }}
      />

      <TexturedModel
        name='Eyes'
        material='eyes'
        texture={{ group: 'eyes/', key: 'eyes' }}
      />

      {!params.male && <SingleModel name='Eyelashes' material='eyelashes' />}

      {params.canine_nose_enable && (
        <SingleModel name='Canine' material='canine' />
      )}

      {params.fluff_cheeks && (
        <OutlinedModel name='Cheeks_fluff' material='body' />
      )}

      {params.fluff_chest && (
        <OutlinedModel name='Chest_fluff' material='body' />
      )}

      {params.fluff_neck && (
        <OutlinedModel name='Neck_fluff' material='fluff' />
      )}

      {params.fluff_hooves && (
        <OutlinedModel name='Hooves_fluff' material='fluff' />
      )}

      {params.collar_enable && <SingleModel name='Collar' material='collar' />}
      {params.bowtie_enable && <SingleModel name='Bowtie' material='bowtie' />}

      <SingleModel
        name='Piercing ears'
        material='piercings'
        file={{ group: 'piercings/ears/', key: 'piercing_ears' }}
      />

      <OutlinedModel
        name='Clothing'
        material='clothing'
        file={{ group: 'clothing/', key: 'clothing' }}
      />

      {params.scarf && <OutlinedModel name='Scarf' material='scarf' />}

      <OutlinedModel
        name='Pants'
        material='pants'
        file={{ group: 'pants/', key: 'pants' }}
      />

      <SingleModel
        name='Fangs'
        material='fangs'
        file={{ group: 'fangs/', key: 'fangs' }}
      />

      <SingleModel
        name='Fangs'
        material='fangs'
        file={{ group: 'fangs/', key: 'fangs' }}
      />

      {params.wings_enable && !params.wings_bat && !params.wings_folded && (
        <OutlinedModel name='Basic_wings' material='wings' />
      )}

      {params.wings_enable && !params.wings_bat && params.wings_folded && (
        <OutlinedModel name='Basic_folded_wings' material='wings' />
      )}

      {params.wings_enable && params.wings_bat && !params.wings_folded && (
        <OutlinedModel name='Bat_wings' material='wings' />
      )}

      {params.wings_enable && params.wings_bat && params.wings_folded && (
        <OutlinedModel name='Bat_folded_wings' material='wings' />
      )}
    </group>
  )
}
