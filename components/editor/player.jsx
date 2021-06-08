import {
  SingleModel,
  TexturedModel,
  OutlinedModel,
  OutlinedTexturedModel,
} from './models'

export default function Player(props) {
  return (
    <group {...props} dispose={null}>
      <OutlinedModel name='Head' material='body' />
      <OutlinedModel name='Body' material='body' />
      <OutlinedModel name='Hooves' material='body' />

      <OutlinedModel
        name='Ears'
        material='body'
        modelKey='ears_name_en'
        modelSrc='ears/'
      />

      <OutlinedModel
        name='Horn_front'
        material='body'
        modelKey='horn_front_name_en'
        modelSrc='front_horns/'
      />

      <OutlinedTexturedModel
        name='Hair'
        material='hair'
        modelKey='hair_name_en'
        modelSrc='hairs/'
        textureSrc='hairs/'
      />

      <OutlinedTexturedModel
        name='Tail'
        material='tail'
        modelKey='tail_name_en'
        modelSrc='tails/'
        textureSrc='tails/'
      />

      <TexturedModel name='Eyes' material='eyes' />
      <SingleModel name='Eyelashes' material='eyelashes' />
    </group>
  )
}
