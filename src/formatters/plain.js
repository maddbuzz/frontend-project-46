import _isPlainObject from 'lodash/isPlainObject.js';
import _isObjectLike from 'lodash/isObjectLike.js';
import _sortBy from 'lodash/sortBy.js';
import getState from '../helpers.js';

const stringify = (val) => {
  if (_isObjectLike(val)) return '[complex value]';
  if (typeof val === 'string') return `'${val}'`;
  return `${val}`;
};

const getPathStr = (path) => path.join('.');

export default function formatPlain(diffData, path = []) {
  const entries = Object.entries(diffData);
  const lines = _sortBy(entries)
    .flatMap(([key, [state, val]]) => {
      const currentPath = path.concat(key);
      switch (state) {
        case getState('unchanged'): return (() => (_isPlainObject(val) ? formatPlain(val, currentPath) : []))();
        case getState('added'): return `Property '${getPathStr(currentPath)}' was added with value: ${stringify(val)}`;
        case getState('removed'): return `Property '${getPathStr(currentPath)}' was removed`;
        case getState('changed'): {
          const [val1, val2] = val;
          return `Property '${getPathStr(currentPath)}' was updated. From ${stringify(val1)} to ${stringify(val2)}`;
        }
        default: throw new Error(`Unexpected state ${state}`);
      }
    });
  return `${lines.join('\n')}`;
}
