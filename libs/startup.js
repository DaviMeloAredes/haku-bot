require('dotenv/config');

const { login } = require('./client');
const { APP_TOKEN } = process.env;

login(APP_TOKEN)
    .then(function () {
        console.log('app on')
    });