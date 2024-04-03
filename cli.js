#!/usr/bin/env node
const { program } = require('commander');
const { version, getBlockNumber } = require('./commands/versioning/version');
const { rpc } = require('./commands/config/config');
const { getValidators } = require('./commands/validator/getvals'); 
const {fillValidatorDetails} = require('./commands/validator/getvaldump');

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
    
  validator
  .command('get-config')
  .option('--name <name>', 'Validator name')
  .option('--feeaddress <address>', 'Biz Validator address for fees')
  .option('--moniker <moniker>', 'Moniker value')
  .option('--identity <identity>', 'Identity value')
  .option('--website <website>', 'Website URL')
  .option('--email <email>', 'Email address')
  .option('--details <details>', 'Details')
  .option('--privatkey <privatkey>', 'Private key')
  .action(({ name, feeaddress, moniker, identity, website, email, details,privatkey }) => {
    fillValidatorDetails({ name, feeAddress: feeaddress, moniker, identity, website, email, details,privatkey });
  });

  program.parse(process.argv);
});
