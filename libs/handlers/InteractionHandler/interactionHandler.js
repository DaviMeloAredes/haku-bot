const readFolder = require('../../utils/readFolder')

module.exports = async (interaction) => {
    const path = 'libs/handlers/InteractionHandler/interactions';    

    // getting all interactions 
    await readFolder(
        { 
            path, 
            extension: '.js',
            returnProps: true
        }
    )
    .then((files) => {
        files.forEach((file) => {
            // file properties (type, desc, name)
            const { fileProps } = file;

            // checking if the names match, that is, 
            // if the command being executed is the same as the one being looped
            if (fileProps.name === interaction.commandName) {
                // if it is, then run the command
                fileProps.run(interaction);
            }
        });        
    })
    .catch(console.log);
}