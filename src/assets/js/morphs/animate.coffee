export default (self, refs, clips) ->
  $ = self

  male = $.$parent.male

  for key in $.keys
    if male && $.furs.male[key]
         paths = $.furs.male[key]
    else paths = $.furs[key]

    length     = paths.length - 1
    fullRange  = $.x * length
    absPercent = $.AbsoluteDegress / 90

    if key is "chin"
      if $.degress > 0
        if $.degress > 30
              fullRange = absPercent ** 0.75 * length
        else fullRange = absPercent ** 2.5  * length * 6.8
      else
        if $.degress > -30
              fullRange = absPercent ** 2.5  * length * 6.8
        else fullRange = absPercent ** 0.75 * length

    if key in ["nose", "bridge", "mouth", "fangsLeft", "fangsRight",
      "nostrilLeft", "nostrilRight", "teethUpper", "teethLower", "tongue"]

      if $.degress > 0
        if $.degress > 30
              fullRange = absPercent ** 0.5 * length
        else fullRange = absPercent ** 2   * length * 5.15

      else
        if $.degress > -30
              fullRange = absPercent ** 2   * length * 5.15
        else fullRange = absPercent ** 0.5 * length

    else if key in ["eyeLeftLashesUpper", "eyeLeftLashesMiddle",
      "eyeLeftLashesLower" ]

      if $.degress > 0
        if $.degress > 30
              fullRange = absPercent ** 0.25 * length
        else fullRange = absPercent ** 0.75 * length * 1.75

      else
        if $.degress > -30
              fullRange = absPercent ** 0.75 * length * 1.75
        else fullRange = absPercent ** 0.25 * length

    frame = Math.floor fullRange
    range = fullRange - frame

    if frame < 0
      frame = paths.length - 1 + frame
      range = 1 - range

    else frame = paths.length - 2 - frame

    if frame < 0 then frame = 0; range = 1

    isEyelid =
      [ "eyeLeftLidUp",  "eyeLeftLidUpFill",  "eyeLeftLidDown",  "eyeLeftLidDownFill",
        "eyeRightLidUp", "eyeRightLidUpFill", "eyeRightLidDown", "eyeRightLidDownFill" ]

    lashes =
      left: ["eyeLeftLashesUpper",  "eyeLeftLashesMiddle",  "eyeLeftLashesLower"]
      right: ["eyeRightLashesUpper", "eyeRightLashesMiddle", "eyeRightLashesLower"]

    # Set ear to "front or not"

    if key in ["earRightInside", "earRightPinna", "earRight",
      "earRightTasselInside", "earRightTassel"]

      if $.$root.horiz <= 0 or $.AbsoluteDegress >= 45
        if key in ["earRightTassel", "earRightTasselInside"] and not $.$root.tassels
          refs[key + "Front"].setAttribute "d", ""
          refs[key].setAttribute "d", ""

        else
          animHoriz = $.morph [paths[frame + 1], paths[frame]]

          refs[key + "Front"].setAttribute "d", animHoriz range
          refs[key].setAttribute "d", ""
      else
        if key in ["earRightTassel", "earRightTasselInside"] and not $.$root.tassels
          refs[key + "Front"].setAttribute "d", ""
          refs[key].setAttribute "d", ""

        else
          animHoriz = $.morph [paths[frame + 1], paths[frame]]

          refs[key + "Front"].setAttribute "d", ""
          refs[key].setAttribute "d", animHoriz range

    else if key in isEyelid
      eyelids  = $.$root.eyes.eyelids
      emotions = $.emotions.eyelid

      ids = isEyelid.indexOf key

      eyelid = [
        { val: eyelids.left.up,    target: emotions.left.down }
        { val: eyelids.left.up,    target: emotions.left.up.fill }
        { val: eyelids.left.down,  target: emotions.left.up.basic }
        { val: eyelids.left.down,  target: $.$root.$refs["eyeLeft"].getAttribute "d" }
        { val: eyelids.right.up,   target: emotions.right.down }
        { val: eyelids.right.up,   target: emotions.right.up.fill }
        { val: eyelids.right.down, target: emotions.right.up.basic }
        { val: eyelids.right.down, target: $.$root.$refs["eyeRight"].getAttribute "d" }
      ]

      if $.degress >= 0
        id = if ids < 4 then ids + 4 else ids - 4

        target = eyelid[id].target
        val    = eyelid[ids].val
        elem   = isEyelid[id]

        if val > 0 or key in ["eyeLeftLidUp", "eyeRightLidUp"]
          if typeof target isnt "string"
            animSecond = $.morph [target[frame + 1], target[frame]]
            target     = animSecond range

          animSecond = $.morph [$.furs[elem][frame + 1], $.furs[elem][frame]]
          animSumm   = $.morph [animSecond(range), target]

          refs[elem].setAttribute "d", animSumm val / 100

        else refs[elem].setAttribute "d", ""

      else
        target = eyelid[ids].target
        val    = eyelid[ids].val

        if eyelid[ids].val > 0 or key in ["eyeLeftLidUp", "eyeRightLidUp"]
          if typeof target isnt "string"
            animSecond = $.morph [target[frame + 1], target[frame]]
            target     = animSecond range

          animHoriz = $.morph [paths[frame + 1], paths[frame]]
          animSumm  = $.morph [animHoriz(range), target]

          refs[key].setAttribute "d", animSumm val / 100

        else refs[key].setAttribute "d", ""

    else if key in ["earLeftTasselInside", "earLeftTassel"]
      if $.$root.tassels
        animHoriz = $.morph [paths[frame + 1], paths[frame]]

        refs[key].setAttribute "d", animHoriz range

      else refs[key].setAttribute "d", ""

    else if key in ["fangsLeft", "fangsRight"]
      if $.$root.fangs
        animHoriz = $.morph [paths[frame + 1], paths[frame]]

        refs[key].setAttribute "d", animHoriz range

      else refs[key].setAttribute "d", ""

    else if key is "mouth"
      if $.$root.catlike
        animHoriz =
          $.morph [
            $.emotions.catlike.jaw[frame + 1],
            $.emotions.catlike.jaw[frame]
          ]

      else animHoriz = $.morph [paths[frame + 1], paths[frame]]

      jaw  = $.$root.jaw
      type = if $.$root.catlike then "catlike" else "basic"

      animSad =
        $.morph [
          $.emotions.sad.jaw[type].closed[frame + 1],
          $.emotions.sad.jaw[type].closed[frame]
        ]

      animOpen =
        $.morph [
          $.emotions.open.jaw[type][frame + 1],
          $.emotions.open.jaw[type][frame]
        ]

      animOpenSad =
        $.morph [
          $.emotions.sad.jaw[type].open[frame + 1],
          $.emotions.sad.jaw[type].open[frame]
        ]

      animSumm     = $.morph [animHoriz(range), animSad range    ]
      animSummOpen = $.morph [animOpen(range),  animOpenSad range]
      animMouth    =
        $.morph [
          animSumm(jaw.sad / 100),
          animSummOpen jaw.sad / 100
        ]

      refs[key].setAttribute "d", animMouth jaw.open / 100
      refs["mouthOuter"].setAttribute "d", animSumm jaw.sad  / 100

      clips[key + "Clip"] = animMouth jaw.open / 100

    else if key in lashes.left
      if fullRange >= 1.9 or male
        refs[key].setAttribute "d", ""

        continue

      val    = $.$root.eyes.eyelids.left.up
      closed = $.body.eye.left.lashes

      index = lashes.left.indexOf key
      parts = ["upper", "middle", "lower"]
      path  = closed[parts[index]].closed

      animHoriz = $.morph [paths[frame + 1], paths[frame]]

      animLashesDown = $.morph [path[frame + 1], path[frame]]
      animLashesSumm =
        $.morph [animHoriz(range), animLashesDown range]

      if $.degress >= 0 then val = $.$root.eyes.eyelids.right.up

      refs[key].setAttribute "d", animLashesSumm val / 100

    else if key in lashes.right
      if male
        refs[key].setAttribute "d", ""

        continue

      val    = $.$root.eyes.eyelids.right.up
      closed = $.body.eye.right.lashes

      index = lashes.right.indexOf key
      parts = ["upper", "middle", "lower"]
      path  = closed[parts[index]].closed

      animHoriz = $.morph [paths[frame + 1], paths[frame]]

      animLashesDown = $.morph [path[frame + 1], path[frame]]
      animLashesSumm =
        $.morph [animHoriz(range), animLashesDown range]

      if $.degress >= 0 then val = $.$root.eyes.eyelids.left.up

      refs[key].setAttribute "d", animLashesSumm val / 100


    else if key in ["eyeLeftBrow", "eyeRightBrow"]
      side    = if key  is "eyeLeftBrow" then "left" else "right"
      sideAlt = if side is "left"        then "right" else "left"

      brow = $.$root.eyes.brows
      eye  = $.body.eye

      evil = eye[side].brow.evil
      wide = eye[side].brow.wide

      val =
        evil: if $.degress >= 0 then brow[sideAlt].evil else brow[side].evil
        wide: if $.degress >= 0 then brow[sideAlt].wide else brow[side].wide

      animHoriz = $.morph [paths[frame + 1], paths[frame]]

      animBrowEvil = $.morph [evil[frame + 1], evil[frame]]
      animBrowSumm =
        $.morph [animHoriz(range), animBrowEvil range]

      animBrowWide  = $.morph [wide[frame + 1], wide[frame]]
      animBrowSumm2 =
        $.morph [animBrowSumm(val.evil / 100), animBrowWide range]

      refs[key].setAttribute "d",
        if brow.show then animBrowSumm2 val.wide / 100 else ""

    else if key is "horn"
      animHoriz =
        if $.$root.horn.changeling
          paths = $.body.horn.changeling

          $.morph [paths[frame + 1], paths[frame]]

        else $.morph [paths[frame + 1], paths[frame]]

      refs[key].setAttribute "d", animHoriz range

    else if key is "hornSecond"
      animHoriz = $.morph [paths[frame + 1], paths[frame]], { origin: { x: 0.75, y: 0.75 } }

      refs[key].setAttribute "d", animHoriz range

    else if key is "stripesCrust"
      animHoriz = $.morph [paths[frame + 1], paths[frame]], { origin: { x: 0.75, y: 0.5 } }

      refs[key].setAttribute "d", animHoriz range

    else if key is "stripesFore"
      animHoriz = $.morph [paths[frame + 1], paths[frame]], { origin: { x: 0.5, y: 0.5 } }

      refs[key].setAttribute "d", animHoriz range

    else
      refs[key].setAttribute "d", $.morph([paths[frame + 1], paths[frame]]) range


    # Teeth position

    if key is "tongue"
      refs[key].setAttribute "style",
        "transform: translate(0%, #{ -(2 - $.$root.jaw.open / 50) }%)"

    else if key is "teethUpper"
      refs[key].setAttribute "style",
        "transform: translate(0%, #{ -(4 - $.$root.teeth.upper / 25) }%)"

    else if key is "teethLower"
      refs[key].setAttribute "style",
        "transform: translate(0%, #{ 4 - $.$root.teeth.lower / 25 }%)"

    # Set clip paths

    else if key in ["head", "nose", "eyeLeft", "eyeRight", "horn", "neck"]
      clips[key + "Clip"] = $.morph([paths[frame + 1], paths[frame]]) range

    else if key in ["earLeft", "earRight", "earRightFront"] and $.$root.earClipEnabled
      clips[key + "Clip"] = $.morph([paths[frame + 1], paths[frame]]) range

    if refs[key  + "Shadow"]
      refs[key + "Shadow"].setAttribute "d", $.morph([paths[frame + 1], paths[frame]]) range
