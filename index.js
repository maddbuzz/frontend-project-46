import genDiff from './src/gen-diff.js';
import parse from './src/parsers.js';

function getFilesDiff(filePath1, filePath2, format = 'stylish') {
  if (format !== 'stylish') throw new Error('REMOVE ME');

  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);

  return genDiff(obj1, obj2);
}

export default getFilesDiff;
