const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");
const mysql = require("../../database.js");

function notifyBan(member, id, message, reason, result) {
    if (member) {
        const embed = new MessageEmbed()
            .setTitle(`Notification from College Kings discord!`)
            .setDescription("You were banned from the server!")
            .setColor("#dc3545")
            .addField("Information",[
                `**❯ User:** <@${id}>`,
                `**❯ Admin:** <@${message.member.id}>`,
                `**❯ Reason:** ${reason}`,
                '\u200b'
            ])
            .setFooter(`Ban ID: ${result.insertId}`)
            .setTimestamp();

        member.send(embed);
    }
}

function banMember(message, member, args, client) {
    if (!member) {
        return message.reply("member wasn't found!");
    }

    const id = member.id;
    args.shift();
    const reason = args.join(" ");
    mysql.query(`INSERT INTO bans (discord, text) VALUES ('${id}', '${reason}');`, async (result) => {
        const channel = await client.channels.fetch(config.channels.logs);
        const embed = new MessageEmbed()
            .setTitle("A member was banned!")
            .setColor("#dc3545")
            .addField("Information",[
                `**❯ User:** <@${id}>`,
                `**❯ Admin:** <@${message.member.id}>`,
                `**❯ Reason:** ${reason}`,
                '\u200b'
            ])
            .setFooter(`Ban ID: ${result.insertId}`)
            .setTimestamp();

        channel.send(embed);
        member.ban({reason: reason});
        message.channel.send(`<@${id}> was banned!`);
        notifyBan(member, id, message, reason, result);
    })
}

module.exports = {
    description: "This command bans a player",
    syntax: "[user] [reason]",
    role: "Security",
    command: "ban",
    minArgs: 2,
    callback: function (message, args, client) {
        message.guild.members.fetch(`${args[0]}`)
            .then((member) => {
                banMember(message, member, args, client);
            })
            .catch(() => {
                const member = message.mentions.members.first();
                banMember(message, member, args, client);
            });
    }
}