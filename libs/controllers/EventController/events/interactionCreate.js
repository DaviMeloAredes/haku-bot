const interactionHandler = require('../../../handlers/InteractionHandler/interactionHandler')

module.exports = {
    name: 'interactionCreate',
    run: async function (interaction) {
        // handling interactions
        await interactionHandler(interaction)
            .catch(console.log);
    }
}