import Accessories from './parts/accessories'
import Body from './parts/body'
import Wings from './parts/wings'
import Skeleton from './skeleton'

export default function Player(props) {
  return (
    <group scale={0.1} dispose={null} {...props}>
      <Body />
      <Accessories />
      <Wings />
    </group>
  )
}
