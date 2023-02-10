import { CommandInteraction } from 'discord.js';
import userModel from '../../../../db/models/userModel';

module.exports = {
	name: 'xp',
	desc: 'See your actual xp.',
	type: 1,
	run: async (interaction: CommandInteraction) => {
		const user = interaction.user;
		const { xp, level } = await userModel.findOne({ u_id: user.id });

		interaction.reply(`Your xp is ${xp} \\\ your level is ${level}`);
	},
};
