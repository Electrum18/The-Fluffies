type Object = { [index: string]: any };
type NestedObject = { [index: string]: Object };

type Args = {
  getColor: NestedObject,
  quality: number,
  x: number
};

export default function(
  stroke: number[] | string[][],
  type: string,
  ctx: CanvasRenderingContext2D,
  state: NestedObject,

  { getColor, quality, x }: Args
) {
  if (stroke[1]) {
    const strokeVal = stroke[1] as string[],
      color: string = strokeVal[1][1]
        ? getColor[strokeVal[0]][strokeVal[1]]
        : strokeVal;

    // Stroke setting

    let lineWidth = stroke[0] as number;

    if (type === "eyeLeftBrow" || type === "eyeRightBrow") {
      let side: "left" | "right";

      if (type === "eyeLeftBrow") {
        side = x < 0 ? "right" : "left";
      } else {
        side = x < 0 ? "left" : "right";
      }

      lineWidth += (state.eyes.brows[side].width - 100) / 10;
    } else if (["glassesLeft", "glassesRight", "glassesNose"].includes(type)) {
      lineWidth += (state.glasses.width - 100) / 10;
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth * quality;
  } else {
    ctx.strokeStyle = "transparent";
  }
}
