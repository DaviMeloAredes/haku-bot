const readFolder = require('../../utils/readFolder')

module.exports = async (interaction) => {
    const path = 'libs/handlers/InteractionHandler/interactions';
    
    await readFolder(
        { 
            path, 
            extension: '.js',
            returnProps: true
        }
    )
    .then((files) => {
        files.forEach((file) => {
            const { fileProps } = file;

            if (fileProps.name === interaction.commandName) {
                fileProps.run(interaction);
            }
        });        
    })
    .catch(console.log);
}