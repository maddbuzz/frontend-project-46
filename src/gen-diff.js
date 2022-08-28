// @ts-nocheck
import isEqual from 'lodash/isEqual.js';
import cloneDeep from 'lodash/cloneDeep.js';
import isPlainObject from 'lodash/isPlainObject.js';
import _set from 'lodash/set.js';

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
      const updateAcc = (state, value) => { _set(acc, [key], [state, value]); };
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (val1 === undefined) updateAcc(getState('added'), makeValue(val2));
      else if (val2 === undefined) updateAcc(getState('removed'), makeValue(val1));
      else if (isPlainObject(val1) && isPlainObject(val2)) {
        updateAcc(getState('unchanged'), genDiff(val1, val2));
      } else if (isEqual(val1, val2)) updateAcc(getState('unchanged'), makeValue(val2));
      else updateAcc(getState('changed'), [makeValue(val1), makeValue(val2)]);

      return acc;
    }, {});
}
