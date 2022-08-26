import { readFileSync } from 'fs';
import genDiff from './src/gen-diff.js';

function getFilesDiff(filePath1, filePath2, format = 'stylish') {
  if (format !== 'stylish') throw new Error('REMOVE ME');

  const data1 = readFileSync(filePath1, 'utf8');
  const data2 = readFileSync(filePath2, 'utf8');

  return genDiff(data1, data2);
}

export default getFilesDiff;
