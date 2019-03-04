const hooks = require('../../../engine/core/hooks');
const vk = require('../../../engine/vk/vk');
var fs = require("fs")

fs.readdir(__dirname + "/../commands", function(err, files) {
    files.map(function(file) {
        require(__dirname + "/../commands/" + file);
    });
})

hooks.addAction("vk_message_new", async (msg) => {
        console.log(msg.text);
        var response = await botcmd.exe(msg);
        response.peer_id = msg.from_id
        if(response != undefined) vk.api.messages.send(response)
    })


exports.response = function(args) {
    if(!args) var args = {};
    if(!args.message) args.message = [];
    if(typeof(args.message) == "string") args.message = [ args.message ];
    return new messagesender.messageSender(args)
}
