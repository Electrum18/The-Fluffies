<template lang="pug">
  .avatar
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

import { timeline } from 'popmotion'
import GIF from 'gif.js'

import { initEngine, options } from '~/assets/ts/avatar/index.ts'

// Configs

import CM from '~/assets/json/configs/cross-morphs.json'
import Powers from '~/assets/json/configs/power.json'

export default {
  data() {
    return {
      quality: 1, // range from 0 to 1
      targetQuality: 0,

      // Configs

      shiftMul: Powers,
      interpolationScheme: CM,

      ctx: {}, // Context of canvas

      horiz: 0,
      angle: 0,

      degress: 12.5,

      position: {
        vertical: 0,
        horizontal: 0,
        scale: 1,
        angle: 0
      },

      x: 0, // Horizontal of angle in -1 to 1 range
      y: 0, // Vertical of angle in 0 to 1 range

      last: {
        // Last calculated variables for deltas
        x: 0,
        y: 0,
        time: 0
      },

      paths: {
        keys: [
          'body',
          'emotions',
          'horn_front',
          'horn',
          'glasses',
          'ears',
          'clothing',
          'pants',
          'piercings_ears',
          'hairs',
          'tails'
        ],

        body: {},
        emotions: {},
        horn_front: {},
        horn: {},
        glasses: {},
        ears: {},
        clothing: {},
        pants: {},
        piercings_ears: {},
        hairs: {},
        tails: {}
      },

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

      windPropers: {
        enabled: true,
        cycle: 0
      },

      tapped: false
    }
  },

  computed: {
    ...mapGetters('avatar', [
      'getAngle',
      'getHoriz',
      'getDegress',
      'getPosHoriz',
      'getPosVerti',
      'getPosScale',
      'getPosAngle',
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
      'getWind',
      'getEditMode'
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

        options.XYuv[0] = degress / 90
      },

      immediate: true
    },

    getPosHoriz: {
      handler(horizontal) {
        this.position.horizontal = horizontal
      },

      immediate: true
    },

    getPosVerti: {
      handler(vertical) {
        this.position.vertical = vertical
      },

      immediate: true
    },

    getPosScale: {
      handler(scale) {
        this.position.scale = scale
      },

      immediate: true
    },

    getPosAngle: {
      handler(angle) {
        this.position.angle = angle
      },

      immediate: true
    },

    getProper: {
      handler(propers) {
        const properties = JSON.parse(JSON.stringify(propers))

        // this.SetPropersSide(this.mirror, properties)
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
      this.setGlobal({ path: 'hair_dreads', value: /Dreads/.test(name) })
      this.setGlobal({ path: 'hair_feathers', value: /Feathers/.test(name) })

      if (this.paths.hairs[name]) {
        this.paths.hairs.name = name
      } else {
        const { fileName, name } = this.asFile('hair')

        this.importJSON('hairs', 'hairs/' + fileName + '.json', name)
      }
    },

    'getGlobal.tail_name_en'(name) {
      this.setGlobal({ path: 'tail_dreads', value: /Dreads/.test(name) })

      if (this.paths.tails[name]) {
        this.paths.tails.name = name
      } else {
        const { fileName, name } = this.asFile('tail')

        this.importJSON('tails', 'tails/' + fileName + '.json', name)
      }
    },

    'getGlobal.piercing_ears_name_en'(name) {
      this.paths.piercings_ears.name = name
    },

    'getGlobal.ears_name_en'(name) {
      this.paths.ears.name = name
    },

    'getGlobal.horn_name_en'(name) {
      this.paths.horn.name = name
    },

    'getGlobal.horn_front_name_en'(name) {
      this.paths.horn_front.name = name
    },

    'getGlobal.glasses_name_en'(name) {
      this.paths.glasses.name = name
    },

    'getGlobal.clothing_name_en'(name) {
      this.paths.clothing.name = name
    },

    'getGlobal.pants_name_en'(name) {
      this.paths.pants.name = name
    },

    mirror: {
      handler(value, old) {
        const { getColor } = this

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

        // this.SetPropersSide(value, properties)
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

            this.position.horizontal = x.position_horizontal
            this.position.vertical = x.position_vertical
            this.position.scale = x.position_scale
            this.position.angle = x.position_angle

            options.XYuv[0] = x.degress / 90

            this.properties = x
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

    // this.SetPropersSide(this.mirror, this.properties)

    this.applyGlobals(this.getGlobal)

    this.paths.piercings_ears.name = this.getGlobal.piercing_ears_name_en
    this.paths.ears.name = this.getGlobal.ears_name_en
    this.paths.horn.name = this.getGlobal.horn_name_en
    this.paths.horn_front.name = this.getGlobal.horn_front_name_en
    this.paths.glasses.name = this.getGlobal.glasses_name_en
    this.paths.clothing.name = this.getGlobal.clothing_name_en
    this.paths.pants.name = this.getGlobal.pants_name_en

    const [width, height] = this.setQuality(this.targetQuality)

    initEngine(this)

    this.setPlayChangedFrame()

    const NewGIF = this.gifRef

    this.gif = new NewGIF({
      workers: 4,
      quality: 20,

      width,
      height
    })

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
      'setTailsList',
      'setAllTailsList',
      'setMirror'
    ]),

    ...mapMutations('interface', [
      'setPlayVal',
      'setPlayLen',
      'resetPlaySeek',
      'setPlayRedraw',
      'setPlayChangedFrame',
      'resetPlayChangedFrame',
      'setRendered',
      'setTapping'
    ]),

    applyGlobals(globals) {
      this.globals = JSON.parse(JSON.stringify(globals))
    },

    asFile(key) {
      const name = this.globals[key + '_name_en']

      const fileName = name.toLowerCase().split(' ').join('_')

      return { name, fileName }
    },

    importJSON(target, url, name) {},

    startDrag(e) {
      if (!e.pageX && e.touches) {
        e = e.touches[0]
      }

      this.last.x = e.pageX
      this.last.y = e.pageY

      this.dragging = true

      if (this.tapped === false) {
        this.tapped = true

        this.setTapping(false)
      }
    },

    onDrag(e) {
    },

    stopDrag() {
      if (this.$refs.avatar) {
        localStorage.setItem('lastImage', this.$refs.avatar.toDataURL('image/png'))
      }
    }
  },

  setup() {
    function setQuality(quality) {
      const resolutions = {
        2160: [3840, 2160],
        1440: [2560, 1440],
        1080: [1920, 1080],
        720: [1280, 720],
        480: [854, 480],
        360: [640, 360],
        240: [426, 240],
        144: [256, 144]
      }

      return resolutions[quality * 1024]
    }

    return {
      setQuality
    }
  }
}
</script>

<style lang="sass">
.max-photo-scale
  width: 75vmin
</style>
