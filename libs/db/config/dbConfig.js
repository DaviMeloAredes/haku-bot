const configJson = require('./dbConfig.json');

module.exports = (db) => {
    for (let i = 0; i < configJson.length; i++) {
        const props = Object.entries(configJson[i])[0];

        db.set(props[0], props[1]);
    }
}