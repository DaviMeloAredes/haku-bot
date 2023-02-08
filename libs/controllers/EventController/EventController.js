const client = require('../../client');
const fg = require('fast-glob');
const InvalidMissingParamsError = require('../../errors/InvalidMissingParamsError');
const readFolder = require('../../utils/readFolder');

class EventController {
    #events;

    constructor () {
        this.#events = [];
    }

    emitEvents () {
        this.#events.forEach((event) => {
            try {
                client.on(event.name, 
                    (args) => event.run(args)
                );
            } catch (e) {
                console.log(e);
            }
        });
    }

    addEvent (event) {
       const { name, run } = event;

        if (!name || !run) 
            throw new InvalidMissingParamsError();

        this.#events.push(event);
    }

    async handleEvents () {
        const path = 'libs/controllers/EventController/events';
        const files = await readFolder({ path, extension: '.js', returnProps: true });

        files.forEach((file) => {
            const { fileProps } = file;
            
            this.addEvent(fileProps);
        });

        this.emitEvents();
    }
}

module.exports = new EventController();