
type Object       = { [index: string]: any }
type NestedObject = { [index: string]: Object }


// Getting value from a array of value path

type IGetProp = {
  (
    store: NestedObject,
    props: string[]
  )
  : string | boolean | number
}

const getProp: IGetProp = (store, props) => {
  let result;

  if (props[0]) result = store[props[0]];
  if (props[1]) result = (result as Object)[props[1]];
  if (props[2]) result = result[props[2]];
  if (props[3]) result = result[props[3]];
  if (props[4]) result = result[props[4]];

  return result
}


// Setting the value by array of value path

type ISetProp = {
  (
    store: NestedObject,
    props: string[],
    value: string | boolean | number | Object
  )
  : void
}

const setProp: ISetProp = (store, props, value) => {
  if (props[4]) {
    store[props[0]][props[1]][props[2]][props[3]][props[4]] = value
  } else if (props[3]) {
    store[props[0]][props[1]][props[2]][props[3]] = value
  } else if (props[2]) {
    store[props[0]][props[1]][props[2]] = value
  } else if (props[1]) {
    store[props[0]][props[1]] = value
  } else {
    (store as Object)[props[0]] = value
  }
}


// Export

export { getProp, setProp }