import getFormatter from './src/formatters/index.js';
import { genDiff } from './src/gen-diff.js';
import parse from './src/parsers.js';

export default function getFilesDiff(filePath1, filePath2, formatName = 'stylish') {
  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);
  const formatter = getFormatter(formatName);
  const data = genDiff(obj1, obj2);
  // console.log(JSON.stringify(data, null, '  '));
  return formatter(data);
}
