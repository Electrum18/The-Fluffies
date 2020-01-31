import { changeCanvas, calculation, calculationBody } from "./computing"

export default function(this: any) {
  if (!this.executeAnimation) {

    // Does not calculate with the same paths

    const delay = 10;

    if (this.afterChange < delay) this.afterChange++;

    this.fullQuality      = this.afterChange >= delay;
    this.executeAnimation = this.fullQuality && this.quality < 1;

    window.requestAnimationFrame(this.animate);

    return
  }

  this.quality = !this.fullQuality ? this.vmin / 1024 / 2 : 1;


  changeCanvas(this);


  // Caching

  const
    X        = this.x,
    absAngle = X < 0 ? -X : X,

    [paths, state] = [this.paths, this.state],
    [math,  morph] = [this.math,  this.morph],

    interpolationScheme = this.interpolationScheme,

    { body, emotions, hairs, glasses, horn } = paths;



  // Calculation of elements for drawing

  let calculated: any = [];  // Create value for redraw

  const
    args     = { calculated, morph, math, absAngle },
    argsBody = {...args, interpolationScheme, X, emotions };

  calculationBody(paths.body, state, argsBody)

  calculation(paths.hairs,   state.hair,    args);
  calculation(paths.glasses, state.glasses, args);
  calculation(paths.horn,    state.horn,    args);


  // Set values

  this.calculated = calculated;  // Paths apply

  if (body && emotions && hairs && glasses && horn) {
    this.executeAnimation = false;
  }

  if (!this.fullQuality) this.afterChange = 0;  // Reset timer

  this.draw();


  // Request next frame

  window.requestAnimationFrame(this.animate);
}