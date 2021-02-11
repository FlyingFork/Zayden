const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");
const mysql = require("../../database.js");

function notifyKick(member, id, message, reason, result) {
    if (member) {
        const embed = new MessageEmbed()
            .setTitle(`Notification from College Kings discord!`)
            .setDescription("You were kicked from the server!")
            .setColor("#dc3545")
            .addField("Information",[
                `**❯ User:** <@${id}>`,
                `**❯ Admin:** <@${message.member.id}>`,
                `**❯ Reason:** ${reason}`,
                '\u200b'
            ])
            .setFooter(`Kick ID: ${result.insertId}`)
            .setTimestamp();

        member.send(embed);
    }
}

function kickMember(message, member, args, client) {
    if (!member) {
        return message.reply("member wasn't found!");
    }

    const id = member.id;
    args.shift();
    const reason = args.join(" ")
    mysql.query(`INSERT INTO kicks (discord, text) VALUES ('${id}', '${reason}');`, async (result) => {
        const channel = await client.channels.fetch(config.channels.logs);
        const embed = new MessageEmbed()
            .setTitle("A member was kicked!")
            .setColor("#dc3545")
            .addField("Information",[
                `**❯ User:** <@${id}>`,
                `**❯ Admin:** <@${message.member.id}>`,
                `**❯ Reason:** ${reason}`,
                '\u200b'
            ])
            .setFooter(`Kick ID: ${result.insertId}`)
            .setTimestamp();

        member.kick(reason);  
        channel.send(embed);
        message.channel.send(`<@${id}> was kicked!`);
        notifyKick(member, id, message, reason, result);
    })
}

module.exports = {
    description: "This command kicks a player",
    syntax: "[user] [reason]",
    role: "Security",
    command: "kick",
    minArgs: 2,
    callback: function (message, args, client) {
        message.guild.members.fetch(`${args[0]}`)
            .then((member) => {
                kickMember(message, member, args, client);
            })
            .catch(() => {
                const member = message.mentions.members.first();
                kickMember(message, member, args, client);
            });
    }
}