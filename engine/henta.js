const logger = require('./core/logger');
const cvars = require('./core/cvars');
const hooks = require('./core/hooks');
const cmdline = require('./core/cmdline');
const vk = require('./vk/vk');
const vkLongpoll = require('./vk/longpoll');

exports.version = "19.2a"

exports.startEngine = function (){
    logger.log(`HENTA V${exports.version}`);
    logger.log(`Электро Волк 2019.`);

    // Временное решение
    cvars.get("vk_token").setValue("yourtoken");
    cvars.get("vk_groupid").setValue("tourgid");

    hooks.addAction("vk_message_new", (msg) => {
        console.log(msg);
        vk.api.messages.send({peer_id: msg.peer_id, message: "Привет, мир"})
    })

    vkLongpoll.run().catch(console.error);
}

// Глобальные функции
global.typeOf = function (value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (Object.prototype.toString.call(value) == '[object Array]') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}

global.checkTypes = function (argList, typeList) {
    for (var i = 0; i < typeList.length; i++) {
        if (typeOf(argList[i]) !== typeList[i]) {
            throw 'wrong type: expecting ' + typeList[i] + ", found " + typeOf(argList[i]);
        }
    }
}
// Велодорожка =======================================================================
