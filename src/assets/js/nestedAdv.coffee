
# Getting value from a array of value path

getProp = (store, props) ->
  if props[0] then result = store[props[0]]
  if props[1] then result = result[props[1]]
  if props[2] then result = result[props[2]]
  if props[3] then result = result[props[3]]

  return result


# Setting the value by array of value path

setProp = (store, props, value) ->
  if props[3]
    store[props[0]][props[1]][props[2]][props[3]] = value
  else if props[2]
    store[props[0]][props[1]][props[2]] = value
  else if props[1]
    store[props[0]][props[1]] = value
  else
    store[props[0]] = value


export { getProp, setProp }