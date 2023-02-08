module.exports = {
    name: 'ping',
    desc: 'a ping command',
    type: 1,
    run: (interaction) => {
        interaction.reply('pong');
    }
}