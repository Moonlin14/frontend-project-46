const cb = (acc, obj) => {

  if (obj.type === 'nested') {
    acc[`  ${obj.key}`] = [...obj.children].reduce(cb, {})
  }
  if (obj.type === 'deleted') {
    acc[`- ${obj.key}`] = obj.value;
  }
  if (obj.type === 'added') {
   acc[`+ ${obj.key}`] = obj.value;
  }  
  if (obj.type === 'changed') {
  acc[`- ${obj.key}`] = obj.value1, acc[`+ ${obj.key}`] = obj.value2;
  }
  if (obj.type === 'unchanged') {
  acc[`  ${obj.key}`] =  obj.value;
  }

  return acc;
}

const stylish = (tree) => {
  const result = tree.reduce(cb, {})

  return JSON.stringify(result, ' ', 2)
  .replace(/"([^"]+)":/g, '$1:')
  .replaceAll(',', '')
}

export default stylish;