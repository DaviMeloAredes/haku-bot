import { CommandInteraction } from 'discord.js';

import userModel from '../../db/models/userModel';
import readFolder, { FilesProps } from '../../utils/readFolder';
import LevelController from './controllers/LevelController';
import XpController from './controllers/XpController';

const alreadyInDb = async (u_id: string) => {
  const condition = await userModel.findOne({ u_id });

  if (condition) return;

  const newUser = new userModel({
    u_id,
    xp: 0,
    level: 1,
  });

  newUser.save(console.log);
};

export default async (interaction: CommandInteraction) => {
  const path = 'libs/handlers/InteractionHandler/interactions';

  await alreadyInDb(interaction.user?.id);
  await XpController.gainXpByChatting(interaction);
  await LevelController.upIfEnoughXp(interaction);

  await readFolder({
    path,
    extension: '.ts',
    returnProps: true,
  })
    .then((files) => {
      files.forEach((file) => {
        if (typeof file !== 'string') {
          const fileProps = file.fileProps;

          if (fileProps.name === interaction.commandName) {
            fileProps.run(interaction);
          }
        }
      });
    })
    .catch(console.log);
};
