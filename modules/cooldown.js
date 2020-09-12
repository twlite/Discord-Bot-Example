const Discord = require('discord.js');

module.exports = (client, guildConf, message) => {

    client.addCooldown = (userid, command, time) => {

        let cooldowns = client.userDB.get(userid, "cooldowns")

        function set(path, value) {
            let pList = path.split('.');
            let len = pList.length;
            for (let i = 0; i < len-1; i++) {
                let elem = pList[i];
                if ( !cooldowns[elem] ) cooldowns[elem] = {}
                cooldowns = cooldowns[elem];
            }
            cooldowns[pList[len-1]] = value;
        }

        set(command, Date.now()+(time*1000));
        client.userDB.set(userid, "cooldowns", cooldowns);

    }

    client.hasCooldown = (userid, command) => {

        if (client.isOwner(userid)) { return false; }

        let cooldowns = client.userDB.get(userid, "cooldowns")

        if (cooldowns[command] === undefined) { return false; }

        if (Date.now() > cooldowns[command]) {
            delete cooldowns[command];
            client.userDB.set(userid, "cooldowns", cooldowns);
            return false;
        }

        return true;
    }

    client.resetCooldown = (userid, command) => {

        let cooldowns = client.userDB.get(userid, "cooldowns")

        delete cooldowns[command];

        client.userDB.set(userid, "cooldowns", cooldowns);

    }

    client.resetCooldowns = (userid) => {

        //TODO

    }


}