module.exports = {
    help: {
        name: "lyrics",
		description: "Get the lyrics of any song",
        aliases: ["l"],
		category: "Music"
    },

run: async (client, message, args) => {

        if (!args.length) return message.channel.send({ embed: {
            description: `❌ | Please provide a search query!`,
            color: 0xff0000
        }});

        const Genius = new (require("genius-lyrics")).Client(client.GENIUS);

        Genius.tracks
            .search(`${args.join(" ")}`, { limit: 1 })
            .then(results => {
                if (!results || !results[0])
                    return message.channel.send({ embed: {
                        description: `❌ No Lyrics was found.`,
                        color: 0xff0000
                    }});

                const song = results[0];
                song.lyrics().then(lyrics => {
                    if (!lyrics) return message.channel.send("❌ No Lyrics was found.");
                    message.channel.send(lyrics, { code: true, split: true });
                });
            }).catch(e => {
                return message.channel.send({ embed: {
                    description: `❌ No Lyrics was found.`,
                    color: 0xff0000
                }});
            });
    }
};