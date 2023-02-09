require('dotenv/config');

const discordApiRequest = require('../../utils/DiscordApiRequest');
const readFolder = require('../../utils/readFolder');
const InvalidMissingParamsError = require('../../errors/InvalidMissingParamsError');

// posting the command to the discord api
async function postCmd (cmd) {
    // command's data
    const data = {
        "name": cmd.name,
        "type": cmd.type,
        "description": cmd.desc
    }

    await discordApiRequest.postToApi({ data, suffix: 'commands' })
        .catch((e) => console.log(e));
}

async function alreadyExists (cmdName) {
    let n = 0;

    // getting the client commands and checking if alreadys exists
    await discordApiRequest.getFromApi({ suffix: 'commands' })
        .then((cmds) => {
            cmds.data.forEach(cmd => {
                // comparing names
                if (cmd.name == cmdName) n++;
            })
        })
        .catch(console.log);

    // if there is already a command of the same name (n > 0),
    // just do nothing
    if (n > 0) return true;
}

class CommandController {
    async addCommand (cmd) {
        // checking params
        if (!cmd.name || !cmd.desc || !cmd.type) 
            throw new InvalidMissingParamsError();
                      
        // posting to discord api...
        await postCmd(cmd);
    }

    async handleCommands () {
        const path = 'libs/handlers/InteractionHandler/interactions'
        
        // searching for all files in interactions folder with .js extension
        const files = await readFolder({ path, extension: '.js', returnProps: true })

        files.forEach(async (file) => {
            // we just want the file's properties
            const { fileProps } = file;

            // differentiation of logging for loading and creating app commands
            if (await alreadyExists(fileProps.name)) {
                console.log(`Loaded Command: /${fileProps.name}`);
            } else {
                console.log(`Created Command: /${fileProps.name}`)
            };

            // after all processes, adding the command
            this.addCommand(fileProps)
                .catch(console.log);
        })
    }
}

module.exports = new CommandController();