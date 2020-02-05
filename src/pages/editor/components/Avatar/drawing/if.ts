type Object = { [index: string]: any };
type NestedObject = { [index: string]: Object };

type Args = {
  mirror: boolean,
  absAngle: number
};

export default function(
  ifs: string[] | string,
  type: string,
  state: NestedObject,

  { mirror, absAngle }: Args
) {
  if (state.male) {
    if (type == "eyeLeftLashes" || type == "eyeRightLashes") return true;
  } else {
    if (type == "eyeLeftLashes" && absAngle > 0.9) return true;
  }

  // When having an attribute if

  if (ifs) {
    if (!ifs[0][1]) {
      if (!state[ifs as string]) return true;
    } else {
      // Finding a nested value

      let nested: NestedObject;

      // Nesting level 1

      if (state[ifs[0]]) {
        nested = state[ifs[0]];
      } else {
        return true;
      }

      // Nesting level 2

      if (nested[ifs[1]]) {
        if (ifs[0] == "piercings") {
          const sidePiercing: Object = mirror
            ? { left: "right", right: "left" }
            : { left: "left", right: "right" };

          nested = nested[sidePiercing[ifs[1]]];

          // Special piercing checks

          if (!nested.enable) {
            return true;
          } else if (!nested[ifs[2]]) {
            return true;
          } else {
            return false;
          }
        } else {
          nested = nested[ifs[1]];
        }
      } else {
        return true;
      }

      // Nesting level 3

      if (ifs[1] === "brows") {
        if (!nested[ifs[2]]) return true;
      } else {
        if (nested[ifs[2]]) return true;
      }
    }
  }
}