const utils = require('../../../engine/core/utils');

exports.commands = []; // Массив с командами бота

exports.create = function(data) {
    if(data["off"] == undefined || !data.off) exports.commands.push(data);
}

exports.exe = async function(msg) {
    var args = msg.text.toLowerCase().split(' ');
    for(var i = 0; i < exports.commands.length; i++) {
        var cmd = exports.commands[i];
        if(typeof(cmd.name) != "object") cmd.name = [ cmd.name ];
        for(var i = 0; i < cmd.name.length; i++) {
            if(cmd.name[i] == args[0]) {
                var user = await db.get_user(msg.from_id);
                if(user == undefined) user = await db.create_user(msg.from_id);
                console.log(user)
                var data = { args: args, msg: msg };
                let rmsg = cmd.handler(data, user)
                switch(utils.typeOf(rmsg)) {
                    case "string":
                        return { message: rmsg }
                        break;
                    case "array":
                        return { message: rmsg.join('\n') }
                        break;
                    default:
                        return rmsg.build();
                        break;
                }
            }
        }
    }
}
