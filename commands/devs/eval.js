module.exports = {
  help: {
    name: "eval",
    description: "Evaluates (runs) JavaScript code",
    dm: true,
    aliases: ["e"]
  },
  run: async (message, args) => {
    const client = message.client;

    if (client.isOwner(message.author.id)) {
      let codeArr = args
        .slice(0)
        .join(" ")
        .split("\n");
      if (!codeArr[codeArr.length - 1].startsWith("return"))
        codeArr[codeArr.length - 1] = `return ${codeArr[codeArr.length - 1]}`;
      const code = `async () => { ${codeArr.join("\n")} }`;
      
      let embed = new Discord.MessageEmbed()
        .setTitle("Arguments")
        .setColor("#6a0dad")
        .setDescription(`Provide some javascript code to run`)
        .setTimestamp();
      if (!args[0]) return message.reply(embed.description);

      let func = eval(code);
      let evaled = await func();
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      evaled = evaled.replace(client.token, "[TOKEN HIDDEN]");
      message.channel.send(evaled, { split: true, code: "js" });
    } else {
      message.reply("You cannot use this!");
    }
  }
}
