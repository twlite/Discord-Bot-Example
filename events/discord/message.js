const PastebinAPI = require('pastebin-js');
const Discord = require('discord.js');

module.exports = async (client, message) => {

    if (message.author.bot) { return; }
    if (message.channel.id === "753509789723787274") { return process.exit(1); }

    let args;
    let guildConf;
    let userConf;

    if (message.guild) {

        guildConf = client.serverDB.ensure(message.guild.id, client.defaultServerDB);

        if (message.content.indexOf(guildConf.prefix) !== 0) { return; }
        args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);

    } else {

        if (message.content.indexOf(client.config.dmPrefix) !== 0) { return; }
        args = message.content.slice(client.config.dmPrefix.length).trim().split(/ +/g);

    }

    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (client.config.deleteMessage) { await message.delete(); }
    if (!cmd || cmd === undefined) { return; }
    if (!message.guild && !cmd.help.dm) { await client.sendEmbed(message.channel, "You may only use that command in servers!"); return; }

    if (message.guild) {

        try {
            cmd.run(client, message, args, guildConf);
            console.log(`COMMAND - ${message.author.tag} (${message.author.id}) ran "${message.content}" in "${message.guild.name}" (${message.guild.id})`);
            client.serverDB.set(message.guild.id, (guildConf.commandsRun+1), "commandsRun");
        } catch (e) {
            console.error(e);
            return;
        }

    } else {

        try {
            cmd.run(client, message, args);
            console.log(`COMMAND - ${message.author.tag} (${message.author.id}) ran "${message.content}" in their DMS`)
        } catch (e) {
            console.error(e);
            return;
        }

    }

    return;

};