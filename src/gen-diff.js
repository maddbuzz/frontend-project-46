// @ts-nocheck
import sortBy from 'lodash/sortBy.js';
import isEqual from 'lodash/isEqual.js';
import cloneDeep from 'lodash/cloneDeep.js';
import isPlainObject from 'lodash/isPlainObject.js';

const added = '+';
const removed = '-';
const unchanged = ' ';
const changed = '!';

function getDiffData(obj1, obj2) {
  const mergedKeys = Object.keys({ ...obj1, ...obj2 });
  return mergedKeys
    .reduce((acc, key) => {
      const makeValue = (val) => (isPlainObject(val) ? getDiffData(val, val) : cloneDeep(val));
      const getUpdatedAcc = (status, value) => {
        acc[key] = [status, value];
        return acc;
      };

      const val1 = obj1[key];
      const val2 = obj2[key];

      if (val1 === undefined) return getUpdatedAcc(added, makeValue(val2));
      if (val2 === undefined) return getUpdatedAcc(removed, makeValue(val1));
      if (isPlainObject(val1) && isPlainObject(val2)) {
        return getUpdatedAcc(unchanged, getDiffData(val1, val2));
      }
      if (isEqual(val1, val2)) return getUpdatedAcc(unchanged, makeValue(val2));
      return getUpdatedAcc(changed, [makeValue(val1), makeValue(val2)]);
    }, {});
}

function formatStylish(diffData, depth = 0) {
  const indent = '  ';
  const indentsCount = 1 + depth * 2;
  const indents = indent.repeat(indentsCount);
  const bracketIndents = indent.repeat(indentsCount - 1);
  const makeLine = (status, key, val) => (
    `${indents}${status} ${key}: ${(isPlainObject(val) ? formatStylish(val, depth + 1) : val)}`
  );

  const entries = Object.entries(diffData);
  const lines = sortBy(entries)
    .map(([key, [status, val]]) => {
      switch (status) {
        case added:
        case removed:
        case unchanged:
          return makeLine(status, key, val);
        case changed: {
          const [val1, val2] = val;
          const line1 = makeLine(removed, key, val1);
          const line2 = makeLine(added, key, val2);
          return `${line1}\n${line2}`;
        }
        default:
          throw new Error(`Unexpected status ${status}`);
      }
    });
  return `{\n${lines.join('\n')}\n${bracketIndents}}`;
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
  // console.log(JSON.stringify(data, null, '  '));
  return formatter(data);
}
