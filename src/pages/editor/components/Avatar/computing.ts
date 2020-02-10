type Object = { [index: string]: any };
type NestedObject = { [index: string]: Object };

type Args = {
  calculated: NestedObject,
  morph: Function,
  math: Object,
  absAngle: number,
  interpolationScheme: Object,
  emotions: NestedObject,
  X: number
}

import findValue from './findValue';

function beginCalc(
  ref: NestedObject,

  { calculated, morph, math, absAngle, interpolationScheme, emotions, X }: Args,

  state?: NestedObject,
  isBody?: boolean | undefined
) {
  if (ref) {
    const { keys } = ref;

    for (let i = 0; i < keys.length; i++) {
      const key: string = keys[i],
        paths = ref[key];

      let [pow, mul] = [1, 1];

      if (math[key] === 1.5) {
        if (absAngle > 0.26) {
          [pow, mul] = [1.5, 1];
        } else {
          [pow, mul] = [1, 1.55];
        }
      } else if (math[key]) {
        pow = math[key];
      }

      const fullRange = (1 - absAngle ** (1 / pow) * mul) * (paths.length - 1),
        frame = fullRange | 0,
        range = fullRange - frame,
        interpolation = isBody ? interpolationScheme[key] : false;

      // For nested arrays with tags

      function nestedMorph(innerInterpolation: string[] | string[][]) {
        if (!emotions) return;

        const pathsSheme = innerInterpolation[0],
          path1 = emotions[pathsSheme[0]] || paths,
          path2 = emotions[pathsSheme[1]] || paths;

        return morph(
          morph(path1[frame], path1[frame + 1], range),
          morph(path2[frame], path2[frame + 1], range),

          findValue(state as NestedObject, X, innerInterpolation[1] as string[])
        );
      }

      if (interpolation) {
        const nested = !interpolation[0][0][3];

        if (!nested) {
          calculated[key] = nestedMorph(interpolation);
        } else {
          const pathsSheme: string[][] = interpolation[0];

          calculated[key] = morph(
            nestedMorph(pathsSheme[0]),
            nestedMorph(pathsSheme[1]),

            findValue(state as NestedObject, X, interpolation[1])
          );
        }
      } else {
        calculated[key] = morph(paths[frame], paths[frame + 1], range);
      }
    }
  }
}

export function changeCanvas(self: any) {
  const ctx = self.ctx;

  ctx.canvas.width = Math.round(1024 * self.quality * 2);
  ctx.canvas.height = Math.round(1024 * self.quality * 1.25);

  ctx.lineCap = ctx.lineJoin = 'round';
}

export function calculation(
  paths: NestedObject,
  state: NestedObject,
  args: Args
) {
  if (paths) {
    const ref = paths[state.name['en']];

    beginCalc(ref, args);
  }
}

export function calculationBody(
  paths: NestedObject,
  state: NestedObject,
  args: Args
) {
  if (paths) beginCalc(paths, args, state, true);
}