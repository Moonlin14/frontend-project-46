import { readFileSync } from 'fs';
import { resolve } from 'path';
import _ from 'lodash';

const parse = (path) => {
  const pathResolve = resolve(path);
  const result = readFileSync(pathResolve, 'utf8')
  return JSON.parse(result);
}

export default (filepath1, filepath2) => {
  const data1 = Object.entries(parse(filepath1));
  const data2 = Object.entries(parse(filepath2));
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
  console.log(result)
}