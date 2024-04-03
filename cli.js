#!/usr/bin/env node
const { program } = require('commander');
const { version, getBlockNumber } = require('./commands/versioning/version');
const { rpc } = require('./commands/config/config');
const { getValidators } = require('./commands/validator/getvals'); // Correct import path

let selectedRPC;

Promise.all([import('figlet'), import('chalk')]).then(([figlet, chalk]) => {
  function displayTitle() {
    console.log(
      chalk.default.greenBright(
        figlet.default.textSync('BIZ-CLI', { horizontalLayout: 'full' }),
      ),
    )
  }

  // Display the title when the program starts
  displayTitle();

  program
    .version(version)
    .description('CLI for interacting with BIZ-chain');

  program
    .command('version')
    .description('Display the current version')
    .option('--chain <network>', 'Specify the network (testnet/mainnet)')
    .action((options) => {
      console.log('CLI Version:', version);
      selectedRPC = rpc[options.chain] || rpc.testnet;
      getBlockNumber(selectedRPC).then(() => {
      });
    });

  const validator = program 
    .command('validator')
    .description('Biz chain validation related commands');
  
  validator
    .command('get-current-validators')
    .option('--chain <network>', 'Specify the network (testnet/mainnet the default is mainnet)')
    .action((options) => {
      selectedRPC = rpc[options.chain] || rpc.mainnet;
      getValidators(selectedRPC).then(() => {
      });
    });

  program.parse(process.argv);
});
