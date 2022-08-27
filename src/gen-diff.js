// @ts-nocheck
import sortBy from 'lodash/sortBy.js';

export default function genDiff(obj1, obj2) {
  const mergedKeys = Object.keys({ ...obj1, ...obj2 });

  const lines = sortBy(mergedKeys)
    .reduce((acc, key) => {
      if (!Object.hasOwn(obj1, key)) {
        acc.push(['+', key, obj2[key]]);
      } else if (!Object.hasOwn(obj2, key)) {
        acc.push(['-', key, obj1[key]]);
      } else if (obj1[key] !== obj2[key]) {
        acc.push(['-', key, obj1[key]], ['+', key, obj2[key]]);
      } else {
        acc.push([' ', key, obj2[key]]);
      }
      return acc;
    }, [])
    .map(([status, key, value]) => `  ${status} ${key}: ${value}`);

  return `{\n${lines.join('\n')}\n}`;
}
