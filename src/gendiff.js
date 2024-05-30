import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import treeBuilder from './treeBuilder.js';
import parser from './parser.js';

const getFileContent = (path) => {
  const pathResolve = resolve(cwd(), path);
  const fileContent = readFileSync(pathResolve, 'utf8')
  const extencion = extname(pathResolve)
  return parser(fileContent, extencion)
}

export default (filepath1, filepath2) => {
  const data1 = getFileContent(filepath1);
  const data2 = getFileContent(filepath2);

  const tree = treeBuilder(data1, data2)

  const result = (tree) => {
    const res = []
    
    for (const obj of tree) {
      const { key, value, type } = obj;
      if (obj[type] === 'unchanged') {
        res.push([obj[key], obj[value]])
      } else if (obj[type] === 'deleted') {
        res.push([`- ${obj[key]}`, obj[value]]);
      } else if (obj[type] === 'added') {
        res.push([`+ ${obj[key]}`, obj[value]])
      }
    }
    return res;
  }

  const hi = result(tree);
  console.log(hi);
  
  const res = Object.fromEntries(result(tree));

  return JSON.stringify(res, ' ', 2)
  .replace(/"([^"]+)":/g, '$1:')
  .replaceAll(',', '')
}