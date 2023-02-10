const { Schema } = require('mongoose');

const userSchema = new Schema({
	u_id: { type: String, required: true },
	xp: { type: Number, required: true },
	level: { type: Number, required: true },
	badges: [
		{
			id: { type: String, required: true },
			rarityLevel: { type: Number, required: true },
		},
	],
});

export default userSchema;
