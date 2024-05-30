import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/getdiff.js';

const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendif', () => {

})