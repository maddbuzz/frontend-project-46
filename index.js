import path from 'path';
import { readFileSync } from 'fs';
import { genDiff } from './src/gen-diff.js';
import getFormatter from './src/formatters/index.js';
import getParser from './src/parsers.js';

const parse = (filePath) => {
  const fileExtension = path.extname(filePath);
  const parser = getParser(fileExtension);
  const string = readFileSync(filePath, 'utf8');
  return parser(string);
};

export default function getFilesDiff(filePath1, filePath2, formatName = 'stylish') {
  const formatter = getFormatter(formatName);
  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);
  const data = genDiff(obj1, obj2);
  return formatter(data);
}
