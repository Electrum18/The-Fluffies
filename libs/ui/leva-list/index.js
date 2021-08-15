import { createPlugin } from 'leva/plugin'

import { List } from './component'
import { normalize, sanitize } from './list-plugin'

export const levaList = createPlugin({
  normalize,
  sanitize,
  component: List
})
