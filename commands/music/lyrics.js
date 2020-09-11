const discord = require("discord.js");
const lyrics = require("solenolyrics");

exports.run = async (client, message, args) => {

    if (!args[0]) {await client.sendErrorEmbed(message.channel, "You must provide a Search Query"); return;}

    let lyr = await lyrics.requestLyricsFor(args.slice(0).join(" "));
    let auth = await lyrics.requestAuthorFor(args.slice(0).join(" "));
    let title = await lyrics.requestTitleFor(args.slice(0).join(" "));
    let icon = await lyrics.requestIconFor(args.slice(0).join(" "));

    let arr = discord.Util.splitMessage(lyr, { maxLength: 2048, char: "\n" });

    for (let i = 0; i < arr.length; i++) {
      await client.sendEmbed(message.channel, `**${title}** by **${auth}**`, arr[i], [], "", "", icon)
    }
}

module.exports.help = {
  name: "lyrics",
  description: "Search for song lyrics",
  dm: true,
  aliases: []
}