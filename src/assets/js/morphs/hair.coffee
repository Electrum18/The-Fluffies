export default (self, refs, clips) ->
  $ = self

  hair = $.$root.hair
  mane = $.$root.mane

  if !hair.info[hair.id] then return

  hairPaths = $.hairs[hair.name]

  elems = [
    "hair", "hairSecond",
    "hairNape", "hairNapeSecond",
    "hairTail", "hairTailSecond"
  ]

  parts = ["front", "back", "tail"]

  i2 = -1

  for elem, i in elems
    if i % 2 is 0 then i2++

    isSecond = if i % 2 is 0 then "main" else
      if mane.second.isEnds and hairPaths[parts[i2]].ends
        "ends"
      else "second"

    paths     = hairPaths[parts[i2]][isSecond]
    fullRange = $.x * 2

    frame = Math.floor fullRange
    range = fullRange - frame
    mirroring = hair.info[hair.id].mirroring

    if hairPaths.fix and hairPaths.fix[parts[i2]] and
        hairPaths.fix[parts[i2]][isSecond] and
        hairPaths.fix[parts[i2]][isSecond].x

      origin = { origin: hairPaths.fix[parts[i2]][isSecond] }

    else origin = { origin: { x: 0, y: 0 } }

    setBehind = ->
      if refs[elem  + "Shadow"]
        refs[elem + "Shadow"].setAttribute "d", animHoriz range

      if refs[elem  + "FrontShadow"]
        refs[elem + "FrontShadow"].setAttribute "d", ""

      refs[elem].setAttribute "d", animHoriz range
      refs[elem + "Front"].setAttribute "d", ""

    setFront = ->
      if refs[elem  + "Shadow"]
        refs[elem + "Shadow"].setAttribute "d", ""

      if refs[elem  + "FrontShadow"]
        refs[elem + "FrontShadow"].setAttribute "d", animHoriz range

      refs[elem].setAttribute "d", ""
      refs[elem + "Front"].setAttribute "d", animHoriz range

    setClear = ->
      if refs[elem  + "Shadow"]
        refs[elem + "Shadow"].setAttribute "d", ""

      if refs[elem  + "FrontShadow"]
        refs[elem + "FrontShadow"].setAttribute "d", ""

      refs[elem].setAttribute "d", ""
      refs[elem + "Front"].setAttribute "d", ""

    frame = 2 + frame

    if frame > 3 then frame = 3; range = 1

    if paths.length is 0 then setClear(); continue

    animHoriz =
      if frame > 1 and mirroring
           $.morph [paths[4 - frame], paths[3 - frame]], origin
      else $.morph [paths[frame],     paths[frame + 1]], origin

    if isSecond
      clips[elem + "Clip"] = animHoriz range

    if elem in ["hair", "hairSecond"] then setFront()
    else if elem in ["hairTail", "hairTailSecond"] and hair isnt "Curly ends"
      setFront()
    else if elem in ["hairTail", "hairTailSecond"] and hair isnt "Curly ends" and $.degress > 0
      setFront()

    else if hair.name in ["Curly ends"]
      if elem in ["hairTail", "hairTailSecond"] and $.degress > 0 then setFront() else
        if elem in ["hairNape", "hairNapeSecond"] and $.degress < 0 then setFront()
        else setBehind()

    else setBehind()

  side = hair.side

  if $.degress < 0 and not mirroring
    side.basic = { transform: "scale(-1, 1)" }
    side.alt   = { transform: "" }
    side.front = { transform: "" }

  else
    side.basic = { transform: "" }
    side.alt   = { transform: "scale(-1, 1)" }
    side.front = { transform: "scale(-1, 1) translate(-100%)" }
