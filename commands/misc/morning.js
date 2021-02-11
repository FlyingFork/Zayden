const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    command: "gm",
    aliases: ["goodmorning"],
    callback: function (message, args) {
        let member = message.author.username
        if (args[0]) { member = message.mentions.members.first().user.username }
        const image = Math.floor(Math.random() * config.morning.length)
        const embed = new MessageEmbed()
            .setTitle(`Good Morning, ${member}!`)
            .setColor("#dc3545")
            .setImage(config.morning[image]);

        message.channel.send(embed)
    }
}