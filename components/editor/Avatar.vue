<template lang="pug">
  .avatar
    canvas(
      @mousedown="startDrag"
      @mousemove="onDrag"

      @touchstart="startDrag"
      @touchmove="onDrag"

      :style="position"

      ref="avatar"
    )

    v-overlay(:value="rendered.opened")
      v-card.pa-4.max-photo-scale(light raised max-width="800")
        v-img.grey.lighten-3(:src="rendered.data" max-height="450" contain)

        v-card-title {{ rendered.title }}
        v-card-actions
          v-spacer
          v-btn(text @click="rendered.opened = false") {{ $t('editor.close') }}
          v-btn(
            color="primary"
            :href="rendered.data"
            :download="rendered.fileName"
          ) {{ $t('editor.save') }}
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

import abs from 'abs-svg-path'
import parse from 'parse-svg-path'
import curvify from 'curvify-svg-path'

import { timeline } from 'popmotion'

import GIF from 'gif.js'

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
    raise: {
      type: Object,
      default: undefined
    }
  },

  data() {
    return {
      quality: 1, // range from 0 to 1
      targetQuality: 0,
      fullQuality: true, // Rendering at quality equal to 1

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

      globals: {},
      properties: {},

      calculated: {}, // Calculated paths

      mirror: false,
      executeAnimation: false, // Check for optimization
      afterChange: 0, // Counter after changing angle

      dragging: false, // If mousedown

      player: {
        model: undefined,
        value: 0,
        timer: undefined
      },

      fps: {
        ticker: 0,
        every: 1
      },

      rendering: false,

      gif: undefined,
      gifRef: GIF,

      rendered: {
        opened: false,
        title: '',
        data: '',
        fileName: ''
      }
    }
  },

  computed: {
    ...mapGetters('avatar', [
      'getAngle',
      'getHoriz',
      'getDegress',
      'getGlobal',
      'getProper',
      'getColor',
      'getFrame',
      'getFrames'
    ]),

    ...mapGetters('interface', [
      'getPlaying',
      'getPlayVal',
      'getPlaySeek',
      'getPlayRepeat',
      'getPlayChangedFrame',
      'getFPS',
      'getQuality',
      'getRendering',
      'getRendered'
    ]),

    timeline() {
      const { getFrames } = this

      const frames = []
      const animationName = 'x'

      let maxDuration = 0

      for (let i = 0; i < getFrames.length - 1; i++) {
        const { frame, duration } = getFrames[i]
        const { frame: frameNext } = getFrames[i + 1]

        frames.push({
          track: animationName,
          from: frame,
          to: frameNext,
          duration: duration * 1000
        })

        maxDuration += duration
      }

      this.setPlayLen(maxDuration)

      return timeline(frames, {
        elapsed: maxDuration * 1000 * this.player.value,
        loop: this.getPlayRepeat > 0 ? Infinity : 0
      })
    },

    position() {
      if (!this.raise) return

      const { size, bottom } = this.raise

      return { width: size, height: size, bottom }
    }
  },

  watch: {
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
        this.properties = JSON.parse(JSON.stringify(propers))

        this.fullQuality = false
        this.executeAnimation = true
      },

      deep: true
    },

    getGlobal: {
      handler(globals) {
        this.applyGlobals(globals)

        this.fullQuality = false
        this.executeAnimation = true
      },

      deep: true
    },

    'getGlobal.hair_name_en'(name) {
      if (/Dreads/.test(name)) {
        this.setGlobal({ path: 'hair_IS_DREADS', value: true })
        this.setGlobal({ path: 'hair_IS_BASIC', value: false })
      } else {
        this.setGlobal({ path: 'hair_IS_DREADS', value: false })
        this.setGlobal({ path: 'hair_IS_BASIC', value: true })
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

    'getGlobal.horn_name_en'(name) {
      this.paths.horn.name = name
    },

    'getGlobal.glasses_name_en'(name) {
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
    },

    getPlaying: {
      handler(playing) {
        const { player } = this

        this.resetPlayChangedFrame()

        if (playing) {
          player.model = this.timeline.start(({ x }) => {
            this.horiz = x.horiz
            this.angle = x.angle
            this.x = x.angle / 90

            this.degress = x.degress

            this.properties = x

            this.fullQuality = false
            this.executeAnimation = true
          })

          const self = this

          player.timer = setInterval(() => {
            player.value = player.model.getProgress().x

            self.setPlayVal(player.value)
          }, 100)
        } else if (player.model) {
          player.model.pause()

          clearInterval(player.timer)
        } else {
          return this.timeline
        }
      },

      immediate: true
    },

    getPlaySeek(value) {
      if (value) {
        const { getPlayVal, player } = this

        player.value = getPlayVal

        if (player.model) player.model.seek(getPlayVal)

        this.resetPlaySeek()
      }
    },

    getFPS(fps) {
      this.fps.every = 60 / fps
      this.fps.ticker = 0
    },

    getQuality: {
      handler(quality) {
        this.targetQuality = quality / 1024
      },

      immediate: true
    },

    getRendering: {
      handler(boolean, last) {
        this.rendering = boolean

        if (boolean === false && last === true) {
          if (this.getPlayVal < 1 && this.getRendered < 1) {
            this.gif.abort()
          } else {
            this.gif.render()
          }
        }
      },

      immediate: true
    },

    targetQuality(quality) {
      const [width, height] = this.setQuality(quality)

      this.gif.options.width = width
      this.gif.options.height = height
    }
  },

  mounted() {
    this.properties = JSON.parse(JSON.stringify(this.getProper))

    this.applyGlobals(this.getGlobal)

    this.paths.horn.name = this.getGlobal.horn_name_en
    this.paths.glasses.name = this.getGlobal.glasses_name_en

    const ctx = this.$refs.avatar.getContext('2d')

    ctx.canvas.width = (1024 * this.quality * 2) | 0
    ctx.canvas.height = (1024 * this.quality * 1.25) | 0

    ctx.lineCap = ctx.lineJoin = 'round'

    this.ctx = ctx

    // Quality calculatoin relative screen size

    window.addEventListener('mouseup', this.stopDrag)
    window.addEventListener('touchend', this.stopDrag)
    window.addEventListener('touchcancel', this.stopDrag)

    window.requestAnimationFrame(this.animate) // Start drawing and calculation

    this.$root.$refs.avatar = this.$refs.avatar

    const { fileName, name } = this.asFile('hair')

    this.importJSON('hairs', 'hairs/' + fileName + '.json', name)

    // Set cached hairs

    const cache = JSON.parse(localStorage.getItem('hairsCache'))

    if (cache && cache.length > 0) {
      this.setAllHairsList(cache)
    }

    this.setPlayChangedFrame()

    const [width, height] = this.setQuality(this.targetQuality)

    const NewGIF = this.gifRef

    this.gif = new NewGIF({
      workers: 4,
      quality: 20,

      width,
      height
    })

    const self = this

    this.gif.on('finished', (blob) => {
      const animations = JSON.parse(localStorage.getItem('animations'))
      const slot = +localStorage.getItem('animationSlot')

      const reader = new FileReader()

      reader.readAsDataURL(blob)
      reader.onload = () => {
        self.rendered.opened = true
        self.rendered.title = self.globals.name + ' • ' + animations[slot].name
        self.rendered.fileName =
          'TFs - ' + self.globals.name + ' - ' + animations[slot].name
        self.rendered.data = reader.result
        self.setRendered()
      }

      self.gif.abort() // For clear and closing gif cycle

      self.gif.frames = []
      self.gif.nextFrame = 0
      self.gif.imageParts = []
    })
  },

  methods: {
    ...mapMutations('avatar', [
      'setGlobal',
      'setProper',
      'setColor',
      'setHairsList',
      'setAllHairsList'
    ]),

    ...mapMutations('interface', [
      'setPlayVal',
      'setPlayLen',
      'resetPlaySeek',
      'setPlayRedraw',
      'setPlayChangedFrame',
      'resetPlayChangedFrame',
      'setRendered'
    ]),

    applyGlobals(globals) {
      const { degress } = this

      const absDegress = degress > 0 ? degress : -degress

      this.globals = JSON.parse(JSON.stringify(globals))

      this.globals.horn_behind_NO_EARS = absDegress <= 45 && globals.horn_rear
      this.globals.horn_behind_AFTER_EARS = absDegress > 45 && globals.horn_rear
    },

    asFile(key) {
      const name = this.globals[key + '_name_en']

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

        x = this.x
        y = this.y

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

      this.setProper({ path: 'horiz', value: this.horiz })
      this.setProper({ path: 'angle', value: this.angle })

      this.setProper({ path: 'degress', value: this.degress })

      this.setPlayChangedFrame()
    },

    setQuality(quality) {
      const enumerate = {
        2160: 0,
        1440: 1,
        1080: 2,
        720: 3,
        480: 4,
        360: 5,
        240: 6,
        144: 7
      }

      const resolutions = [
        [3840, 2160],
        [2560, 1440],
        [1920, 1080],
        [1280, 720],
        [854, 480],
        [640, 360],
        [426, 240],
        [256, 144]
      ]

      return resolutions[enumerate[quality * 1024]]
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

.max-photo-scale
  width: 75vmin
</style>
