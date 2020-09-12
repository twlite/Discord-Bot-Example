const Discord = require('discord.js');

exports.run = async (client, message, args, guildConf, userConf) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1, args.length).join(' ');

    if (!client.checkPerms(message)) {await client.sendErrorEmbed(`Insufficient permissions`); return;}
    if (!user) {await client.sendErrorEmbed(message.channel, 'Please provide a user'); return;}
    if (user.id === message.author.id) {await client.sendErrorEmbed(message.channel, "You can't kick yourself"); return;}

    try {
        await user.kick(`${message.author.username} kicked this user with reason: ${reason}`);
    } catch(e) {
        throw e;
        await client.sendErrorEmbed(message.channel, 'I can\'t kick that user');
        return;
    }

    await client.sendEmbed(message.channel, `Member Kicked`, `
    Member: ${user}
    ID: ${user.id}
    `, [], `Reason: ${reason ? reason : "None"}`, "", "", "https://media.giphy.com/media/l1J3AS8RShMebsmgU/giphy.gif")

    return;
}

module.exports.help = {
    name: "kick",
    description: "Kicks  a user",
    dm: false,
    aliases: []
}