const logger = require('./logger');
let plugins = [];

exports.loadPlugin = pluginName => {
	logger.log(`Загрузка плагина ${ pluginName }`);
	global[pluginName] = require(`../../bot/src/plugins/${ pluginName }`);
	plugins.push({ name: pluginName, plug: global[pluginName] })
}

exports.init = () => {
	require(`../../bot/src/plugins.js`);
	/*for(var i = 0; i < plugins.length; i++) {
		if(plugins[i].plug.check_install) plugins[i].plug.check_install();
	}*/
	plugins.forEach(item => {
		if(item.plug.check_install) item.plug.check_install();
	});
	plugins.forEach(item => {
		logger.log(`Плагин ${ item.name } загружен!`);
		if(item.plug.start) item.plug.start();
	});
}
