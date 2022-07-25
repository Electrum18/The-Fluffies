import { useControls } from "leva";
import { useEffect, useState } from "react";

import useEmotions from "@/helpers/emotions";
import useParameters from "@/helpers/parameters";
import { getSave } from "@/libs/saves";
import { levaList } from "@/libs/ui/leva-list";

function formatColor(color) {
  const pastColor = { ...color };

  pastColor.s *= 100;
  pastColor.l *= 100;

  return pastColor;
}

function bindData(data) {
  const values = {};

  const state = useParameters.getState();
  const { emotions, setEmotion } = useEmotions.getState();

  const { setColor, setName, setBoolean } = state;
  const { colors, booleans, names } = getSave(state);

  for (const valueName in data) {
    const valueContent = data[valueName];

    const { list, color, boolean, value, imgSrc } = valueContent;

    switch (true) {
      case !!list:
        values[valueName] = levaList({
          _value: names[value],
          list,
          src: imgSrc,
          change: (valueIn) => setName(value, valueIn),
        });
        break;

      case !!boolean:
        values[valueName] = {
          value: booleans[boolean],
          onChange: (valueIn) => setBoolean(boolean, valueIn),
        };
        break;

      case !!color:
        values[valueName] = {
          value: colors[color],
          onChange: (valueIn) => setColor(color, valueIn),
        };
        break;

      case !!value:
        values[valueName] = {
          value: emotions[value],
          onChange: (valueIn) => setEmotion(value, valueIn),
        };
        break;

      default:
        break;
    }

    if (valueContent.min) values[valueName].min = valueContent.min;
    if (valueContent.max) values[valueName].max = valueContent.max;
    if (valueContent.step) values[valueName].step = valueContent.step;
  }

  return values;
}

function dataValues(data) {
  const values = {};

  const { emotions } = useEmotions.getState();

  const { colors, booleans, names } = getSave(useParameters.getState());

  for (const valueName in data) {
    const valueContent = data[valueName];
    const { color, boolean, value, list } = valueContent;

    switch (true) {
      case !!list:
        values[valueName] = names[value];
        break;

      case !!boolean:
        values[valueName] = booleans[boolean];
        break;

      case !!color:
        values[valueName] = formatColor(colors[color]);
        break;

      case !!value:
        values[valueName] = emotions[value];
        break;

      default:
        break;
    }
  }

  return values;
}

export default function Controls({ title, data }) {
  const [validValues, setValidValues] = useState({});

  const schema = () => {
    setValidValues(dataValues(data));

    return bindData(data);
  };

  const folderSettings = { collapsed: true };
  const [, set] = useControls(title || "", schema, folderSettings, [data]);

  useEffect(() => {
    set(validValues);
  }, [validValues, set]);

  return;
}
