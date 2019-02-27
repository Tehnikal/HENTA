const chalk = require('chalk');

function getTime() {
    var temp = new Date();
    return `${temp.getHours()}:${temp.getMinutes()}:${temp.getSeconds()}`
}

function getElement(data) {
    return `${chalk.blue('[')}${chalk.cyan(data)}${chalk.blue(']')}`
}

exports.log = function (message) {
    console.log(`${getElement(getTime())} ${message}`);
}
