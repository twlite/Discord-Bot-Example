const { Util, MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "queue",
		description: "Get the queue of songs that are playing and that will be played",
        aliases: ["q"],
		category: "Music"
    },
    run: async (client, message, args) => {
        
        if (!message.member.voice.channel) return message.channel.send({ embed: {
            description: `❌ | You are not in a voice channel!`,
            color: 0xff0000
        }});
        
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ embed: {
            description: `❌ | You are not in my voice channel!`,
            color: 0xff0000
        }});
        
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send({ embed: {
                description: `❌ | I'm not playing anything!`,
                color: 0xff0000
            }});
        }
        
        let queue = await client.player.getQueue(message.guild.id);
        
        let songs = queue.tracks.map((track, i) => {
            return `${i + 1} | **${track.name}** - **${track.author}**`;
        }).join('\n');
        
        let current = await client.player.nowPlaying(message.guild.id);
        
        current = `▶ | **${current.name}** - **${current.author}**\n`;
        
        current += songs;
        
        let chunks = client.Util.splitEmbedDescription(current, "\n");
        
        let total = chunks.length;
        
        let first = chunks.shift();
        
        const embed = new MessageEmbed()
            .setTitle("Queue")
            .setDescription(first)
            .setColor("#4D5E94")
            .setFooter(`Page 1/${total}`)
            .setTimestamp();
        message.channel.send(embed);
        
        chunks.forEach((c, i) => {
            const emb = new MessageEmbed()
                .setDescription(c)
                .setColor("#4D5E94")
                .setFooter(`Page ${i + 2}/${total}`)
                .setTimestamp();
            message.channel.send(emb);
        })
    }
};