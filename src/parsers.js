import yaml from 'js-yaml';

export default function getParser(fileExtension) {
  switch (fileExtension) {
    case '.yml':
    case '.yaml':
      return yaml.load;
    case '.json':
      return JSON.parse;
    default:
      throw new Error(`Unsupported file extension <${fileExtension}>`);
  }
}
