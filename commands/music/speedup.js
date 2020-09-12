// Custom filter (not available on discord-player)
// check config file for example

module.exports = {
    help: {
        name: "speedup",
        description: "Speed's up the music",
		category: "Music"
    },
    run: async (client, message, args) => {
        
        if (!message.member.voice.channel) return message.channel.send({ embed: {
            description: `❌ | You are not in a voice channel!`,
            color: 0xff0000
        }});
        
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("❌ | You are not in my voice channel!");
        
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send({ embed: {
                description: `❌ | I'm not playing anything!`,
                color: 0xff0000
            }});
        }
        
        const speedup = await client.player.getQueue(message.guild.id).filters["speedup"];
        
        client.player.setFilters(message.guild.id, {
            "speedup": !speedup
        });
        
        return message.channel.send({ embed: {
            description: `✅ | Player speed set to ${!speedup ? "1.3x" : "1x"}!`,
            color: 0x3498db
        }});
    }
};
