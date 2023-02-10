import Discord, { IntentsBitField } from 'discord.js';

class Client {
	public client: Discord.Client;

	constructor() {
		const { Flags } = IntentsBitField;
		const intents = [
			Flags.Guilds,
			Flags.MessageContent,
			Flags.GuildMessages,
			Flags.GuildMembers,
		];

		this.client = new Discord.Client({
			intents,
		});
	}
}

export default new Client().client;
