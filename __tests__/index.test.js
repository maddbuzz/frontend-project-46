import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getFilesDiff from '../index.js';

const jsonFilename1 = 'file1.json';
const jsonFilename2 = 'file2.json';
const yamlFilename1 = 'file1.yaml';
const yamlFilename2 = 'file2.yml';
const stylishDiffFilename = 'file2-file1.stylish';
const plainDiffFilename = 'file2-file1.plain';
const jsonDiffFilename = 'file2-file1.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  [jsonFilename1, yamlFilename2, 'stylish', stylishDiffFilename],
  [yamlFilename1, jsonFilename2, 'stylish', stylishDiffFilename],
  [jsonFilename1, yamlFilename2, 'plain', plainDiffFilename],
  [yamlFilename1, jsonFilename2, 'plain', plainDiffFilename],
])('getFilesDiff(%s, %s) "%s" testing', (filename1, filename2, formatName, diffFilename) => {
  const diffFile = readFile(diffFilename);
  expect(getFilesDiff(getFixturePath(filename1), getFixturePath(filename2), formatName))
    .toMatch(diffFile);
});

test.each([
  [jsonFilename1, yamlFilename2, 'json', jsonDiffFilename],
  [yamlFilename1, jsonFilename2, 'json', jsonDiffFilename],
])('getFilesDiff(%s, %s) "%s" testing', (filename1, filename2, formatName, diffFilename) => {
  const expectedObj = JSON.parse(readFile(diffFilename));
  const actualObj = JSON.parse(
    getFilesDiff(getFixturePath(filename1), getFixturePath(filename2), formatName),
  );
  expect(expectedObj).toEqual(actualObj);
});
