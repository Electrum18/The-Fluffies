import { calculation } from '../computing';

type Object = { [index: string]: any };
type NestedObject = { [index: string]: Object };

export default function(
  clip: string[],
  ctx: CanvasRenderingContext2D,
  state: NestedObject,

  { horiz, quality, calculated, layer, mirror, absAngle }: any
) {
  if (clip) {
    // Transformation function

    function translate(
      clipItem: string,
      back: boolean | number,
      callback: () => void
    ) {
      back = back ? -1 : 1;

      if (clipItem == "head0") {
        ctx.translate(0, -horiz * back * 12 * quality);
      } else if (clipItem == "earRight") {
        ctx.translate(0, horiz * back * 10 * quality);
      } else if (layer == "teethUpper") {
        const upper = ((100 - state.teeth.upper) / 3) * back * quality;

        ctx.translate(-upper * absAngle, upper);
      } else if (layer == "teethLower") {
        const lower = ((100 - state.teeth.lower) / 3) * back * quality;

        ctx.translate(lower * absAngle, -lower);
      } else {
        callback();
      }
    }

    // Start drawing clip path

    ctx.save();
    ctx.beginPath();

    // Finding and adjusting a clipping path

    let clear = false;

    for (let i = 0; i < clip.length; i++) {
      let clipItem = clip[i];

      // Reverse statement

      if (clipItem[0] == "!") {
        clear = true;

        clipItem = clipItem.replace("!", "");

        const canvas = ctx.canvas;

        ctx.rect(0, 0, canvas.width, canvas.height);
      }

      // Clipping transformation

      translate(clipItem, false, () => {
        if (clipItem == "eyeLeft" || clipItem == "eyeRight") {
          const mirrored = mirror ? -1 : 1,
            { horiz, verti } = state.eyes.position,

            inHoriz = (horiz - 50) / 1.5,
            inVerti = (verti - 50) / 1.5;

          ctx.translate(-inHoriz * quality * mirrored, inVerti * quality);
        }
      });

      // Creating clipping path

      calculated = calculated[clipItem];

      if (calculated) {
        for (let i = 0; i < calculated.length; i++) {
          const part: (number | string)[] = calculated[i];

          if (part[0] == "M") {
            ctx.moveTo(
              (part[1] as number) * quality,
              (part[2] as number) * quality
            );
          } else {
            ctx.bezierCurveTo(
              (part[1] as number) * quality,
              (part[2] as number) * quality,
              (part[3] as number) * quality,
              (part[4] as number) * quality,
              (part[5] as number) * quality,
              (part[6] as number) * quality
            );
          }
        }
      }

      // Clipping resetting transformation

      translate(clipItem, true, () => {
        if (clipItem == "eyeLeft" || clipItem == "eyeRight") {
          const mirrored = mirror ? -1 : 1,
            { horiz, verti } = state.eyes.position,

            inHoriz = horiz / 3,
            inVerti = verti / 3;

          ctx.translate(inHoriz * quality * mirrored, -inVerti * quality);
        }
      });
    }

    // Apply clipping

    if (clear) {
      ctx.clip("evenodd");
    } else {
      ctx.clip();
    }
  }
}