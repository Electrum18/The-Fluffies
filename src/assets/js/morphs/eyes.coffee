export default (self, left, right, refs) ->
  $ = self

  eyes = $.$root.eyes

  scale = eyes.iris.scale / 100
  posit = eyes.position

  shift =
    y: posit.verti - 50  # What?
    x: posit.horiz - 50

  derp = posit.derp

  if $.degress < 0 then shift.x = -shift.x; derp = -derp

  absolute = { x: 0, y: 0 }

  if eyes.position.mode is "absolute"
    absolute =
      x: -$.AbsoluteDegress / 1.5
      y: if $.horiz < 0 then $.horiz * 30 * 2 else $.horiz * 30

  middle =
    left:
      x: left.x + left.width  / 2 - 10 + shift.x - (25 - posit.focus / 4)
      y: left.y + left.height / 2 + 16 - shift.y + (derp / 1.5)

    right:
      x: right.x + right.width  / 2 + 10 + shift.x + (25 - posit.focus / 4)
      y: right.y + right.height / 2 + 16 - shift.y - (derp / 1.5)


  set = (elem, obj) ->
    refs[elem].setAttribute "cx", obj.cx
    refs[elem].setAttribute "cy", obj.cy
    refs[elem].setAttribute "rx", obj.rx
    refs[elem].setAttribute "ry", obj.ry


  # Iris

  set "eyeIrisLeft",
    cx: middle.left.x + absolute.x
    cy: middle.left.y + absolute.y

    rx: 7.5  * scale + "%"
    ry: 13.5 * scale + "%"

  set "eyeIrisRight",
    cx: middle.right.x + ($.AbsoluteDegress / 3) + absolute.x
    cy: middle.right.y + absolute.y

    rx: 7.5  * scale + "%"
    ry: 13.5 * scale + "%"

  if not eyes.changeling

    # Pupils

    set "eyePupilLeft",
      cx: middle.left.x - 10 + absolute.x
      cy: middle.left.y + absolute.y

      rx: 6  * eyes.pupils.width  * scale / 100 + "%"
      ry: 10 * eyes.pupils.height * scale / 100 + "%"

    set "eyePupilRight",
      cx: middle.right.x + 10 + ($.AbsoluteDegress / 3) + absolute.x
      cy: middle.right.y + absolute.y

      rx: 6  * eyes.pupils.width  * scale / 100 + "%"
      ry: 10 * eyes.pupils.height * scale / 100 + "%"


    # Glares

    ang = if $.degress < 0 then 45 else -45
    pos = if $.degress < 0 then 15 else -15

    set "eyeGlareLeft",
      cx: middle.left.x - (pos - ($.AbsoluteDegress / 3) * scale) + absolute.x
      cy: middle.left.y - (85 * scale) + absolute.y

      rx: 3   * scale + "%"
      ry: 5.5 * scale + "%"

    refs["eyeGlareLeft"].setAttribute "style",
      "transform: rotate(#{ ang }deg); transform-origin: " +
        "#{ middle.left.x - (pos - ($.AbsoluteDegress / 3) * scale) + absolute.x }px " +
        "#{ middle.left.y - (85 * scale) + absolute.y }px"


    set "eyeGlare2Left",
      cx: middle.left.x + (pos * 2) + ($.AbsoluteDegress / 3) + absolute.x
      cy: middle.left.y - (60 * scale) + absolute.y

      rx: 1.25 * scale + "%"
      ry: 2    * scale + "%"

    refs["eyeGlare2Left"].setAttribute "style",
      "transform: rotate(#{ ang }deg); transform-origin: " +
        "#{ middle.left.x + (pos * 2) + ($.AbsoluteDegress / 3) + absolute.x }px " +
        "#{ middle.left.y - (60 * scale) + absolute.y }px"


    set "eyeGlareRight",
      cx: middle.right.x - (pos - ($.AbsoluteDegress / 3) * scale) + absolute.x
      cy: middle.right.y - (85 * scale) + absolute.y

      rx: 3   * scale + "%"
      ry: 5.5 * scale + "%"

    refs["eyeGlareRight"].setAttribute "style",
      "transform: rotate(#{ ang }deg); transform-origin: " +
        "#{ middle.right.x - (pos - ($.AbsoluteDegress / 3) * scale) + absolute.x }px " +
        "#{ middle.right.y - (85 * scale) + absolute.y }px"


    set "eyeGlare2Right",
      cx: middle.right.x + (pos * 2) + ($.AbsoluteDegress / 3) + absolute.x
      cy: middle.right.y - (60 * scale) + absolute.y

      rx: 1.25 * scale + "%"
      ry: 2    * scale + "%"

    refs["eyeGlare2Right"].setAttribute "style",
      "transform: rotate(#{ ang }deg); transform-origin: " +
        "#{ middle.right.x + (pos * 2) + ($.AbsoluteDegress / 3) + absolute.x }px " +
        "#{ middle.right.y - (60 * scale) + absolute.y }px"

  else
    elems =
      [ "eyePupilLeft",   "eyeGlareLeft",  "eyeGlare2Left",
        "eyePupilRight", "eyeGlareRight", "eyeGlare2Right" ]

    for elem in elems
      set elem,
        cx: 0, cy: 0
        rx: 0, ry: 0

