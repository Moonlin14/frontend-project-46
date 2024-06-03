import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import treeBuilder from './treeBuilder.js';
import parser from './parser.js';
import stylish from './formatters/stylish.js'

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
  
return stylish(tree)

  // const cb = (acc, obj) => {

  //   if (obj.type === 'nested') {
  //     acc[`  ${obj.key}`] = [...obj.children].reduce(cb, {})
  //   }
  //   if (obj.type === 'deleted') {
  //     acc[`- ${obj.key}`] = obj.value;
  //   }
  //   if (obj.type === 'added') {
  //    acc[`+ ${obj.key}`] = obj.value;
  //   }  
  //   if (obj.type === 'changed') {
  //   acc[`- ${obj.key}`] = obj.value1, acc[`+ ${obj.key}`] = obj.value2;
  //   }
  //   if (obj.type === 'unchanged') {
  //   acc[`  ${obj.key}`] =  obj.value;
  //   }
  
  //   return acc;
  // }
  
  // const result = tree.reduce(cb, {})

  // return JSON.stringify(result, ' ', 2)
  // .replace(/"([^"]+)":/g, '$1:')
  // .replaceAll(',', '')
}