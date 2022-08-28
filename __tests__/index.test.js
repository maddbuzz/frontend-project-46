/* eslint-disable no-undef */
// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import getFilesDiff from '../index.js';

const jsonFileName1 = 'file3.json';
const jsonFileName2 = 'file4.json';
const yamlFileName1 = 'file3.yaml';
const yamlFileName2 = 'file4.yaml';
const diffFileName = 'file4-file3.diff';
// const diffActualFileName = 'file4-file3.diff.actual';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const writeFile = (filename, data) => fs.writeFileSync(getFixturePath(filename), data, 'utf-8');

beforeAll(() => {
  const obj1 = JSON.parse(readFile(jsonFileName1));
  writeFile(yamlFileName1, yaml.dump(obj1));
  const obj2 = JSON.parse(readFile(jsonFileName2));
  writeFile(yamlFileName2, yaml.dump(obj2));
});

test('getFilesDiff JSONs testing', () => {
  const diffFile = readFile(diffFileName);
  const actual = getFilesDiff(getFixturePath(jsonFileName1), getFixturePath(jsonFileName2));
  // writeFile(diffActualFileName, actual);
  expect(actual)
    .toMatch(diffFile);
});

test('getFilesDiff YAMLs testing', () => {
  const diffFile = readFile(diffFileName);
  expect(getFilesDiff(getFixturePath(yamlFileName1), getFixturePath(yamlFileName2)))
    .toMatch(diffFile);
});
