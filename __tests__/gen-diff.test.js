// @ts-nocheck
/* eslint-disable no-undef */

import genDiff from '../src/gen-diff.js';

const jsonData1 = `{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`;

const jsonData2 = `{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}`;

const diff12 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const diff21 = `{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`;

test('genDiff flat testing', () => {
  expect(genDiff(jsonData1, jsonData2)).toMatch(diff12);
  expect(genDiff(jsonData2, jsonData1)).toMatch(diff21);
});
