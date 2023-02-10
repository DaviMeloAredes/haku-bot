import { CommandInteraction } from 'discord.js';
import userModel from '../../../db/models/userModel';

class XpController {
	public xpPerMsgBase: number;

	constructor() {
		this.xpPerMsgBase = 10;
	}

	async gainXpByChatting(interaction: CommandInteraction) {
		//const { xp, level } = await userModel.findOne({ u_id: interaction.member.id });
		const xpToGain = Math.floor(Math.random() * this.xpPerMsgBase);

		await userModel.findOneAndUpdate(
			{ u_id: interaction.user?.id },
			{ $inc: { xp: xpToGain } }
		);
	}
}

export default new XpController();
