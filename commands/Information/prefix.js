const { MessageEmbed, Message } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    command: "prefix",
    role: "Security",
    callback: async (message, args, client, prefix) => {
        if (Array.isArray(config.prefix)) {
            var prefixs = "";
            var id = 0;
            
            for (const prefix of config.prefix) {
                if (id === 0) {
                    prefixs = `${prefix}`
                    id = id + 1;
                } else {
                    prefixs = `${prefixs}, ${prefix}`
                    id = id + 1;
                }
            }

            const embed = new MessageEmbed()
                .setTitle("Prefix list")
                .setColor("#dc3545")
                .addField("Prefixes", `${prefixs}`, false)
                .setTimestamp();

            message.channel.send(embed);
        } else {
            message.channel.send(`The prefix of the bot is ${config.prefix}`);
        }
    }
}