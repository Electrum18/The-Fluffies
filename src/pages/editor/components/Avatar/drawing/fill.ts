type Object = { [index: string]: any };
type NestedObject = { [index: string]: Object };

type Args = {
  getColor: NestedObject,
  mirror: boolean
};

import findValue from "../findValue";

export default function(
  fill: string[] | string,
  ctx: CanvasRenderingContext2D,

  { getColor, mirror }: Args
) {
  if (fill) {
    const nested = fill[1][1];

    ctx.fillStyle = nested
      ? findValue(getColor, mirror ? -1 : 1, fill as string[]) as string
      : fill as string;
  } else {
    ctx.fillStyle = "transparent";
  }
}