#! /usr/bin/env node

const { Command } = require("commander");
const buildMapCommand = require("./buildMap.js");

const program = new Command();
program
  .requiredOption(
    "--output-map-file <string>",
    "Defines the hardwired map output file"
  )
  .option(
    "--dominant-platform <string>",
    "Defines which os is dominating in the project, experimental fallback"
  )
  .option(
    "--entry-file <string>",
    "Defines the entry file (same as for bundle)"
  );

program.parse(process.argv);

const options = program.opts();

new Promise(async (resolve) => {
  try {
    await buildMapCommand(options);
  } finally {
    resolve();
    process.exit(0);
  }
});
