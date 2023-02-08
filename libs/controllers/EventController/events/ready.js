const commandController = require('../../CommandController/CommandController')

module.exports = {
    name: 'ready',
    run: async function (client) {
        await commandController.handleCommands();

        console.log('Online on', client.user.username)
    }
}