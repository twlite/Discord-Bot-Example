const { MessageEmbed, Util } = require("discord.js");
const lyrics = require("solenolyrics");

module.exports = {
  help: {
    name: "lyrics",
    description: "Search for song lyrics",
    dm: true,
    aliases: []
  },
  run: async (message, args) => {
    if(!args[0]) return message.reply("You must provide a Search Query");
    let lyr = await lyrics.requestLyricsFor(args.slice(0).join(" "));
    let auth = await lyrics.requestAuthorFor(args.slice(0).join(" "));
    let title = await lyrics.requestTitleFor(args.slice(0).join(" "));
    let icon = await lyrics.requestIconFor(args.slice(0).join(" "));

    let arr = Util.splitMessage(lyr, { maxLength: 2048, char: "\n" });
    for(let i = 0; i < arr.length; i++){
      let embed = new MessageEmbed({
        description: arr[i],
        color: "RANDOM",
        title: `**${title}** by **${auth}**`,
        timestamp: Date.now(),
        thumbnail: icon
      });
      message.channel.send({ embed });
    }
  }
}
