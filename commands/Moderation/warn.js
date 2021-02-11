const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");
const mysql = require("../../database.js");

function notifyWarn(member, id, message, reason, result) {
    if (member) {
        const embed = new MessageEmbed()
            .setTitle(`Notification from College Kings discord!`)
            .setDescription("You've received a warning!")
            .setColor("#dc3545")
            .addField("Information",[
                `**❯ User:** <@${id}>`,
                `**❯ Admin:** <@${message.member.id}>`,
                `**❯ Reason:** ${reason}`,
                '\u200b'
            ])
            .setFooter(`Warn ID: ${result.insertId}`)
            .setTimestamp();

        member.send(embed);
    }
}

function warnMember(message, member, args, client) {
    if (!member) {
        return message.reply("member wasn't found!");
    }

    const id = member.id;
    args.shift();
    const reason = args.join(" ")
    mysql.query(`INSERT INTO warns (discord, text) VALUES ('${id}', '${reason}');`, async (result) => {
        const channel = await client.channels.fetch(config.channels.logs);
        const embed = new MessageEmbed()
            .setTitle("A member has been warned!")
            .setColor("#dc3545")
            .addField("Information",[
                `**❯ User:** <@${id}>`,
                `**❯ Admin:** <@${message.member.id}>`,
                `**❯ Reason:** ${reason}`,
                '\u200b'
            ])
            .setFooter(`Warning ID: ${result.insertId}`)
            .setTimestamp();

        channel.send(embed);
        message.channel.send(`You've warned <@${id}> succesfully!`);
        notifyWarn(member, id, message, reason, result);
    })
}

module.exports = {
    description: "This command warns a player",
    syntax: "[user] [reason]",
    role: "Security",
    command: "warn",
    minArgs: 2,
    callback: function (message, args, client) {
        message.guild.members.fetch(`${args[0]}`)
            .then((member) => {
                warnMember(message, member, args, client);
            })
            .catch(() => {
                const member = message.mentions.members.first();
                warnMember(message, member, args, client);
            });
    }
}