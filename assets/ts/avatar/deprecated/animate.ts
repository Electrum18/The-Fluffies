export default function(this: any) {
  this.quality = this.targetQuality / 1.25

  // Animation rendering

  if (this.rendering) {
    const frameDuration = 1000 / this.getFPS

    this.gif.addFrame(this.$refs.avatar, {
      copy: true,
      delay: this.fps.every * frameDuration
    })
  }
}
