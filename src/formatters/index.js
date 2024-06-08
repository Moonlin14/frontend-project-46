import getStylishFormat from './stylish';
import getPlainFormat from './plain';

const getFormat = (tree, format) => {
  switch (format) {
    case 'stylish':
      return getStylishFormat(tree);
    case 'plain':
      return getPlainFormat(tree);
    case 'json':
      return JSON.stringify(tree, null, 2);
    default: throw new Error(`Unknown format: ${format}`);
  }
};
export default getFormat;
