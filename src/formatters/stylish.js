import isPlainObject from 'lodash/isPlainObject.js';
import sortBy from 'lodash/sortBy.js';
import { getState } from '../gen-diff.js';

const indent = '  ';

export default function formatStylish(diffData, depth = 0) {
  const indentsCount = 1 + depth * 2;
  const indents = indent.repeat(indentsCount);
  const bracketIndents = indent.repeat(indentsCount - 1);
  const makeLine = (state, key, val) => (
    `${indents}${state} ${key}: ${(isPlainObject(val) ? formatStylish(val, depth + 1) : val)}`
  );

  const entries = Object.entries(diffData);
  const lines = sortBy(entries)
    .map(([key, [state, val]]) => {
      switch (state) {
        case getState('added'):
          return makeLine('+', key, val);
        case getState('removed'):
          return makeLine('-', key, val);
        case getState('unchanged'):
          return makeLine(' ', key, val);
        case getState('changed'): {
          const [val1, val2] = val;
          const line1 = makeLine('-', key, val1);
          const line2 = makeLine('+', key, val2);
          return `${line1}\n${line2}`;
        }
        default:
          throw new Error(`Unexpected state ${state}`);
      }
    });
  return `{\n${lines.join('\n')}\n${bracketIndents}}`;
}
