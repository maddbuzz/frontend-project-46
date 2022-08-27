import genDiff from './src/gen-diff.js';
import parse from './src/parsers.js';

export default function getFilesDiff(filePath1, filePath2, format = 'stylish') {
  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);
  return genDiff(obj1, obj2, format);
}
