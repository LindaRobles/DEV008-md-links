#!/usr/bin/env node
const yargs = require('yargs');
const { mdLinks } = require('./index.js');
const { countTotalAndUnique, countBrokenLinks } = require('./functions.js');
const chalk = require('chalk');

console.log(chalk.magentaBright("*************************************"));
console.log(chalk.magentaBright('Hey! :) Here is Lin md-links library!'));
console.log(chalk.magentaBright("*************************************"));

console.log("  /\\_/\\");
console.log("=( o.o )=");
console.log("  > - <");

console.log(chalk.yellow("Quick tip! If your path has inverted backslashes instead of '/',\n please enter your path within double quotes ^^ \n"));


// Yargs hace el CLI ejecutable
//Yargs se encarga del análisis de los argumentos y opciones proporcionados por el usuario

yargs
.usage(chalk.bold.cyanBright('md-links ./path/to/file.md -v -s')) 
.command('$0', chalk.cyan('Default command'))
.option('v', {
    alias: 'validate',
    describe: chalk.cyan('-v to check the status of each link'),
    type: 'boolean',
    default: false,
})
.option('s', {
  alias: 'stats',
  describe: 'Show statistics about the links',
  type: 'boolean',
  default: false,
})
.help('h')
.alias('h', 'help')
.argv;

const args = yargs.argv;
const filePath = args._[0];
const options = {
  validate: args.validate,
  stats: args.stats,
};

if (!filePath) {
  console.error(chalk.red('Error: You must provide a path.'));
  process.exit(1); 
}

 mdLinks(filePath, options)
    .then((linksWithStatus) => {
      if (options.stats) {
        const totalStats = `Total: ${linksWithStatus.length}`;
        const uniqueStats = countTotalAndUnique(linksWithStatus);
        const brokenStats = `Broken: ${countBrokenLinks(linksWithStatus)}`;
        console.log(chalk.cyanBright(totalStats));
        console.log(chalk.cyanBright(`Unique: ${uniqueStats.unique}`));
        console.log(chalk.cyanBright(brokenStats));
      }
      if (options.validate) {
        linksWithStatus.forEach((link) => {
          const statusInfo = link.ok === 'OK' ? 'OK' : 'Fail';
          console.log(
            `${chalk.magenta('Text:')} ${chalk.green(link.text)}\n` +
              `${chalk.magenta('href:')} ${chalk.green(link.href)}\n` +
              `${chalk.magenta('File:')} ${chalk.green(link.file)}\n` +
              `${chalk.magenta('Status:')} ${chalk.green(link.status)}\n` +
              `${chalk.magenta('StatusInfo:')} ${chalk.green(statusInfo)}\n`
          );
        });
      } else {
        linksWithStatus.forEach((link) => {
          console.log(
            `${chalk.magenta('Text:')} ${chalk.green(link.text)}\n` +
              `${chalk.magenta('href:')} ${chalk.green(link.href)}\n` +
              `${chalk.magenta('File:')} ${chalk.green(link.file)}\n`
          );
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });


