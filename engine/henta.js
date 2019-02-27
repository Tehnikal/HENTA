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

// Велодорожка =======================================================================
