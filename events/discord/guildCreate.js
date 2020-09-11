const Discord = require("discord.js");

module.exports = (client, guild) => {

    console.log(`The bot has joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members.`);

    client.check(guild.id);

    return;


};