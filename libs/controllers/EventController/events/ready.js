const commandController = require('../../CommandController/CommandController')

module.exports = {
    name: 'ready',
    run: async function (client) {
        // when the client starts, check for new commands
        await commandController.handleCommands();

        console.log('Online on', client.user.username);
    }
}