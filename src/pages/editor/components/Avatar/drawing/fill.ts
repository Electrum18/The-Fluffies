import findValue from "../findValue"

export default function(
  fill: string[] | string,
  ctx: CanvasRenderingContext2D ,

  {
    getColor,
    mirror
  }: any
) {
  if (fill) {
    const nested: string | undefined = (fill as string[])[1][1];

    ctx.fillStyle =
      nested
        ? findValue(getColor, mirror ? -1 : 1, fill as string[]) as string
        : fill as string
  } else {
    ctx.fillStyle = "transparent"
  }
}