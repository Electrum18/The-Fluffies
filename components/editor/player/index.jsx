import Body from './parts/body'
import Accessories from './parts/accessories'
import Wings from './parts/wings'

export default function Player(props) {
  return (
    <group scale={0.1} dispose={null} {...props}>
      <Body />
      <Accessories />
      <Wings />
    </group>
  )
}
