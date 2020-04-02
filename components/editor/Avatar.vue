<template lang="pug">
  .avatar
    canvas(
      @mousedown="startDrag"
      @mousemove="onDrag"
      :id="$root.name"
      :style="position"
      ref="avatar"
    )
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

import abs from 'abs-svg-path'
import parse from 'parse-svg-path'
import curvify from 'curvify-svg-path'

// import { keyframes, easing } from 'popmotion'

import Animate from '~/assets/js/avatar/animate'
import Draw from '~/assets/js/avatar/draw'

// Configs

import Elems from '~/assets/json/configs/elems.json'
import IS from '~/assets/json/configs/interpolationScheme.json'
import Powers from '~/assets/json/configs/power.json'

import Body from '~/assets/json/data/pony/body.json'
import Emotions from '~/assets/json/data/pony/emotions.json'

import HornLong from '~/assets/json/data/horns/long.json'
import HornDeer from '~/assets/json/data/horns/deer.json'

import GlassesClassic from '~/assets/json/data/glasses/classic.json'
import GlassesMonolens from '~/assets/json/data/glasses/monolens.json'
import GlassesTeashades from '~/assets/json/data/glasses/teashades.json'

const cache = setupCache({
  readHeaders: true
})

const api = axios.create({
  adapter: cache.adapter
})

function FormatSVGinJSON(json) {
  const keys = Object.keys(json)

  json.keys = keys

  for (let i = 0; i < keys.length; i++) {
    const pathsArr = json[keys[i]]

    for (let j = 0; j < pathsArr.length; j++) {
      if (pathsArr[j][0] === 'M') {
        pathsArr[j] = curvify(abs(parse(pathsArr[j])))
      }
    }
  }

  return json
}

export default {
  props: {
    animating: {
      type: Boolean,
      default: false
    },

    smaller: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      quality: 2 / 3, // range from 0 to 1
      vmin: 0,

      position: {},

      // Configs

      layers: Elems,
      shiftMul: Powers,
      interpolationScheme: IS,

      ctx: {}, // Context of canvas

      horiz: 0,
      angle: 0,

      degress: 12.5,

      x: 0, // Horizontal of angle in -1 to 1 range
      y: 0, // Vertical of angle in 0 to 1 range

      last: {
        // Last calculated variables for deltas
        x: 0,
        y: 0,
        time: 0
      },

      paths: {
        keys: ['body', 'emotions', 'horn', 'glasses', 'hairs'],

        body: FormatSVGinJSON(Body),
        emotions: FormatSVGinJSON(Emotions),

        horn: {
          Long: FormatSVGinJSON(HornLong),
          Deer: FormatSVGinJSON(HornDeer)
        },

        glasses: {
          Classic: FormatSVGinJSON(GlassesClassic),
          Monolens: FormatSVGinJSON(GlassesMonolens),
          Teashades: FormatSVGinJSON(GlassesTeashades)
        },

        hairs: {}
      },

      calculated: {}, // Calculated paths

      mirror: false,
      executeAnimation: false, // Check for optimization
      afterChange: 0, // Counter after changing angle
      fullQuality: true, // Rendering at quality equal to 1

      dragging: false // If mousedown
    }
  },

  computed: {
    ...mapGetters('avatar', [
      'getAngle',
      'getHoriz',
      'getDegress',
      'getProper',
      'getColor'
    ])
  },

  watch: {
    animating(val) {
      if (val) {
        if (this.smaller) {
          this.position = {
            width: 'calc(100vmin - 74px)',
            height: 'calc(100vmin - 74px)',
            bottom: '74px'
          }
        } else {
          this.position = {
            width: 'calc(100vmin - 260px)',
            height: 'calc(100vmin - 260px)',
            bottom: '260px'
          }
        }
      } else {
        this.position = {}
      }
    },

    smaller(val) {
      if (this.animating) {
        if (val) {
          this.position = {
            width: 'calc(100vmin - 74px)',
            height: 'calc(100vmin - 74px)',
            bottom: '74px'
          }
        } else {
          this.position = {
            width: 'calc(100vmin - 260px)',
            height: 'calc(100vmin - 260px)',
            bottom: '260px'
          }
        }
      } else {
        this.position = {}
      }
    },

    getAngle(angle) {
      this.angle = angle
      this.x = angle / 90
    },

    getHoriz(horiz) {
      this.horiz = horiz
    },

    getDegress(degress) {
      this.degress = degress
    },

    getProper: {
      handler(propers) {
        const absDegress = this.degress > 0 ? this.degress : -this.degress

        this.setProper({
          path: 'horn_behind_NO_EARS',
          value: absDegress <= 45 && propers.horn_rear
        })

        this.setProper({
          path: 'horn_behind_AFTER_EARS',
          value: absDegress > 45 && propers.horn_rear
        })

        this.fullQuality = false
        this.executeAnimation = true
      },

      deep: true
    },

    'getProper.hair_name_en'(name) {
      if (/Dreads/.test(name)) {
        this.setProper({ path: 'hair_IS_DREADS', value: true })
        this.setProper({ path: 'hair_IS_BASIC', value: false })
      } else {
        this.setProper({ path: 'hair_IS_DREADS', value: false })
        this.setProper({ path: 'hair_IS_BASIC', value: true })
      }

      if (this.paths.hairs[name]) {
        this.paths.hairs.name = name

        this.fullQuality = false
        this.executeAnimation = true
      } else {
        const { fileName, name } = this.asFile('hair')

        this.importJSON('hairs', 'hairs/' + fileName + '.json', name)
      }
    },

    'getProper.horn_name_en'(name) {
      this.paths.horn.name = name
    },

    'getProper.glasses_name_en'(name) {
      this.paths.glasses.name = name
    },

    getColor: {
      handler() {
        this.fullQuality = false
        this.executeAnimation = true
      },

      deep: true
    },

    mirror() {
      const {
        eyes_left_basic: eyesLeftBasic,
        eyes_right_basic: eyesRightBasic
      } = this.getColor

      this.setColor({
        path: 'eyes_left_basic',
        value: eyesRightBasic
      })

      this.setColor({
        path: 'eyes_right_basic',
        value: eyesLeftBasic
      })
    }
  },

  mounted() {
    this.paths.horn.name = this.getProper.horn_name_en
    this.paths.glasses.name = this.getProper.glasses_name_en

    const ctx = this.$refs.avatar.getContext('2d')

    ctx.canvas.width = (1024 * this.quality * 2) | 0
    ctx.canvas.height = (1024 * this.quality * 1.25) | 0

    ctx.lineCap = ctx.lineJoin = 'round'

    this.ctx = ctx

    // Quality calculatoin relative screen size

    const { innerWidth, innerHeight } = window

    this.vmin = innerWidth < innerHeight ? innerWidth : innerHeight

    window.onresize = ({ target: { innerWidth, innerHeight } }) => {
      this.vmin = innerWidth < innerHeight ? innerWidth : innerHeight
    }

    window.addEventListener('mouseup', this.stopDrag)
    window.requestAnimationFrame(this.animate) // Start drawing and calculation

    this.$root.$refs.avatar = this.$refs.avatar

    /*
    const { easeOutIn } = easing
    const { jaw, eyes } = self.state

    keyframes({
      values: [
        { x: 0.3, horiz: -30, open: 100, lids: 25 },
        { x: 0.1, horiz: 0, open: 0, lids: 0 },
        { x: 0.3, horiz: -30, open: 100, lids: 25 }
      ],
      duration: 2000,
      easings: easeOutIn,
      loop: Infinity
    })
    .start((val) => {
      self.x = val.x;

      const { position, eyelids, brows } = eyes;

      position.horiz = val.horiz;
      eyelids.left.up = val.lids;
      eyelids.right.up = val.lids;

      jaw.open = val.open;

      self.executeAnimation = true;
    });
    */

    const { fileName, name } = this.asFile('hair')

    this.importJSON('hairs', 'hairs/' + fileName + '.json', name)

    // Set cached hairs

    const cache = JSON.parse(localStorage.getItem('hairsCache'))

    if (cache && cache.length > 0) {
      this.setAllHairsList(cache)

      // console.log(getters('avatar/getHairsList'))
    }
  },

  methods: {
    ...mapMutations('avatar', [
      'setProper',
      'setColor',
      'setHairsList',
      'setAllHairsList'
    ]),

    asFile(key) {
      const name = this.getProper[key + '_name_en']

      const fileName = name
        .toLowerCase()
        .split(' ')
        .join('_')

      return { name, fileName }
    },

    importJSON(target, url, name) {
      const self = this

      api.get('/data/' + url).then((res) => {
        self.paths[target][name] = FormatSVGinJSON(res.data)
        self.paths[target].name = name

        if (target === 'hairs') {
          self.setHairsList(name)

          if (process.client) {
            let cache = localStorage.getItem('hairsCache')

            if (cache !== null) {
              cache = JSON.parse(cache)

              if (!cache.includes(name)) {
                cache.push(name)

                localStorage.setItem('hairsCache', JSON.stringify(cache))
              }
            } else {
              const array = [name]

              localStorage.setItem('hairsCache', JSON.stringify(array))
            }
          }
        }

        self.fullQuality = false
        self.executeAnimation = true
      })
    },

    startDrag(e) {
      if (!e.pageX && e.touches) {
        e = e.touches[0]
      }

      this.last.x = e.pageX
      this.last.y = e.pageY

      this.dragging = true
    },

    onDrag(e) {
      if (this.dragging) {
        if (!e.pageX && e.touches) {
          e = e.touches[0]
        }

        const { pageX, pageY } = e

        this.x += (pageX - this.last.x) / 500
        this.y += (pageY - this.last.y) / 100

        let { x, y } = this

        if (x > 1) this.x = 1
        if (y > 1) this.y = 1

        if (x < -1) this.x = -1
        if (y < -1) this.y = -1
        ;[x, y] = [this.x, this.y]

        const absX = x > 0 ? x : -x

        this.horiz = -((y * (1 - absX)) ** 7)
        this.angle = (y * 90 * absX) / 4

        this.degress = x * 90
        this.mirror = x < 0

        this.fullQuality = false
        this.executeAnimation = true

        this.last.x = pageX
        this.last.y = pageY
      }
    },

    stopDrag() {
      this.dragging = false
    },

    draw: Draw,
    animate: Animate
  }
}
</script>

<style lang="sass">
.avatar canvas
  position: fixed
  cursor: move
  width: 100vmin
  height: 100vmin
  z-index: 0
  left: 50%
  bottom: 0
  transform: translate(-50%) scale(2, 1.25)
  transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), bottom 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)
</style>
