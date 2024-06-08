import _ from 'lodash';

const spaceCount = 4;
const offsetLeft = 2;

const indent = (depth) => ' '.repeat((depth * spaceCount) - offsetLeft);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const output = keys.map((key) => `${indent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${output.join('\n')}\n  ${indent(depth)}}`;
};

const iter = (tree, depth) => tree.map((node) => {
  const createString = (value, symbol) => `${indent(depth)}${symbol} ${node.key}: ${stringify(value, depth)}\n`;
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
      return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
    default:
      throw new Error(`This type does not exist: ${node.type}`);
  }
});

export default (tree) => `{\n${iter(tree, 1).join('')}}`;
