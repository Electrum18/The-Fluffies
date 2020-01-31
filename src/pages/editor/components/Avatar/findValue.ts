
// Types

type Object       = { [index: string]: any }
type NestedObject = { [index: string]: Object }


// Funtions

function reverse(
  target: any,
  path: string,
  X: number
) {
  let path2: string | undefined;

  if (X < 0) {
    if (path == "left")  path2 = "right";
    if (path == "right") path2 = "left";
  }

  return target[path2 || path];
}


// Export

export default function findValue(
  state: NestedObject,
  X: number,
  path: string[]
) {
  let range: any = state[path[0]];

  if (path[1]) range = reverse(range, path[1], X);
  if (path[2]) range = reverse(range, path[2], X);
  if (path[3]) range = range[path[3]];

  return range[0] === "#"
    ? range as string
    : range as number / 100;
}