import { useEffect } from "react";

import useEmotions from "@/helpers/emotions";
import useParameters from "@/helpers/parameters";
import { getSaveValueInner } from "@/libs/saves";

const EPSILON = 0.01;

function SLtoSV(s, l, v = s * Math.min(l, 1 - l) + l) {
  return [v ? 2 - (2 * l) / v : 0, v];
}

export function useShaderColorManager(
  colorTarget,
  model,
  colorName = undefined
) {
  useEffect(() => {
    if (!model.current) return;

    const { material } = model.current;

    function setColor(_h, _s, _l, _a) {
      material.uniforms[colorTarget].value.set(
        _h / 360,
        ...SLtoSV(_s, _l),
        _a || 1
      );
    }

    if (colorName) {
      const { h, s, l, a } = getSaveValueInner(
        useParameters.getState(),
        "colors",
        colorName
      );

      setColor(h + EPSILON, s + EPSILON, l + EPSILON, a || 1);

      useParameters.subscribe(
        ({ h, s, l, a }) =>
          setColor(h + EPSILON, s + EPSILON, l + EPSILON, a || 1),
        (state) => getSaveValueInner(state, "colors", colorName)
      );
    }
  }, [colorName, colorTarget, model]);
}

export function useShaderValueManager(
  valueName,
  model,
  valueIn = undefined,
  treshold = 1
) {
  useEffect(() => {
    if (valueIn) {
      const { material } = model.current;

      const { emotions } = useEmotions.getState();

      const boolean = getSaveValueInner(
        useParameters.getState(),
        "booleans",
        valueIn
      );

      material.uniforms[valueName].value =
        (+boolean || emotions[valueIn]) * treshold;

      useParameters.subscribe(
        (value) => (material.uniforms[valueName].value = +value * treshold),
        (state) => getSaveValueInner(state, "booleans", valueIn)
      );

      useEmotions.subscribe(
        (value) => (material.uniforms[valueName].value = +value * treshold),
        (state) => state.emotions[valueIn]
      );
    }
  }, [model, treshold, valueIn, valueName]);
}
