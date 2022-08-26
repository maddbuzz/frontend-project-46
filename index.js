import { readFileSync } from 'fs';
import genDiff from './src/gen-diff.js';

function readData(filePath) {
  const data = readFileSync(filePath, 'utf8');
  return data;
}

function getFilesDiff(filePath1, filePath2, format = 'stylish') {
  if (format !== 'stylish') throw new Error('REMOVE ME');

  const data1 = readData(filePath1);
  const data2 = readData(filePath2);

  return genDiff(data1, data2);
}

export default getFilesDiff;
