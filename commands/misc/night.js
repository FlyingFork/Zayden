const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    command: "gn",
    aliases: ["goodnight"],
    callback: function (message, args) {
        let member = message.author.username
        if (args[0]) { member = message.mentions.members.first().user.username }
        const image = Math.floor(Math.random() * config.night.length)
        const embed = new MessageEmbed()
            .setTitle(`Good Night, ${member}!`)
            .setColor("#dc3545")
            .setImage(config.night[image]);

        message.channel.send(embed)
    }
}