const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");
const mysql = require("../../database.js");

function noteMember(message, member, args, client) {
    if (!member) {
        return message.reply("member wasn't found!");
    }

    const id = member.id;
    args.shift();
    const reason = args.join(" ")
    mysql.query(`INSERT INTO notes (discord, text) VALUES ('${id}', '${reason}');`, async (result) => {
        const channel = await client.channels.fetch(config.channels.logs);
        const embed = new MessageEmbed()
            .setTitle("Note added to member!")
            .setColor("#dc3545")
            .addField("Information",[
                `**❯ User:** <@${id}>`,
                `**❯ Admin:** <@${message.member.id}>`,
                `**❯ Note:** ${reason}`,
                '\u200b'
            ])
            .setFooter(`Note ID: ${result.insertId}`)
            .setTimestamp();

        channel.send(embed);
        message.channel.send(`Note added to <@${id}>!`);

    })
}

module.exports = {
    description: "This command adds a note to a player",
    syntax: "[user] [reason]",
    role: "Security",
    command: "note",
    minArgs: 2,
    callback: function (message, args, client) {
        message.guild.members.fetch(`${args[0]}`)
            .then((member) => {
                noteMember(message, member, args, client);
            })
            .catch(() => {
                const member = message.mentions.members.first();
                noteMember(message, member, args, client);
            });
    }
}