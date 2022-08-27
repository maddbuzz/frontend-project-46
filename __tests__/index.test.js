/* eslint-disable no-undef */
// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import getFilesDiff from '../index.js';

const jsonFileName1 = 'file1.json';
const jsonFileName2 = 'file2.json';
const diffFileName = 'file2-file1.diff';
const yamlFileName1 = 'file1.yaml';
const yamlFileName2 = 'file2.yaml';
// const jsonFileName1 = 'file3.json';
// const jsonFileName2 = 'file4.json';
// const diffFileName = 'file4-file3.diff';
// const yamlFileName1 = 'file3.yaml';
// const yamlFileName2 = 'file4.yaml';

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
  expect(getFilesDiff(getFixturePath(jsonFileName1), getFixturePath(jsonFileName2)))
    .toMatch(diffFile);
});

test('getFilesDiff YAMLs testing', () => {
  const diffFile = readFile(diffFileName);
  expect(getFilesDiff(getFixturePath(yamlFileName1), getFixturePath(yamlFileName2)))
    .toMatch(diffFile);
});
