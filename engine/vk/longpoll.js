// Этот код был написан на коленке. Не кушойте меня.
const fetch = require('node-fetch');
const cvars = require('../core/cvars');
const hooks = require('../core/hooks');
const logger = require('../core/logger');
const vk = require('./vk');

exports.run = async function () {
    await vk.vk_io.updates.startPolling();
    vk.vk_io.updates.pollingHandler = async (update) => {
    	try {
				hooks.doAction(`vk_${update.type}`, update.object);
			} catch (error) {
				console.error(error);
			}
    }
}
