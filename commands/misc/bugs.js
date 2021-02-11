const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    description: "Here is a list of bugs from College Kings!",
    command: "bugs",
    callback: function (message, args) {
        var bugs = ""
        for (const [bug, value] of Object.entries(config.bugs)) {
            bugs = `${bugs}**❯ ${bug}:** ${value}\n`
        }

        const embed = new MessageEmbed()
            .setTitle("College Kings v0.7 Reported Bugs")
            .setColor("#dc3545")
            .addField("Information", bugs, false)
            .setThumbnail(message.guild.iconURL());

        message.channel.send(embed)
    }
}