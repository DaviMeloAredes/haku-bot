import { CommandInteraction } from 'discord.js';
import userModel from '../../../db/models/userModel';

class LevelController {
	public xpPerLevelBase: number;
	public maxLevel: number;

	constructor() {
		this.xpPerLevelBase = 100;
		this.maxLevel = 10;
	}

	calculateXpToUp(userLevel: number) {
		const xpToUp = this.xpPerLevelBase * userLevel;

		return xpToUp;
	}

	async upIfEnoughXp(interaction: CommandInteraction) {
		const u_id = interaction.user?.id;
		const user = await userModel.findOne({ u_id });

		const xpRequired = this.calculateXpToUp(user.level);

		if (user.level >= this.maxLevel) return;

		if (user.xp >= xpRequired) {
			await userModel.findOneAndUpdate(
				{ u_id },
				{ $inc: { level: 1 }, $set: { xp: 0 } }
			);
		}
	}
}

export default new LevelController();
