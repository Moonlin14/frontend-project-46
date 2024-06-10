import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import treeBuilder from './treeBuilder.js';
import parser from './parser.js';
import getFormat from './formatters/index.js';

const getFileContent = (path) => {
  const pathResolve = resolve(cwd(), path);
  const fileContent = readFileSync(pathResolve, 'utf8');
  const extencion = extname(pathResolve);
  return parser(fileContent, extencion);
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getFileContent(filepath1);
  const data2 = getFileContent(filepath2);

  const tree = treeBuilder(data1, data2);

  return getFormat(tree, formatName);
};
