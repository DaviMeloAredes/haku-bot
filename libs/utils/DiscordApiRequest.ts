require('dotenv/config');

const axios = require('axios');
const { APP_ID, APP_TOKEN } = process.env;

type sendRequestParams = { method: string; suffix: string; data?: any };

async function sendRequest({ method, suffix, data }: sendRequestParams) {
	const url = `https://discord.com/api/v10/applications/${APP_ID}/${suffix}`;

	const headers = {
		Authorization: `Bot ${APP_TOKEN}`,
	};

	const req = {
		method,
		url,
		headers,
		data,
	};

	switch (req.method) {
		case 'get':
			return await axios({
				method: req.method,
				headers: req.headers,
				url: req.url,
			}).catch(console.log);
		case 'post':
			return await axios({
				method: req.method,
				headers: req.headers,
				url: req.url,
				data: req.data,
			}).catch(console.log);
	}
}

class DiscordApiRequest {
	async postToApi({ data, suffix }: { data: any; suffix: string }) {
		let res: any;

		await sendRequest({
			method: 'post',
			suffix,
			data,
		}).then((values) => (res = values));

		return res;
	}

	async getFromApi({ suffix }: { suffix: string }): Promise<any> {
		let res: any;

		await sendRequest({
			method: 'get',
			suffix,
		}).then((values) => (res = values));

		return res;
	}
}

export default new DiscordApiRequest();
