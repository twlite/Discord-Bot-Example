module.exports = (client, guildConf, message) => {

    client.guildsSize = async () => {
        let size = 0;
        let guilds = await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)');
        guilds.forEach(g => {
            size = size + g;
        })
        return size;
    }

    client.channelsSize = async () => {
        let size = 0;
        let channels = await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.channels.size, 0)');
        channels.forEach(g => {
            size = size + g;
        })
        return size;
    }

    client.usersSize = async () => {
        let size = 0;
        let users = await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)');
        users.forEach(g => {
            size = size + g;
        })
        return size;
    }

    client.getGuild = async (guildID) => {
        return await client.shard.broadcastEval(`this.guilds.get("${guildID}")`);
    }

    client.getChannel = async (channelID) => {
        return await client.shard.broadcastEval(`this.guilds.get("${channelID}")`);
    }

    client.getUser = async (userID) => {
        return await client.shard.broadcastEval(`this.guilds.get("${userID}")`);
    }

}