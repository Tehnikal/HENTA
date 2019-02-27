const readline = require('readline');
const logger = require('./logger');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

class Command {
  constructor(options) {
      Object.assign(this, options);
  }
}

const commands = {}

rl.on('line', (input) => {
    let args = input.trim().split(' ');
    if (!args[0]) return;

    let command = commands[args[0]];
    if (command) {
        if (command.typeList && exports.checkTypes(command, args)) return;
        return command.handler(args);
    }

    logger.log(`Команда '${args[0]}' не найдена.`);
    logger.log(`Введите 'help' для просмотра списка команд.`);
});

exports.addCommand = function(options) {
    let command = new Command(options);
    commands[options.tag] = command;
    return command;
}

exports.checkTypes = function (command, argList) {
    for (var i = 1; i < command.typeList.length + 1; i++) {
        if (typeOf(argList[i]) !== command.typeList[i]) {
            logger.log(`Используйте: ${command.tag} ${command.usage}`);
            return true;
        }
    }
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
