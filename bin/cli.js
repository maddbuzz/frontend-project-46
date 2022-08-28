#!/usr/bin/env node
/* eslint-disable func-names */

import { Command } from 'commander';
import getFilesDiff from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .configureHelp({ sortOptions: true });

program.action((filepath1, filepath2, options) => {
  console.log();
  console.log(getFilesDiff(filepath1, filepath2, options.format));
});

function errorColor(str) {
  // Add ANSI escape codes to display text in red.
  return `\x1b[31m${str}\x1b[0m`;
}

program.exitOverride();

try {
  program.parse(process.argv);
} catch (err) {
  if (err.exitCode === undefined) {
    console.log(errorColor(err.message));
    process.exit(1);
  }
  process.exit(err.exitCode);
}
