import Head from '~/assets/json/data/head.json'
import Nose from '~/assets/json/data/nose.json'
import Eyes from '~/assets/json/data/eyes.json'
import Neck from '~/assets/json/data/neck.json'
import Body from '~/assets/json/data/body.json'
import Nostril from '~/assets/json/data/nostril.json'
import Mouth from '~/assets/json/data/mouth.json'
import Fangs from '~/assets/json/data/fangs.json'
import Stripes from '~/assets/json/data/stripes.json'
import HoovesFront from '~/assets/json/data/hooves/front.json'
import HoovesBehind from '~/assets/json/data/hooves/behind.json'
import Wing from '~/assets/json/data/wings.json'
import Fluff from '~/assets/json/data/fluff.json'
import FurSecond from '~/assets/json/data/second_fur_color.json'

export default {
  ...Head,
  ...Nose,
  ...Eyes,
  ...Neck,
  ...Body,
  ...Nostril,
  ...Mouth,
  ...Fangs,
  ...Stripes,
  ...HoovesFront,
  ...HoovesBehind,
  ...Wing,
  ...Fluff,
  ...FurSecond
}
