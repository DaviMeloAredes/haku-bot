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

    // getting the client
    await discordApiRequest.getApi({ suffix: 'commands' })
        .then((cmds) => {
            cmds.data.forEach(cmd => {
                if (cmd.name == cmdName) n++;
            })
        })
        .catch(console.log);

    if (n > 0) return true;
}

class CommandController {
    async addCommand (cmd) {
        if (!cmd.name || !cmd.desc || !cmd.type) 
            throw new InvalidMissingParamsError();
                      
        await postCmd(cmd);
    }

    async handleCommands () {
        const path = 'libs/handlers/InteractionHandler/interactions'
        
        const files = await readFolder({ path, extension: '.js', returnProps: true })

        files.forEach(async (file) => {
            const { fileProps } = file;

            if (await alreadyExists(fileProps.name)) {
                console.log(`Loaded Command: /${fileProps.name}`);
            } else {
                console.log(`Created Command: /${fileProps.name}`)
            };

            try {
                this.addCommand(fileProps);
            } catch (e) {
                console.log(e);
            }
        })
    }
}

module.exports = new CommandController();