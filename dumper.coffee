fs = require 'fs'

path = "./dist/js/support.js"


fs.readFile path, 'utf8', (err, data) ->
  if err then throw err

  first = data.length
  arr   = data.match /,{?(("|')?(\w|-)+("|')?:{?(("|')([^"'])+?("|')|\d+)?}?,?)+}/g

  for e in arr
    key = e.match(/"?(\w|-)+"?:/g)[0]

    if key in ["attrs:", "staticClass:", "staticStyle:"]
      name = e.match /name:("|')\w+("|')/g  # Component attribute

      if name then continue

      if e.match(/{/g).length < e.match(/}/g).length
        data = data.replace e, "}"

      else if e.match(/{/g).length > e.match(/}/g).length
        data = data.replace e + ",", ",{"

      else data = data.replace e, ""

  fs.writeFile path, data, (err) ->
    if err then throw err

    console.log "Compressed: #{100 - Math.round((data.length / first) * 10000) / 100}%,",
      Math.round((first / data.length) * 100) / 100 + " times"

    console.log "File #{path} was saved!"
