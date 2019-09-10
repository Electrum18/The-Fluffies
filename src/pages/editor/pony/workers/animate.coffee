morph = require("polymorph-js").interpolate

self.addEventListener "message", ($) ->
  $ = $.data

  for key in $.keys
    if $.male && $.furs.male[key]
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

      if $.root.horiz <= 0 or $.AbsoluteDegress >= 45
        if key in ["earRightTassel", "earRightTasselInside"] and not $.root.tassels
          self.postMessage { type: "refs", key: key + "Front", path: "" }
          self.postMessage { type: "refs", key,                path: "" }

        else
          animHoriz = morph [paths[frame + 1], paths[frame]]

          self.postMessage { type: "refs", key: key + "Front", path: animHoriz range }
          self.postMessage { type: "refs", key: key,           path: "" }
      else
        if key in ["earRightTassel", "earRightTasselInside"] and not $.root.tassels
          self.postMessage { type: "refs", key: key + "Front", path: "" }
          self.postMessage { type: "refs", key,                path: "" }

        else
          animHoriz = morph [paths[frame + 1], paths[frame]]

          self.postMessage { type: "refs", key: key + "Front", path: "" }
          self.postMessage { type: "refs", key,                path: animHoriz range }

    else if key in isEyelid
      eyelids  = $.root.eyes.eyelids
      emotions = $.emotions.eyelid

      ids = isEyelid.indexOf key

      eyelid = [
        { val: eyelids.left.up,    target: emotions.left.down }
        { val: eyelids.left.up,    target: emotions.left.up.fill }
        { val: eyelids.left.down,  target: emotions.left.up.basic }
        { val: eyelids.left.down,  target: $.d.eyeLeft }
        { val: eyelids.right.up,   target: emotions.right.down }
        { val: eyelids.right.up,   target: emotions.right.up.fill }
        { val: eyelids.right.down, target: emotions.right.up.basic }
        { val: eyelids.right.down, target: $.d.eyeRight }
      ]

      if $.degress >= 0
        id = if ids < 4 then ids + 4 else ids - 4

        target = eyelid[id].target
        val    = eyelid[ids].val
        elem   = isEyelid[id]

        if val > 0 or key in ["eyeLeftLidUp", "eyeRightLidUp"]
          if typeof target isnt "string"
            animSecond = morph [target[frame + 1], target[frame]]
            target     = animSecond range

          animSecond = morph [$.furs[elem][frame + 1], $.furs[elem][frame]]
          animSumm   = morph [animSecond(range), target]

          self.postMessage { type: "refs", key: elem, path: animSumm val / 100 }

        else self.postMessage { type: "refs", key: elem, path: "" }

      else
        target = eyelid[ids].target
        val    = eyelid[ids].val

        if eyelid[ids].val > 0 or key in ["eyeLeftLidUp", "eyeRightLidUp"]
          if typeof target isnt "string"
            animSecond = morph [target[frame + 1], target[frame]]
            target     = animSecond range

          animHoriz = morph [paths[frame + 1], paths[frame]]
          animSumm  = morph [animHoriz(range), target]

          self.postMessage { type: "refs", key, path: animSumm val / 100 }

        else self.postMessage { type: "refs", key, path: "" }

    else if key in ["earLeftTasselInside", "earLeftTassel"]
      if $.root.tassels
        animHoriz = morph [paths[frame + 1], paths[frame]]

        self.postMessage { type: "refs", key, path: animHoriz range }

      else self.postMessage { type: "refs", key, path: "" }

    else if key in ["fangsLeft", "fangsRight"]
      if $.root.fangs
        animHoriz = morph [paths[frame + 1], paths[frame]]

        self.postMessage { type: "refs", key, path: animHoriz range }

      else self.postMessage { type: "refs", key, path: "" }

    else if key is "mouth"
      if $.root.catlike
        animHoriz =
          morph [
            $.emotions.catlike.jaw[frame + 1],
            $.emotions.catlike.jaw[frame]
          ]

      else animHoriz = morph [paths[frame + 1], paths[frame]]

      jaw  = $.root.jaw
      type = if $.root.catlike then "catlike" else "basic"

      animSad =
        morph [
          $.emotions.sad.jaw[type].closed[frame + 1],
          $.emotions.sad.jaw[type].closed[frame]
        ]

      animOpen =
        morph [
          $.emotions.open.jaw[type][frame + 1],
          $.emotions.open.jaw[type][frame]
        ]

      animOpenSad =
        morph [
          $.emotions.sad.jaw[type].open[frame + 1],
          $.emotions.sad.jaw[type].open[frame]
        ]

      animSumm     = morph [animHoriz(range), animSad range    ]
      animSummOpen = morph [animOpen(range),  animOpenSad range]
      animMouth    =
        morph [
          animSumm(jaw.sad / 100),
          animSummOpen jaw.sad / 100
        ]

      self.postMessage { type: "refs", key,               path: animMouth jaw.open / 100 }
      self.postMessage { type: "refs", key: "mouthOuter", path: animSumm jaw.sad  / 100 }

      self.postMessage { type: "clips", key: key + "Clip", path: animMouth jaw.open / 100 }

    else if key in lashes.left
      if fullRange >= 1.9 or $.male
        self.postMessage { type: "refs", key, path: "" }

        continue

      val    = $.root.eyes.eyelids.left.up
      closed = $.body.eye.left.lashes

      index = lashes.left.indexOf key
      parts = ["upper", "middle", "lower"]
      path  = closed[parts[index]].closed

      animHoriz = morph [paths[frame + 1], paths[frame]]

      animLashesDown = morph [path[frame + 1], path[frame]]
      animLashesSumm =
        morph [animHoriz(range), animLashesDown range]

      if $.degress >= 0 then val = $.root.eyes.eyelids.right.up

    else if key in lashes.right
      if $.male
        self.postMessage { type: "refs", key, path: "" }

        continue

      val    = $.root.eyes.eyelids.right.up
      closed = $.body.eye.right.lashes

      index = lashes.right.indexOf key
      parts = ["upper", "middle", "lower"]
      path  = closed[parts[index]].closed

      animHoriz = morph [paths[frame + 1], paths[frame]]

      animLashesDown = morph [path[frame + 1], path[frame]]
      animLashesSumm =
        morph [animHoriz(range), animLashesDown range]

      if $.degress >= 0 then val = $.root.eyes.eyelids.left.up

      self.postMessage { type: "refs", key, path: animLashesSumm val / 100 }


    else if key in ["eyeLeftBrow", "eyeRightBrow"]
      side    = if key  is "eyeLeftBrow" then "left" else "right"
      sideAlt = if side is "left"        then "right" else "left"

      brow = $.root.eyes.brows
      eye  = $.body.eye

      evil = eye[side].brow.evil
      wide = eye[side].brow.wide

      val =
        evil: if $.degress >= 0 then brow[sideAlt].evil else brow[side].evil
        wide: if $.degress >= 0 then brow[sideAlt].wide else brow[side].wide

      animHoriz = morph [paths[frame + 1], paths[frame]]

      animBrowEvil = morph [evil[frame + 1], evil[frame]]
      animBrowSumm =
        morph [animHoriz(range), animBrowEvil range]

      animBrowWide  = morph [wide[frame + 1], wide[frame]]
      animBrowSumm2 =
        morph [animBrowSumm(val.evil / 100), animBrowWide range]

      self.postMessage {
        type: "refs", key,
        path: if brow.show then animBrowSumm2 val.wide / 100 else ""
      }

    else if key is "horn"
      animHoriz =
        if $.root.horn.changeling
          paths = $.body.horn.changeling

          morph [paths[frame + 1], paths[frame]]

        else morph [paths[frame + 1], paths[frame]]

      self.postMessage { type: "refs", key, path: animHoriz range }

    else if key is "hornSecond"
      animHoriz = morph [paths[frame + 1], paths[frame]], { origin: { x: 0.75, y: 0.75 } }

      self.postMessage { type: "refs", key, path: animHoriz range }

    else
      self.postMessage { type: "refs", key, path: morph([paths[frame + 1], paths[frame]]) range }

, false