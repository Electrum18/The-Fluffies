import {
  SingleModel,
  TexturedModel,
  OutlinedModel,
  OutlinedTexturedModel,
} from './models'

export default function Player(props) {
  return (
    <group {...props} scale={0.1} dispose={null}>
      <OutlinedModel name='Head' material='body' />
      <OutlinedModel name='Body' material='body' />
      <OutlinedModel name='Hooves' material='body' />

      <OutlinedModel name='Ears' material='body' modelKey='ears' src='ears/' />

      <OutlinedModel
        name='Horn_front'
        material='body'
        modelKey='horn_front'
        src='front_horns/'
      />

      <OutlinedTexturedModel
        name='Hair'
        material='hair'
        modelKey='hair'
        textureKey='hair'
        postfix='_second'
        src='hairs/'
      />

      <OutlinedTexturedModel
        name='Tail'
        material='tail'
        modelKey='tail'
        textureKey='tail'
        postfix='_second'
        src='tails/'
      />

      <TexturedModel
        name='Eyes'
        material='eyes'
        textureKey='eyes'
        src='eyes/'
      />

      <SingleModel name='Eyelashes' material='eyelashes' />
    </group>
  )
}
