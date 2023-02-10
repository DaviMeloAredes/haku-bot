import { CommandInteraction } from 'discord.js';

module.exports = {
  name: 'ping',
  desc: 'a ping command',
  type: 1,
  run: (interaction: CommandInteraction) => {
    interaction.reply('pong');
  },
};
