const Discord = require("discord.js");
const config = require(`${process.cwd()}/config.js`);

module.exports = async (manager, shard) => {

    console.log(`\x1b[33m${config.botName} > Loaded \x1b[36mShard \x1b[33m${shard.id}`);

    return;

};
