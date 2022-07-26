/* eslint-disable space-before-function-paren */
import { PNG } from "pngjs/browser";

import { findIndexes } from "./find-data";
import elementNames from "./flatten-json";

import { TElements } from "~/types/graphics";
import { IObject } from "~/types/basic";

interface IElement {
  points: Float32Array[];
  ids: number[];
}

interface IObjectElement {
  points: number[][];
  ids: number[];
}

const VALUE_16_BIT = 65536;
const BYTE_SIZE = 8;
const BYTES_SIZES_COUNT = 1;

// Concatenates two bytes into 16 bits
function merge8to16bit(buffer: number[]) {
  const array = [];

  for (let i = 0; i < buffer.length; i += 2) {
    const value = (buffer[i + 1] << BYTE_SIZE) + buffer[i];

    array.push(
      buffer[i + 1] >>> (BYTE_SIZE - 1) ? VALUE_16_BIT - value : -value
    );
  }

  return array;
}

// Requesting a photo and reading as a sequence of bytes
export default function (elements: TElements, callback: () => void) {
  fetch('/data.png').then((res) => res.arrayBuffer()).then((data) => {
    // Translating image into object of elements
    new PNG({ bitDepth: 8 }).parse(data, (_: any, png: IObject<number[]>) => {
      const bit16Buffer = merge8to16bit(png.data);

      const [indexesSize] = bit16Buffer; // Getting the first two bytes
      const startIndexSize = BYTES_SIZES_COUNT;

      let startIndex = startIndexSize + indexesSize;

      const indexes = findIndexes(bit16Buffer, startIndexSize, startIndex);

      // Filling element array with polygon coordinates
      function fillPoints(element: IElement, count: number, size: number) {
        for (let j = 0; j < count; j++) {
          const pointsArr = [];

          for (let h = 0; h < size; h++) {
            pointsArr.push(bit16Buffer[startIndex + j * size + h]);
          }

          element.points.push(new Float32Array(pointsArr));
        }

        startIndex += count * size;
      }

      // Filling the element array with indexes
      function fillIndexes(element: IElement, size: number) {
        for (let j = 0; j < size; j++) {
          element.ids.push(bit16Buffer[startIndex + j]);
        }

        startIndex += size;
      }

      // Creating a list of elements for drawing
      for (let i = 0; i < elementNames.length; i++) {
        const name = elementNames[i];
        const [count, size, idsSize] = indexes[i];

        const element: IElement = { points: [], ids: [] };

        fillPoints(element, count, size);
        fillIndexes(element, idsSize);

        elements[name] = element as unknown as IObjectElement;
      }

      callback();
    });
  });
}
