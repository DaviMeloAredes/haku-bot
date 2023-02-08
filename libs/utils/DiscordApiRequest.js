require('dotenv/config');

const axios = require('axios');
const { APP_ID, APP_TOKEN } = process.env;

async function sendRequest({ method, suffix, data }) {
    const url = `https://discord.com/api/v10/applications/${APP_ID}/${suffix}`

    const headers = {
        'Authorization': `Bot ${APP_TOKEN}`
    }

    const req = {
        method,
        url,
        headers,
        data
    }

    switch (req.method) {
        case 'get':
            return await axios({
                method: req.method,
                headers: req.headers,
                url: req.url,
            }).catch((e) => console.log(e));
        case 'post':
            return await axios({
                method: req.method,
                headers: req.headers,
                url: req.url,
                data: req.data
            }).catch((e) => console.log(e));
    }
}

class DiscordApiRequest {
    async postToApi({ data, suffix }) {
        let res;

        await sendRequest(
            {
                method: 'post',
                suffix,
                data
            }
        ).then((values) => res = values);

        return res;
    }

    async getApi({ suffix }) {
        let res;

        await sendRequest(
            {
                method: 'get',
                suffix
            }
        ).then((values) => res = values);

        return res;
    }
}

module.exports = new DiscordApiRequest();