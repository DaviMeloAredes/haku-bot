require('dotenv/config');
const mongoose = require('mongoose');
const dbConfig = require('./config/dbConfig');

const { DB_PASS, DB_USER } = process.env;

module.exports = async () => {
    // db connection
    const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@bots.un7ia.mongodb.net/?retryWrites=true&w=majority`;

    dbConfig(mongoose);

    mongoose.connect(uri, console.log('DB STATUS: ON'));
}