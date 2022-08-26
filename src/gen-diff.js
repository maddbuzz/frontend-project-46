// @ts-nocheck
import sortBy from 'lodash/sortBy.js';

export default function genDiff(dataStr1, dataStr2) {
  const data1 = JSON.parse(dataStr1);
  const data2 = JSON.parse(dataStr2);

  const mergedData = { ...data1, ...data2 };
  const mergedKeys = Object.keys(mergedData);

  const lines = sortBy(mergedKeys)
    .reduce((acc, key) => {
      if (!Object.hasOwn(data1, key)) {
        acc.push(['+', key, data2[key]]);
      } else if (!Object.hasOwn(data2, key)) {
        acc.push(['-', key, data1[key]]);
      } else if (data1[key] !== data2[key]) {
        acc.push(['-', key, data1[key]], ['+', key, data2[key]]);
      } else {
        acc.push([' ', key, data2[key]]);
      }
      return acc;
    }, [])
    .map(([status, key, value]) => `  ${status} ${key}: ${value}`);

  return `{\n${lines.join('\n')}\n}`;
}
