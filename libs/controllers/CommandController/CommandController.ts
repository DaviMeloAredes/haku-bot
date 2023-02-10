require('dotenv/config');

import DiscordApiRequest from '../../utils/DiscordApiRequest';
import readFolder, { FilesProps } from '../../utils/readFolder';
import InvalidMissingParamsError from '../../errors/InvalidMissingParamsError';
import { CommandType } from '../../types/CommandType';

async function postCmd(cmd: CommandType) {
	const data = {
		name: cmd.name,
		type: cmd.type,
		description: cmd.desc,
	};

	await DiscordApiRequest.postToApi({ data, suffix: 'commands' }).catch((e) =>
		console.log(e)
	);
}

async function alreadyExists(cmdName: string) {
	let n = 0;

	await DiscordApiRequest.getFromApi({ suffix: 'commands' })
		.then((cmds) => {
			cmds.data.forEach((cmd: CommandType) => {
				if (cmd.name == cmdName) n++;
			});
		})
		.catch(console.log);

	if (n > 0) return true;
}

class CommandController {
	async addCommand(cmd: CommandType) {
		if (!cmd.name || !cmd.desc || !cmd.type)
			throw new InvalidMissingParamsError();

		await postCmd(cmd);
	}

	async handleCommands() {
		const path = 'libs/handlers/InteractionHandler/interactions';

		const files = await readFolder({
			path,
			extension: '.ts',
			returnProps: true,
		});

		files.forEach(async (file: FilesProps | string) => {
			if (typeof file !== 'string') {
				const { fileProps } = file;

				if (await alreadyExists(fileProps.name)) {
					console.log(`Loaded Command: /${fileProps.name}`);
				} else {
					console.log(`Created Command: /${fileProps.name}`);
				}

				this.addCommand(fileProps).catch(console.log);
			}
		});
	}
}

export default new CommandController();
