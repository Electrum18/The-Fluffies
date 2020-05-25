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
            ref="gifDownload"
            color="primary"
            :href="rendered.data"
            :title="rendered.fileName"
            :download="rendered.fileName"
          ) {{ $t('editor.save') }}
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

import { timeline } from 'popmotion'

import GIF from 'gif.js'

import animate from '~/assets/ts/avatar/animate.ts'
import draw from '~/assets/ts/avatar/layers'
import SetPropersSide from '~/assets/ts/avatar/setSide.ts'

import { FormatSVGinJSON, CompiledPaths as paths } from '~/assets/ts/dataCompile.ts'

// Configs

import IS from '~/assets/json/configs/interpolationScheme.json'
import Powers from '~/assets/json/configs/power.json'
import wind from '~/assets/json/configs/wind.json'

const cache = setupCache({ readHeaders: true })
const api = axios.create({ adapter: cache.adapter })

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

      // Configs

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

      paths,

      globals: {},
      properties: {},

      calculated: {}, // Calculated paths

      mirror: false,

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
      },

      wind,

      windPropers: {
        enabled: true,
        cycle: 0
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
      'getRendered',
      'getWind'
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
    getAngle: {
      handler(angle) {
        this.angle = angle
      },

      immediate: true
    },

    getHoriz: {
      handler(horiz) {
        this.horiz = horiz
      },

      immediate: true
    },

    getDegress: {
      handler(degress) {
        this.degress = degress
        this.mirror = degress < 0

        this.x = degress / 90
      },

      immediate: true
    },

    getProper: {
      handler(propers) {
        const properties = JSON.parse(JSON.stringify(propers))

        this.SetPropersSide(this.mirror, properties)
        this.properties = properties
      },

      deep: true
    },

    getGlobal: {
      handler(globals) {
        this.applyGlobals(globals)
      },

      deep: true
    },

    'getGlobal.hair_name_en'(name) {
      if (/Dreads/.test(name)) {
        this.setGlobal({ path: 'hair_dreads', value: true })
      } else {
        this.setGlobal({ path: 'hair_dreads', value: false })
      }

      if (this.paths.hairs[name]) {
        this.paths.hairs.name = name
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

    mirror: {
      handler(value, old) {
        const { properties, getColor } = this

        if (old !== undefined) {
          const { eyes_left_basic: eyesLeftBasic, eyes_right_basic: eyesRightBasic } = getColor

          const slot = +localStorage.getItem('slot')
          const save = JSON.parse(localStorage.getItem('avatars'))

          const { color } = save[slot]

          this.setColor({
            path: 'eyes_left_basic',
            value: eyesRightBasic
          })

          this.setColor({
            path: 'eyes_right_basic',
            value: eyesLeftBasic
          })

          color.eyes_left_basic = eyesRightBasic
          color.eyes_right_basic = eyesLeftBasic

          localStorage.setItem('avatars', JSON.stringify(save))
        }

        this.SetPropersSide(value, properties)
        this.setMirror(value)
      },

      immediate: true
    },

    getPlaying: {
      handler(playing) {
        const { player } = this

        this.resetPlayChangedFrame()

        if (playing) {
          player.model = this.timeline.start(({ x }) => {
            this.horiz = x.horiz
            this.angle = x.angle

            this.degress = x.degress

            this.x = x.degress / 90
            this.mirror = x.degress < 0

            this.properties = x

            this.SetPropersSide(this.mirror, this.properties)
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
    },

    getPlayChangedFrame(enabled) {
      if (enabled) {
        this.setPlayRedraw()
        this.resetPlayChangedFrame()
      }
    },

    getWind(value) {
      this.windPropers.enabled = value
    }
  },

  mounted() {
    this.properties = JSON.parse(JSON.stringify(this.getProper))

    this.SetPropersSide(this.mirror, this.properties)

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
        self.rendered.fileName = 'TFs - ' + self.globals.name + ' - ' + animations[slot].name
        self.rendered.data = reader.result

        setTimeout(() => {
          const img = document.createElement('img')

          img.src = reader.result
          img.alt = self.rendered.title
          img.style = 'display: none'

          self.$refs.gifDownload.$el.appendChild(img)
        }, 100)

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
      'setAllHairsList',
      'setMirror'
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

        this.degress = x * 90
        this.mirror = x < 0

        this.horiz = -((y * (1 - absX)) ** 7)
        this.angle = (y * 90 * absX) / 4

        this.last.x = pageX
        this.last.y = pageY
      }
    },

    stopDrag() {
      this.dragging = false

      const slot = +localStorage.getItem('animationSlot')
      const animations = JSON.parse(localStorage.getItem('animations'))

      const frame = animations[slot].frames[this.getFrame].frame

      frame.horiz = this.horiz
      frame.angle = this.angle
      frame.degress = this.degress

      localStorage.setItem('animations', JSON.stringify(animations))

      if (this.$refs.avatar) {
        localStorage.setItem('lastImage', this.$refs.avatar.toDataURL('image/png'))
      }

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

    SetPropersSide,
    draw,
    animate
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
