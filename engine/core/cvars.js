const cmdline = require('./cmdline');
const logger = require('./logger');

class Cvar {
  constructor(options) {
      Object.assign(this, options);
      cvar_list[options.tag] = this
  }

  setCallback(callback) {
      this.callback = callback;
      return this;
  }

  setValue(newValue) {
      this.value = newValue;
      if (this.callback)
        this.callback(newValue);
  }

  toString() {
      return this.value && this.value.toString();
  }
}

let cvar_list = {}

exports.create = function(tag, description, value) {
    return new Cvar({ tag, description, value })
}

exports.get = function(tag) {
    return cvar_list[tag];
}

cmdline.addCommand("cvars", "вывести список кваров", () => {
    logger.log(`Список доступных кваров:`);
    for (let key in cvar_list) {
        let cvar = cvar_list[key]
        logger.log(`● ${cvar.tag} - ${cvar.description};`);
    }
});

cmdline.addCommand("getcvar <имя>", "вывести значение квара", (args) => {
    let cvar = exports.get(args[1])
    if (!cvar) {
        logger.log(`Квар '${args[1]}' не найден.`);
        logger.log(`Введите 'cvars' для просмотра списка кваров.`);
        return;
    }

    logger.log(`${cvar.tag} = ${cvar}`);
}, ['string']);

cmdline.addCommand("setcvar <имя> <значение>", "установить значение квара", (args) => {
    let cvar = exports.get(args[1])
    if (!cvar) {
        logger.log(`Квар '${args[1]}' не найден.`);
        logger.log(`Введите 'cvars' для просмотра списка кваров.`);
        return;
    }

    cvar.setValue(args[2]);
    logger.log(`${cvar.tag} = ${cvar}`);
}, ['string']);
