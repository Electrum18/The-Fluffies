
# Convert string to array for prop path

parseProp = (text) ->
  props = text.match /[A-Z][a-z]+/g

  for prop, i in props
    props[i] = prop.toLowerCase()

  return props


# Getting value from a prop path (self-invoking!)

getProp = (store, props) ->
  if typeof props is "string"
    props = parseProp props

  prop = props.shift()

  if not store[prop] or not props.length
    return store[prop]

  return getProp store[prop], props


# Setting the value in the prop path (self-invoking!)

setProp = (store, props, value) ->
  if typeof props is "string"
    props = parseProp props

  prop = props.shift()

  if not store[prop] or not props.length
    store[prop] = value

    return

  setProp store[prop], props, value



export { getProp, setProp }