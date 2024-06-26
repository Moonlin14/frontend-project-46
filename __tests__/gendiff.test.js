import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJSON = readFile('expectedJSON.txt');

const testFormats = ['json', 'yml'];
describe('gendiff', () => {
  test.each(testFormats)('%s', (format) => {
    const filepath1 = getFixturePath(`filepath1.${format}`);
    const filepath2 = getFixturePath(`filepath2.${format}`);
    expect(gendiff(filepath1, filepath2)).toEqual(expectedStylish);
    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(expectedJSON);
  });
});
