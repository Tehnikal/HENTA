const readline = require('readline');
const logger = require('./logger');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

class Command {
  constructor(options) {
      Object.assign(this, options);
      commands[options.tag] = this
  }
}

const commands = {}

rl.on('line', (input) => {
    let args = input.trim().split(' ');
    if (!args[0]) return;

    let command = commands[args[0]];
    if (command) {
        if (command.typeList && exports.checkTypes(command, args)) return;
        return command.func(args);
    }

    logger.log(`Команда '${args[0]}' не найдена.`);
    logger.log(`Введите 'help' для просмотра списка команд.`);
});

exports.addCommand = function(tag, description, func, typeList) {
    return new Command({ tag: tag.split(' ')[0], description, func, usage: tag.split(' ').splice(1).join(' '), typeList })
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
exports.addCommand("help", "вывести список команд", () => {
    logger.log(`Список доступных команд:`);
    for (let key in commands) {
        let cmd = commands[key]
        logger.log(`● ${cmd.tag}${cmd.usage && ' '+cmd.usage || ''} - ${cmd.description};`);
    }
});
