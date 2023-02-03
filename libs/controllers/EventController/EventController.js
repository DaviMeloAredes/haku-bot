const client = require('../../client');
const fg = require('fast-glob');

class EventController {
    #events;

    constructor () {
        this.#events = [];
    }

    emitEvents () {
        this.#events.forEach(event => {
            try {
                client.on(event.name, 
                    function (args) { event.run(args) }
                );
            } catch (e) {
                console.log(e);
            }
        });
    }

    addEvent (event) {
        const fields = {
            name: event.name,
            run: event.run
        }

        if (!fields.name || !fields.run) 
            throw new Error('Invalid/Missing event properties.');

        this.#events.push(event);
    }

    async handleEvents () {
        const path = 'libs/controllers/EventController/events/**/**.js';
        const events = await fg(path);
    
        const getEventsProps = function () {
            let eventsProps = [];

            events.forEach(function (event) {
                const eventProps = require(`../../../${event}`);

                eventsProps.push(eventProps);
            });

            return eventsProps;
        }

        getEventsProps()
            .forEach((event) => this.addEvent(event));

        this.emitEvents();
    }
}

module.exports = new EventController();