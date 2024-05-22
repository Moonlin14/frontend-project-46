import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import parser from './parser.js'

const getFileContent = (path) => {
  const pathResolve = resolve(cwd(), path);
  const fileContent = readFileSync(pathResolve, 'utf8')
  const extencion = pathResolve.split('.')
  const result = parser(fileContent, extencion[1])
  return result;
}

export default (filepath1, filepath2) => {
  const data1 = Object.entries(getFileContent(filepath1));
  const data2 = Object.entries(getFileContent(filepath2));
  const intersection = _.intersectionWith(data1, data2, _.isEqual)
  const resultArr = [...intersection];

  for (const dataChar of data1) {
    if (!resultArr.includes(dataChar)) {
      const [key, value] = dataChar;
      resultArr.push([`- ${key}`, value])
    }
  }

  for (const dataChar of data2) {
    if (!resultArr.includes(dataChar)) {
      const [key, value] = dataChar;
      resultArr.push([ `+ ${key}`, value])
    }
  }

  const result = Object.fromEntries(resultArr);
  const sortedResult = _.sortBy(result)
 
  console.log(JSON.stringify(result, ' ', 2).replace(/"([^"]+)":/g, '$1:'))
}