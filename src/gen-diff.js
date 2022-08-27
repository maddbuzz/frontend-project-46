// @ts-nocheck
import sortBy from 'lodash/sortBy.js';

function getDiffData(obj1, obj2) {
  const mergedKeys = Object.keys({ ...obj1, ...obj2 });
  return mergedKeys
    .reduce((acc, key) => {
      if (!Object.hasOwn(obj1, key)) {
        acc[key] = ['+', obj2[key]];
      } else if (!Object.hasOwn(obj2, key)) {
        acc[key] = ['-', obj1[key]];
      } else if (obj1[key] !== obj2[key]) {
        acc[key] = ['!', [obj1[key], obj2[key]]];
      } else {
        acc[key] = [' ', obj2[key]];
      }
      return acc;
    }, {});
}

function formatStylish(diffData) {
  const indent = '  ';
  const makeLine = (status, key, val) => `${indent}${status} ${key}: ${val}`;
  const lines = sortBy(Object.entries(diffData))
    .map(([key, [status, val]]) => {
      switch (status) {
        case '+':
        case '-':
        case ' ':
          return makeLine(status, key, val);
        case '!':
          return `${makeLine('-', key, val[0])}\n${makeLine('+', key, val[1])}`;
        default:
          throw new Error(`Unexpected status ${status}`);
      }
    });
  return `{\n${lines.join('\n')}\n}`;
}

function getFormatter(format) {
  switch (format) {
    case 'stylish':
      return formatStylish;
    default:
      throw new Error(`Unsupported format <${format}>`);
  }
}

export default function genDiff(obj1, obj2, format) {
  const formatter = getFormatter(format);
  const data = getDiffData(obj1, obj2);
  return formatter(data);
}
