// @ts-nocheck
import _isEqual from 'lodash/isEqual.js';
import _cloneDeep from 'lodash/cloneDeep.js';
import _isPlainObject from 'lodash/isPlainObject.js';
import _set from 'lodash/set.js';
import getState from './helpers.js';

export default function genDiff(obj1, obj2) {
  const makeValue = (val) => (_isPlainObject(val) ? genDiff(val, val) : _cloneDeep(val));
  const mergedKeys = Object.keys({ ...obj1, ...obj2 });
  return mergedKeys
    .reduce((acc, key) => {
      const updateAcc = (state, value) => { _set(acc, [key], [state, value]); };
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (val1 === undefined) updateAcc(getState('added'), makeValue(val2));
      else if (val2 === undefined) updateAcc(getState('removed'), makeValue(val1));
      else if (_isPlainObject(val1) && _isPlainObject(val2)) {
        updateAcc(getState('unchanged'), genDiff(val1, val2));
      } else if (_isEqual(val1, val2)) updateAcc(getState('unchanged'), makeValue(val2));
      else updateAcc(getState('changed'), [makeValue(val1), makeValue(val2)]);

      return acc;
    }, {});
}
