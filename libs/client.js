const Discord = require('discord.js');

class Client {
    client;
    #intents;

    constructor () {
        this.#intents = [ 32906 ];
        this.client = new Discord.Client({ intents: this.#intents });
    }
}

module.exports = new Client().client;