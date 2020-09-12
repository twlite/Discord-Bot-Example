const { Util } = require("discord.js");

module.exports = {
    help: {
        name: "play",
		description: "Play some music",
        aliases: ["p"],
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
        
        let query = args.join(" ");
        
        if (!query) return message.channel.send({ embed: {
            description: `❌ | Please provide a search query!`,
            color: 0xff0000
        }});
        
        let search = await client.player.searchTracks(query).catch(e => { 
            return message.channel.send({ embed: {
                description: `❌ | No results were found!`,
                color: 0xff0000
            }});
        });
        
        if (search.length < 1) return message.channel.send({ embed: {
            description: `❌ | No results were found!`,
            color: 0xff0000
        }});
        
        let track = search[0];
        
        if ((track.duration.split(":").length >= 3) && parseInt(track.duration.split(":")[0]) >= 3 && parseInt(track.duration.split(":")[2]) >= 1) return message.channel.send({ embed: {
            description: `❌ | Cannot play the songs that are longer than 3 hours.`,
            color: 0xff0000
        }});
        
        if (client.player.isPlaying(message.guild.id)) {
            
            let playing = await client.player.addToQueue(message.guild.id, track, message.author);
            
            return message.channel.send({ embed: {
                description: `🎵 | ${(!playing.description ? "Playlist **" + Util.escapeMarkdown(track.name) : "Song **" + Util.escapeMarkdown(track.name))}**  by **${Util.escapeMarkdown(track.author)}** - added to queue!`,
                color: 0x3498db
            }});
        } else {
            
            let playing = await client.player.play(message.member.voice.channel, track, message.author);
            
            return message.channel.send({ embed: {
                description: `🎵 | Now playing: ${(!playing.description ? "Playlist **" + Util.escapeMarkdown(track.name) : "Song **" + Util.escapeMarkdown(track.name))}** by **${Util.escapeMarkdown(track.author)}**`,
                color: 0x3498db
            }});
        }
    }
};