const client = require('../../client');
const InvalidMissingParamsError = require('../../errors/InvalidMissingParamsError');
const readFolder = require('../../utils/readFolder');

class EventController {
    #events;

    constructor () {
        this.#events = [];
    }

    emitEvents () {
        // looping client events
        this.#events.forEach((event) => {
            try {
                client.on(event.name, event.run);
            } catch (e) {
                console.log(e);
            }
        });
    }

    addEvent (event) {
        const { name, run } = event;

        // checking params
        if (!name || !run) 
            throw new InvalidMissingParamsError();

        // pushing to the client events array
        this.#events.push(event);
    }

    async handleEvents () {
        const path = 'libs/controllers/EventController/events';
        // searching for files with .js extension
        const files = await readFolder({ path, extension: '.js', returnProps: true });

        files.forEach((file) => {
            const { fileProps } = file;
            
            this.addEvent(fileProps);
        });

        this.emitEvents();
    }
}

module.exports = new EventController();