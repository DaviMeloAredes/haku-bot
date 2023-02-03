require('dotenv/config');

const client = require('./client');

(async function () {
    const eventController = require('./controllers/EventController/EventController');
        
    await eventController.handleEvents();
})();

client.login(process.env.APP_TOKEN);