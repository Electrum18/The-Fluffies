import If from "./drawing/if"
import Clip from "./drawing/clip"
import Stroke from "./drawing/stroke"
import Fill from "./drawing/fill"

type Object = { [index: string]: any };
type NestedObject = { [index: string]: Object };

export default function(this: any) {
  // Caching

  const ctx: CanvasRenderingContext2D = this.ctx;

  const x: number = this.x,
    quality: number = this.quality,

    calculated: NestedObject = this.calculated,
    state: NestedObject = this.state,
    getColor: NestedObject = this.color,

    horiz: number = this.horiz,
    angle: number = this.angle,

    mirror: boolean = this.mirror,

    absAngle: number = x < 0 ? -x : x,
    toRad: number = Math.PI / 180,

    center = {
      x: ctx.canvas.width  / 2 * 0.5,
      y: ctx.canvas.height / 2 * 0.8
    };


  function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function setAng(ang: number, [shiftX, shiftY]: number[], ratio: number) {
    const qIn = quality * ratio,
      { x, y } = center;

    ctx.translate(x + (shiftX * qIn), y + (shiftY * qIn));
    ctx.rotate(ang * toRad);
    ctx.translate(-x - (shiftX * qIn), -y - (shiftY * qIn));
  }

  // Shifts ratio

  let posX: number, scaleX: number;

  if (mirror) {
    posX = 3 / 4;
    scaleX = -1;
  } else {
    posX = 1 / 4;
    scaleX = 1;
  }

  const rotatable = [
    "head", "head2", "chin", "hair", "glasses",
    "eyeLeft", "eyeLeftBrow", "eyeRight", "eyeRightBrow",
    "teethUpper", "teethLower"
  ],

    hooves: NestedObject = state.hooves,

    { elbow: elbowL, shoulder: shoulderL, wrist: wristL } = hooves.left,
    { elbow: elbowR, shoulder: shoulderR, wrist: wristR } = hooves.right,

  // Getting an array of elements from an array of layers

    layers: NestedObject[][] = this.layers;

  for (let i = 0; i < layers.length; i++) {
    const elems: any[] = layers[i],
      layer: string = elems[0],
      height = hooves.enable ? 80 : 112;

    ctx.setTransform(scaleX, 0, 0, 1, ctx.canvas.width * posX, height * quality * 2);

    // Layer transformation

    if (rotatable.includes(layer)) {
      setAng(angle, [0, 0], 0);

    // Arms

    } else if (["leftForearm", "leftTibia", "leftWrist"].includes(layer)) {
      ctx.translate(-(absAngle ** 0.25) * 150 * quality, 0);

      setAng(shoulderL.angle, [65, 325], 1.5);

    } else if (["rightForearm", "rightTibia", "rightWrist"].includes(layer)) {
      ctx.translate(-(absAngle ** 0.25) * 33 * quality, 0);

      setAng(shoulderR.angle, [-65, 325], 1.5);
    }

    // Tibia's

    if (layer == "leftTibia" || layer == "leftWrist") {
      setAng(elbowL.angle, [71, 350 - (shoulderL.rise * 2.22)], 1.4);

    } else if (layer == "rightTibia" || layer == "rightWrist") {
      setAng(elbowR.angle, [-71, 350 - (shoulderR.rise * 2.22)], 1.4);
    }

    // Wrists

    if (layer == "leftWrist") {
      setAng(wristL.angle, [86, 350 - ((elbowL.rise * 2.5) + (shoulderL.rise * 1.65))], 1.4);

    } else if (layer == "rightWrist") {
      setAng(wristR.angle, [-86, 350 - ((elbowR.rise * 2.5) + (shoulderR.rise * 1.65))], 1.4);
    }

    // Layers

    if (layer == "head") {
      ctx.translate(0, -horiz * 20 * quality);

    } else if (layer == "eyeLeftBrow") {
      const side = x < 0 ? "right" : "left";

      ctx.translate(
        0,
        -horiz * 20 * quality - (state.eyes.brows[side].height / 7)
      );

    } else if (layer == "eyeRightBrow") {
      const side = x < 0 ? "left" : "right";

      ctx.translate(
        0,
        -horiz * 20 * quality - (state.eyes.brows[side].height / 7)
      );

    } else if (layer == "head2") {
      ctx.translate(0, horiz * 10 * quality);

    } else if (layer == "leftTibia") {
      ctx.translate(0, -(shoulderL.rise - elbowL.rise) * 3 * quality);

    } else if (layer == "rightTibia") {
      ctx.translate(0, -(shoulderR.rise - elbowR.rise) * 3 * quality);

    } else if (layer == "leftWrist") {
      ctx.translate(
        (
          (15 * (1 - (wristL.rise / 100))) *
          (
            ((shoulderL.rise / 500) + (elbowL.rise / 120)) * (1 - (wristL.rise / 200))
          )
        ),
        -(shoulderL.rise + elbowL.rise - (wristL.rise * 2)) * 3 * quality
      );

    } else if (layer == "rightWrist") {
      ctx.translate(
        -(
          (15 * (1 - (wristR.rise / 100))) * (
            ((shoulderR.rise / 500) + (elbowR.rise / 120)) * (1 - (wristR.rise / 200))
          )
        ),
        -(shoulderR.rise + elbowR.rise - (wristR.rise * 2)) * 3 * quality
      );
    };

    if (layer == "eyeLeft" || layer == "eyeRight") {
      const mirrored = mirror ? -1 : 1,
        position = state.eyes.position,

        inHoriz = (position.horiz - 50) / 1.5,
        inVerti = (position.verti - 50) / 1.5;

      ctx.translate(inHoriz * mirrored, (-horiz * 20 * quality) - inVerti);

    } else if (layer == "teethUpper") {
      const upper = (100 - state.teeth.upper) / 3;

      ctx.translate(upper * absAngle, (-horiz * 20 * quality) - upper);

    } else if (layer == "teethLower") {
      const lower = (100 - state.teeth.lower) / 3;

      ctx.translate(-lower * absAngle, (-horiz * 20 * quality) + lower);
    }

    // Work with array of elements

    const len = elems[1].length;

    for (let i = 0; i < len; i++) {
      const elem = elems[1][i];

      if (!calculated[elem.type]) continue;

      if (If(elem.if, elem.type, state, { mirror, absAngle })) continue;

      Clip(elem.clip, ctx, state, {
          horiz,
          quality,
          calculated,
          layer,
          mirror,
          absAngle
      });

      Fill(elem.fill, ctx, { getColor, mirror });

      Stroke(elem.stroke, elem.type, ctx, state, {
        getColor,
        quality,
        x
      });

      // Checking for male elements

      let type: string;

      if (state.male) {
        const name = "male" + capitalize(elem.type);

        type = calculated[name] ? name : elem.type

      } else {
        type = elem.type
      }

      // Drawing the elements themselves

      const calcType = calculated[type];

      for (let i = 0; i < calcType.length; i++) {
        const part = calcType[i];

        if (part[0] == "C") {
          ctx.bezierCurveTo(
            part[1] * quality, part[2] * quality,
            part[3] * quality, part[4] * quality,
            part[5] * quality, part[6] * quality
          );
        } else {
          if (i > 0) {  // If the item is not the first
            ctx.fill();
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.moveTo(part[1] * quality, part[2] * quality);
        }
      }

      // Apply context settings

      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
}