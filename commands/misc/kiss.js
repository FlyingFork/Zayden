const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");

function kissMember(message, member) {
    if (!member) {
        return message.reply("member wasn't found!");
    }

    const embed = new MessageEmbed()
        .setTitle(`${message.author.username} kisses ${member.user.username}`)
        .setImage(config.kisses[Math.floor(Math.random() * config.kisses.length)])
        .setColor("#dc3545");
    message.channel.send(embed)
}

module.exports = {
    description: "This command kisses a player",
    syntax: "[user]",
    command: "kiss",
    minArgs: 1,
    callback: function (message, args) {
        message.guild.members.fetch(`${args[0]}`)
            .then((member) => {
                kissMember(message, member);
            })
            .catch(() => {
                const member = message.mentions.members.first();
                kissMember(message, member);
            });
    }
}