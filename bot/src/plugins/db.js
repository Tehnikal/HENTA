const logger = require('../../../engine/core/logger');
const { Client } = require('pg');

exports.acctable = "accounts"

exports.client = new Client({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
})
exports.client.connect()

exports.check_install = function() {
    if(!exports.client) throw new Error("Подключение к PostgreSQL отсутствует");
}

// USER

exports.create_args = [];

exports.get_user = async function(vkid) {
    const response = await exports.client.query("SELECT * FROM accounts WHERE vkid = " + vkid)
    if(response.rows.length == 0) return;
    return new userclass.user(response.rows[0]);
}

exports.create_user = async function(vkid) {
    let keys = exports.create_args.map(arg => {
        return arg.key
    })
    let values = exports.create_args.map(arg => {
        if(typeof(arg.value) == "function") {
            return arg.value()
        }
        else return arg.value
    })
    keys.push("vkid")
    values.push(vkid)
    await exports.client.query("INSERT INTO accounts (" + keys.join(",") + ") VALUES (" + values.join(",") + ")")
    return exports.get_user(vkid)
}

//

exports.find_table = async function(table_name) {
    const response = await exports.client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
    for(var i = 0; i < response.rows.length; i++) {
        if(response.rows[i].table_name == table_name) return response.rows[i].table_name
    }
}

exports.find_column = async function(table_name, column_name) {
    const response = await exports.client.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${ table_name }'`)
    for(var i = 0; i < response.rows.length; i++) {
        if(response.rows[i].column_name == column_name) return response.rows[i].column_name
    }
}

exports.check_column = async function(module_name, table_name, column_name, args) {
    if(await exports.find_column(table_name, column_name)) return true
    logger.log(`[${ module_name }] Создаю поле ${ column_name } в ${ table_name }...`)
    exports.client.query(`ALTER TABLE ${ table_name } ADD ${ column_name } ${ args }`)
    logger.log(`[${ module_name }] Поле ${ column_name } было успешно создано.`)
}

module.check_table = async function(module_name, table_name, command) {
    if(await exports.find_table(table_name)) return true;
    logger.log(`[${ module_name }] Таблица ${ table_name } не найдена.`)
    logger.log(`[${ module_name }] Создание таблицы ${ table_name }...`)
    exports.client.query(`CREATE TABLE ${ table_name } ${ command }`)
    logger.log(`[${ module_name }] Таблица ${ table_name } успешно создана!`)
}
