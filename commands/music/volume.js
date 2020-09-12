module.exports = {
    help: {
        name: "volume",
		description: "Change's the volume!",
        aliases: ["vol"],
		category: "Music"
    },
    run: async (client, message, args) => {
        
        if (!message.member.voice.channel) return message.channel.send({ embederror: {
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
        
        let volume = args[0];
        
        let queue = await client.player.getQueue(message.guild.id);
        
        if (!volume || isNaN(volume)) return message.channel.send({ embed: {
			description: `🔊 | Current Volume: **${queue.volume}%**`,
			color: 0x3498db
		}});
        
        volume = Math.round(parseInt(volume));
        
        if (volume < 0 || volume > 150) return message.channel.send({ embed: {
			description: `❌ | Volume must be more than or equal to 0 and less than or equal to 250!`,
			color: 0xff0000
		}});
        
        await client.player.setVolume(message.guild.id, volume);
        
        return message.channel.send({ embed: {
			description: `✅ | Volume set to **${volume}%**`,
			color: 0x3498db
		}});
    }
};