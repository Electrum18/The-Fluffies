
// Interfaces

interface IFindValue {
  (
    state: { [index: string]: { [index: string]: any } },
    x: number,
    path: string[]
  )
  : number
}


// Declare functions

let
  findValue: IFindValue;


// Functions

findValue = (state, x, path) => {
  let range: { [index: string]: any } = state[path[0]];

  if (path[1]) range = range[path[1]];
  if (path[2]) {
    let path2: string | undefined;

    if (x < 0) {
      if (path[2] == "left")  path2 = "right";
      if (path[2] == "right") path2 = "left";
    }

    range = range[path2 || path[2]];
  }

  if (path[3]) range = range[path[3]];


  return range as any / 100;
}


// Export

export { findValue }