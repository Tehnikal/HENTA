const readline = require('readline');
const logger = require('./logger');
const utils = require('./utils');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

class Command {
  constructor(options) {
      Object.assign(this, options);
  }
}

const commands = {}

exports.doCommandline = function (input) {
let args = input.trim().split(' ');
    if (!args[0]) return;

    let command = commands[args[0]];
    if (command) {
        if (command.typeList && exports.checkTypes(command, args)) return;
        return command.handler(args);
    }

    logger.log(`Команда '${args[0]}' не найдена.`);
    logger.log(`Введите 'help' для просмотра списка команд.`);
}

rl.on('line', exports.doCommandline);

exports.addCommand = function(options) {
    let command = new Command(options);
    commands[options.tag] = command;
    return command;
}

exports.checkTypes = function (command, argList) {
	
    for (var i = 0; i < command.typeList.length; i++) {
        if (utils.typeOf(argList[i+1]) !== command.typeList[i]) {
            logger.log(`Используйте: ${command.tag} ${command.usage}`);
            return true;
        }
    }
}

exports.exeConfig = function (filename, silent) {
	var fs = require('fs')
    let lines = fs.readFileSync(filename, 'utf-8').split('\n').filter(Boolean);
    
    lines.forEach((input) => exports.doCommandline(input.toString()));
}


// Стандартные команды
exports.addCommand({
    tag: "help",
    description: "вывести список команд",
    handler: () => {
        logger.log(`Список доступных команд:`);
        for (let [key, cmd] in commands)
            logger.log(`● ${cmd.tag}${cmd.usage && ' '+cmd.usage || ''} - ${cmd.description};`);
    }
});
