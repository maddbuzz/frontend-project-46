import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getFilesDiff from '../index.js';

const jsonFilename1 = 'file3.json';
const jsonFilename2 = 'file4.json';
const yamlFilename1 = 'file3.yaml';
const yamlFilename2 = 'file4.yaml';
const stylishDiffFilename = 'file4-file3.stylish';
const plainDiffFilename = 'file4-file3.plain';
const jsonDiffFilename = 'file4-file3.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('getFilesDiff "stylish" testing', () => {
  const formatName = 'stylish';
  const diffFile = readFile(stylishDiffFilename);
  expect(getFilesDiff(getFixturePath(jsonFilename1), getFixturePath(yamlFilename2)))
    .toMatch(diffFile);
  expect(getFilesDiff(getFixturePath(yamlFilename1), getFixturePath(jsonFilename2), formatName))
    .toMatch(diffFile);
});

test('getFilesDiff "plain" testing', () => {
  const formatName = 'plain';
  const diffFile = readFile(plainDiffFilename);
  expect(getFilesDiff(getFixturePath(jsonFilename1), getFixturePath(yamlFilename2), formatName))
    .toMatch(diffFile);
  expect(getFilesDiff(getFixturePath(yamlFilename1), getFixturePath(jsonFilename2), formatName))
    .toMatch(diffFile);
});

test('getFilesDiff "json" testing', () => {
  const formatName = 'json';
  const expectedObj = JSON.parse(readFile(jsonDiffFilename));
  const actualObj1 = JSON.parse(
    getFilesDiff(getFixturePath(jsonFilename1), getFixturePath(yamlFilename2), formatName),
  );
  const actualObj2 = JSON.parse(
    getFilesDiff(getFixturePath(yamlFilename1), getFixturePath(jsonFilename2), formatName),
  );
  expect(expectedObj).toEqual(actualObj1);
  expect(expectedObj).toEqual(actualObj2);
});
