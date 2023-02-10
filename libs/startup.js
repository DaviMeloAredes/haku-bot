require('dotenv/config');

const client = require('./client');
const dbStartup = require('./db/startupDb');

(async function () {
    const eventController = require('./controllers/EventController/EventController');
        
    await eventController.handleEvents();
})();

client.login(process.env.APP_TOKEN)
    .then(async () => await dbStartup());