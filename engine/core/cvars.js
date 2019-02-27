const cmdline = require('./cmdline');
const logger = require('./logger');

class Cvar {
  constructor(options) { Object.assign(this, options); }

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

exports.create = function(options) {
    let cvar = new Cvar(options);
    cvar_list[options.tag] = cvar;
    return cvar
}

exports.get = function(tag) {
    return cvar_list[tag];
}

cmdline.addCommand({
    tag: "cvars",
    description: "вывести список кваров",
    handler: () => {
        logger.log(`Список доступных кваров:`);
        for (let [key, cvar] in cvar_list)
            logger.log(`● ${cvar.tag} - ${cvar.description};`);
    }
});

cmdline.addCommand({
    tag: "getcvar",
    usage: "<имя>",
    typeList: ['string'],
    description: "вывести значение квара",
    handler: args => {
        let cvar = exports.get(args[1])
        if (!cvar) {
            logger.log(`Квар '${args[1]}' не найден.`);
            logger.log(`Введите 'cvars' для просмотра списка кваров.`);
            return;
        }

        logger.log(`${cvar.tag} = ${cvar}`);
    }
});

cmdline.addCommand({
    tag: "setcvar",
    usage: "<имя> <значение>",
    typeList: ['string', 'string'],
    description: "установить значение квара",
    handler: (args) => {
        let cvar = exports.get(args[1])
        if (!cvar) {
            logger.log(`Квар '${args[1]}' не найден.`);
            logger.log(`Введите 'cvars' для просмотра списка кваров.`);
            return;
        }

        cvar.setValue(args[2]);
        logger.log(`${cvar.tag} = ${cvar}`);
    }
});
