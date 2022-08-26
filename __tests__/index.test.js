/* eslint-disable no-undef */
// @ts-nocheck

import { readFileSync } from 'fs';
import { dirname, join as pathJoin } from 'path';
import { fileURLToPath } from 'url';
import getFilesDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileName1 = 'file1.json';
const fileName2 = 'file2.json';
const diffFileName = 'file1.file2.diff';

const getFixturePath = (filename) => pathJoin(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('getFilesDiff flat testing', () => {
  const diffFile = readFile(diffFileName);
  expect(getFilesDiff(getFixturePath(fileName1), getFixturePath(fileName2)))
    .toMatch(diffFile);
});
