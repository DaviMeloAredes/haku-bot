import 'dotenv/config';
import client from './client';
import EventController from './controllers/EventController/EventController';
import dbControl from './db/DatabaseController';

(async function () {
	await EventController.handleEvents();
})();

client.login(process.env.APP_TOKEN).then(async () => dbControl.startup());
