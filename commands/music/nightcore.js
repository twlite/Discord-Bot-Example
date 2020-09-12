module.exports = {
    help: {
        name: "nightcore",
		description: "Add's the nightcore effect",
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
        
        const ncEnabled = await client.player.getQueue(message.guild.id).filters.nightcore;
        
        client.player.setFilters(message.guild.id, {
            nightcore: !ncEnabled
        });
        
        return message.channel.send({ embed: {
            description: `✅ | Nightcore ${!ncEnabled ? "Enabled" : "Disabled"}!`,
            color: 0x3498db
        }})
    }
};
