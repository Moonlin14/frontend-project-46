import _ from 'lodash';

const spaceCount = 4;
const offsetLeft = 2;

const indent = (depth) => ' '.repeat((depth * spaceCount) - offsetLeft);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const output = keys.map((key) => `${indent(depth + 1)} ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${output.join('\n')}\n ${indent(depth)}}`;
} 

const iter = (tree, depth) => tree.map((node) => {
  const createString = (value, sim) => `${indent(depth)}${sim} ${node.key}: ${stringify(value, depth)}\n`;
  switch (node.type) {
    case 'added':
      return createString(node.value, '+');
    case 'deleted':
      return createString(node.value, '-');
    case 'unchanged':
      return createString(node.value, ' ');
    case 'changed':
      return `${createString(node.value1, '-')}${createString(node.value2, '+')}`;
    case 'nested':
      return `${indent(depth)} ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)} }\n`;
    default:
     throw new Error(`This type does not exist: ${node.type}`);
  }
});

export default (tree) => `{\n${iter(tree, 1).join('')}}`






















































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

// const stylish = (tree) => {
//   const result = tree.reduce(cb, {})

//   return JSON.stringify(result, ' ', 2)
//   .replace(/"([^"]+)":/g, '$1:')
//   .replaceAll(',', '')
// }

// export default stylish;