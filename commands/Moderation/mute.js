const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");
const mysql = require("../../database.js");

function notifyMute(member, id, message, reason, result) {
    if (member) {
        const embed = new MessageEmbed()
            .setTitle(`Notification from College Kings discord!`)
            .setDescription("You were muted from the server!")
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

function muteMember(message, member, args, client) {
    if (!member) {
        return message.reply("member wasn't found!");
    }

    const id = member.id;
    args.shift();
    const reason = args.join(" ")
    mysql.query(`INSERT INTO mutes (discord, text) VALUES ('${id}', '${reason}');`, async (result) => {
        const channel = await client.channels.fetch(config.channels.logs);
        const embed = new MessageEmbed()
            .setTitle("A member was muted!")
            .setColor("#dc3545")
            .addField("Information",[
                `**❯ User:** <@${id}>`,
                `**❯ Admin:** <@${message.member.id}>`,
                `**❯ Reason:** ${reason}`,
                '\u200b'
            ])
            .setFooter(`Mute ID: ${result.insertId}`)
            .setTimestamp();

        // give mute rank
        channel.send(embed);
        message.channel.send(`<@${id}> was muted!`);
        notifyMute(member, id, message, reason, result);
    })
}

module.exports = {
    description: "This command mutes a player",
    syntax: "[user] [reason]",
    role: "Security",
    command: "mute",
    minArgs: 2,
    callback: function (message, args, client) {
        message.guild.members.fetch(`${args[0]}`)
            .then((member) => {
                muteMember(message, member, args, client);
            })
            .catch(() => {
                const member = message.mentions.members.first();
                muteMember(message, member, args, client);
            });
    }
}