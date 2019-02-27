// Этот код был написан на коленке. Не кушойте меня.
const fetch = require('node-fetch');
const cvars = require('../core/cvars');
const hooks = require('../core/hooks');
const logger = require('../core/logger');
const vk = require('./vk');

class LongPoll {
    constructor() { }
    async run() {
        if (this.isStarted) return;
    		this.isStarted = true;

    	try {
    		const { server, key, ts } = await vk.api.groups.getLongPollServer({ group_id: cvars.get("vk_groupid").value });

    		if (!this.ts) this.ts = ts;

    		this.url = new URL(server);
    		this.url.search = new URLSearchParams({ key, act: 'a_check', wait: 25 });
            this.startFetchLoop();
    	}
        catch (error) {
        	this.isStarted = false;
    		throw error;
        }
    }

    async startFetchLoop() {
		try {
			await this.fetchUpdates();
		} catch (error) {
			logger.log(`Произошла LongPoll ошибка: ${error}`);
		}
    }

    async fetchUpdates() {
		this.url.searchParams.set('ts', this.ts);

        console.log("Wait...");

		let response = await fetch(this.url, {
			method: 'GET',
			timeout: 30e3,
			compress: false,
			headers: { connection: 'keep-alive' }
		});

		response = await response.json();



		if ('failed' in response) {
			if (response.failed === 1) {
				this.ts = response.ts;
				return;
			}
		}

		this.ts = response.ts;

		if ('pts' in response) {
			this.pts = Number(response.pts);
		}


		/* Async handle updates */
		response.updates.forEach(async (update) => {
			try {
				hooks.doAction(`vk_${update.type}`, update.object);
			} catch (error) {
				console.error(error);
			}
		});
}
}

let longpoll = new LongPoll();

exports.run = async function () {
    longpoll.run();
}
