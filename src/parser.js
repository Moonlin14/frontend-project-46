import * as yaml from 'js-yaml';

export default (fileContent, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yaml':
      return yaml.load(fileContent);
    case '.yml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Format ${format} - is incorrect`);
  };
};