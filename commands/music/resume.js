module.exports = {
    help: {
        name: "resume",
        description: "Resume's the paused music",
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
        
        await client.player.resume(message.guild.id);
        
        return message.channel.send({ embed: {
            description: `▶ | Resumed the player!`,
            color: 0x3498db
        }});
    }
};