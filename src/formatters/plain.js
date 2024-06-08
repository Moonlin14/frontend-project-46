import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const iter = (tree, key = []) => {
  const result = tree.map((node) => {
    const keys = [...key, `${node.key}`];
    const currentPath = keys.join('.');
    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'nested':
        return iter(node.children, [currentPath]);
      default:
        throw new Error(`This type does not exist: ${node.type}`);
    }
  });
  return result.filter(Boolean).join('\n');
};

export default (tree) => iter(tree, []);
