const logger = require('./core/logger');
const cvars = require('./core/cvars');
const hooks = require('./core/hooks');
const cmdline = require('./core/cmdline');
const vk = require('./vk/vk');
const vkLongpoll = require('./vk/longpoll');
const plugins = require('./core/plugins');

exports.version = "19.2a"

exports.startEngine = function (){
    logger.log(`HENTA V${exports.version}`);
    logger.log(`Электро Волк 2019.`);

    cmdline.exeConfig("./bot/config.cfg");

    plugins.init();

    vkLongpoll.run().catch(console.error);
}

// Велодорожка =======================================================================
