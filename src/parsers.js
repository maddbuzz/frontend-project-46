import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function getParser(filePath) {
  const format = path.extname(filePath);
  switch (format) {
    case '.yml':
    case '.yaml':
      return yaml.load;
    case '.json':
      return JSON.parse;
    default:
      throw new Error(`Unsupported format <${format}> (from path <${filePath}>)`);
  }
}

export default function parse(filePath) {
  const parser = getParser(filePath);
  const strData = readFileSync(filePath, 'utf8');
  return parser(strData);
}
