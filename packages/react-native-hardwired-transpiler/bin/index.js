#! /usr/bin/env node
const { Command } = require('commander');
const prepare = require('../dist/cjs/prepare.js');

const program = new Command();
program
  .requiredOption('--file <string>', 'File you want to transpile')
  .requiredOption(
    '--map-file <string>',
    'Defines location of hardwired map file'
  )
  .option(
    '--no-dependency-names <bool>',
    'Do not include dependency names in generated code. Reduces size of the output file, but makes it harder to debug [no names provided when dependency is not found]'
  )
  .option(
    '--output-file <string>',
    'Location of the output file, defaults to stdout'
  );

program.parse(process.argv);

const options = program.opts();

(async function (options) {
  try {
    const cliObject = await prepare(options);

    if (!options.outputFile) {
      if (cliObject) {
        process.stdout.write(cliObject);
      } else {
        console.error('Hardwired returned empty string');
        process.exit(0);
      }
    }
  } catch (e) {
    console.warn('Hardwired error', e);
    /*if(e.code!=='ERR_INVALID_ARG_TYPE'){
                  console.log("Hardwired: Promise rejection", e);
              }*/
  } finally {
    process.exit(0);
  }
})(options);
