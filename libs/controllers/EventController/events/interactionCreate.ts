import { CommandInteraction } from 'discord.js';
import interactionHandler from '../../../handlers/InteractionHandler/interactionHandler';

module.exports = {
	name: 'interactionCreate',
	run: async function (interaction: CommandInteraction) {
		await interactionHandler(interaction).catch(console.log);
	},
};
