import { Client } from 'discord.js';

import CommandController from '../../CommandController/CommandController';

module.exports = {
	name: 'ready',
	run: async function (client: Client) {
		await CommandController.handleCommands();

		console.log('Online on', client.user?.username);
	},
};
