import isPlainObject from 'lodash/isPlainObject.js';
import sortBy from 'lodash/sortBy.js';
import { getState } from '../gen-diff.js';

const stringify = (val) => {
  if (isPlainObject(val)) return '[complex value]';
  if (typeof val === 'string') return `'${val}'`;
  return `${val}`;
};

export default function formatPlain(diffData, path = []) {
  const entries = Object.entries(diffData);
  const lines = sortBy(entries)
    .flatMap(([key, [state, val]]) => {
      const currentPath = [...path];
      currentPath.push(key);
      const getPathStr = () => currentPath.join('.');
      switch (state) {
        case getState('unchanged'):
          return isPlainObject(val) ? formatPlain(val, currentPath) : [];
        case getState('added'):
          return `Property '${getPathStr()}' was added with value: ${stringify(val)}`;
        case getState('removed'):
          return `Property '${getPathStr()}' was removed`;
        case getState('changed'): {
          const [val1, val2] = val;
          return `Property '${getPathStr()}' was updated. From ${stringify(val1)} to ${stringify(val2)}`;
        }
        default:
          throw new Error(`Unexpected state ${state}`);
      }
    });
  return `${lines.join('\n')}`;
}
