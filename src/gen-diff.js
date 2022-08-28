// @ts-nocheck
import isEqual from 'lodash/isEqual.js';
import cloneDeep from 'lodash/cloneDeep.js';
import isPlainObject from 'lodash/isPlainObject.js';

export function getState(state) {
  switch (state) {
    case 'added': return '+';
    case 'removed': return '-';
    case 'unchanged': return ' ';
    case 'changed': return '!';
    default: throw new Error(`Unexpected state ${state}`);
  }
}

export function genDiff(obj1, obj2) {
  const mergedKeys = Object.keys({ ...obj1, ...obj2 });
  return mergedKeys
    .reduce((acc, key) => {
      const makeValue = (val) => (isPlainObject(val) ? genDiff(val, val) : cloneDeep(val));
      const getUpdatedAcc = (state, value) => {
        acc[key] = [state, value];
        return acc;
      };

      const val1 = obj1[key];
      const val2 = obj2[key];

      if (val1 === undefined) return getUpdatedAcc(getState('added'), makeValue(val2));
      if (val2 === undefined) return getUpdatedAcc(getState('removed'), makeValue(val1));
      if (isPlainObject(val1) && isPlainObject(val2)) {
        return getUpdatedAcc(getState('unchanged'), genDiff(val1, val2));
      }
      if (isEqual(val1, val2)) return getUpdatedAcc(getState('unchanged'), makeValue(val2));
      return getUpdatedAcc(getState('changed'), [makeValue(val1), makeValue(val2)]);
    }, {});
}
