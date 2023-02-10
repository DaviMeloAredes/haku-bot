const { Schema } = require('mongoose');

const userSchema = new Schema({
    u_id: String,
    xp: Number,
    level: Number,
    badges: [
        {
            id: String,
            rarityLevel: Number
        }
    ]
    /* rank (local & global) (to-do)
    gRankPos: String,
    guilds: [
        {
            g_id: String,
            rankPos: Number
        }
    ]
    */
});

module.exports = userSchema;