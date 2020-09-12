module.exports = {
    help: {
        name: "skip",
        description: "Skip's the currently playing song",
		category: "Music"
    },
    
run: async(client, message, args) => {
        
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
        
        let song = await client.player.skip(message.guild.id);
        
        return message.channel.send({ embed: {
            description: `✅ | Skipped **${song.name}**!`,
            color: 0x3498db
        }});
    }
};