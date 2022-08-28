import formatPlain from './plain.js';
import formatStylish from './stylish.js';

export default function getFormatter(formatName) {
  switch (formatName) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;
    default:
      throw new Error(`Unsupported format <${formatName}>`);
  }
}
