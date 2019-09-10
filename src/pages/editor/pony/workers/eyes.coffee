self.addEventListener "message", ($) ->
  $ = $.data
  self = this

  if $.left.x is 0 or $.left.x is 0
    return

  scale = $.eyes.iris.scale / 100
  posit = $.eyes.position

  shift =
    y: posit.verti - 50  # What?
    x: posit.horiz - 50

  derp = posit.derp

  if $.degress < 0 then shift.x = -shift.x; derp = -derp

  absolute = { x: 0, y: 0 }

  if $.eyes.position.mode is "absolute"
    absolute =
      x: -$.AbsoluteDegress / 1.5
      y: if $.horiz < 0 then $.horiz * 30 * 2 else $.horiz * 30

  middle =
    left:
      x: $.left.x + $.left.width  / 2 - 10 + shift.x - (25 - posit.focus / 4)
      y: $.left.y + $.left.height / 2 + 16 - shift.y + (derp / 1.5)

    right:
      x: $.right.x + $.right.width  / 2 + 10 + shift.x + (25 - posit.focus / 4)
      y: $.right.y + $.right.height / 2 + 16 - shift.y - (derp / 1.5)


  # Iris

  self.postMessage
    type: "refs"
    key: "eyeIrisLeft"

    cx: middle.left.x + absolute.x
    cy: middle.left.y + absolute.y

    rx: 7.5  * scale + "%"
    ry: 13.5 * scale + "%"

  self.postMessage
    type: "refs"
    key: "eyeIrisRight"

    cx: middle.right.x + ($.AbsoluteDegress / 3) + absolute.x
    cy: middle.right.y + absolute.y

    rx: 7.5  * scale + "%"
    ry: 13.5 * scale + "%"

  if not $.eyes.changeling

    # Pupils

    self.postMessage
      type: "refs"
      key: "eyePupilLeft"

      cx: middle.left.x - 10 + absolute.x
      cy: middle.left.y + absolute.y

      rx: 6  * $.eyes.pupils.width  * scale / 100 + "%"
      ry: 10 * $.eyes.pupils.height * scale / 100 + "%"

    self.postMessage
      type: "refs"
      key: "eyePupilRight"

      cx: middle.right.x + 10 + ($.AbsoluteDegress / 3) + absolute.x
      cy: middle.right.y + absolute.y

      rx: 6  * $.eyes.pupils.width  * scale / 100 + "%"
      ry: 10 * $.eyes.pupils.height * scale / 100 + "%"


    # Glares

    ang = if $.degress < 0 then 45 else -45
    pos = if $.degress < 0 then 15 else -15

    self.postMessage
      type: "refs"
      key: "eyeGlareLeft"

      cx: middle.left.x - (pos - ($.AbsoluteDegress / 3) * scale) + absolute.x
      cy: middle.left.y - (85 * scale) + absolute.y

      rx: 3   * scale + "%"
      ry: 5.5 * scale + "%"

    self.postMessage
      type: "style"
      key: "eyeGlareLeft"
      style: "transform: rotate(#{ ang }deg); transform-origin: " +
        "#{ middle.left.x - (pos - ($.AbsoluteDegress / 3) * scale) + absolute.x }px " +
        "#{ middle.left.y - (85 * scale) + absolute.y }px"


    self.postMessage
      type: "refs"
      key: "eyeGlare2Left"

      cx: middle.left.x + (pos * 2) + ($.AbsoluteDegress / 3) + absolute.x
      cy: middle.left.y - (60 * scale) + absolute.y

      rx: 1.25 * scale + "%"
      ry: 2    * scale + "%"

    self.postMessage
      type: "style"
      key: "eyeGlare2Left"
      style: "transform: rotate(#{ ang }deg); transform-origin: " +
        "#{ middle.left.x + (pos * 2) + ($.AbsoluteDegress / 3) + absolute.x }px " +
        "#{ middle.left.y - (60 * scale) + absolute.y }px"


    self.postMessage
      type: "refs"
      key: "eyeGlareRight"

      cx: middle.right.x - (pos - ($.AbsoluteDegress / 3) * scale) + absolute.x
      cy: middle.right.y - (85 * scale) + absolute.y

      rx: 3   * scale + "%"
      ry: 5.5 * scale + "%"

    self.postMessage
      type: "style"
      key: "eyeGlareRight"
      style: "transform: rotate(#{ ang }deg); transform-origin: " +
        "#{ middle.right.x - (pos - ($.AbsoluteDegress / 3) * scale) + absolute.x }px " +
        "#{ middle.right.y - (85 * scale) + absolute.y }px"


    self.postMessage
      type: "refs"
      key: "eyeGlare2Right"

      cx: middle.right.x + (pos * 2) + ($.AbsoluteDegress / 3) + absolute.x
      cy: middle.right.y - (60 * scale) + absolute.y

      rx: 1.25 * scale + "%"
      ry: 2    * scale + "%"

    self.postMessage
      type: "style"
      key: "eyeGlare2Right"
      style: "transform: rotate(#{ ang }deg); transform-origin: " +
        "#{ middle.right.x + (pos * 2) + ($.AbsoluteDegress / 3) + absolute.x }px " +
        "#{ middle.right.y - (60 * scale) + absolute.y }px"

  else
    elems =
      [ "eyePupilLeft",   "eyeGlareLeft",  "eyeGlare2Left",
        "eyePupilRight", "eyeGlareRight", "eyeGlare2Right" ]

    for elem in elems
      self.postMessage
        type: "refs"
        key: elem

        cx: 0, cy: 0
        rx: 0, ry: 0

, false