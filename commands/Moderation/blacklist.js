const { MessageEmbed } = require('discord.js');
const blacklist = require("../../blacklist.js");
const config = require("../../config.json");

function notifyBlacklist(member, id, message) {
    if (member) {
        const embed = new MessageEmbed()
            .setTitle(`Notification from College Kings discord!`)
            .setDescription("You were blacklisted from the server!")
            .setColor("#dc3545")
            .addField("Information",[
                `**❯ User:** <@${id}>`,
                `**❯ Admin:** <@${message.member.id}>`,
                '\u200b'
            ])
            .setTimestamp();

        member.send(embed);
    }
}

function notifyRemoveBlacklist(member, id, message) {
    if (member) {
        const embed = new MessageEmbed()
            .setTitle(`Notification from College Kings discord!`)
            .setDescription("You're blacklist has been removed!")
            .setColor("#dc3545")
            .addField("Information",[
                `**❯ User:** <@${id}>`,
                `**❯ Admin:** <@${message.member.id}>`,
                '\u200b'
            ])
            .setTimestamp();

        member.send(embed);
    }
}

function blacklistMember(message, member, args, client) {
    if (!member) {
        return message.reply("member wasn't found!");
    }

    const id = member.id;
    if (!blacklist.isBlacklisted(id)) {
        // blacklisted
        blacklist.add(id, async (result) => {
            if (result) {
                // succeded
                message.reply("the member is now blacklisted!");
                const channel = await client.channels.fetch(config.channels.logs);
                const embed = new MessageEmbed()
                    .setTitle("A member was blacklisted!")
                    .setColor("#dc3545")
                    .addField("Information",[
                        `**❯ User:** <@${id}>`,
                        `**❯ Admin:** <@${message.member.id}>`,
                        '\u200b'
                    ])
                    .setTimestamp();

                channel.send(embed);
                notifyBlacklist(member, id, message);
            } else {
                // failed
                message.reply("failed to blacklist the user!");
            }
        });
    } else {
        // not blacklisted
        blacklist.remove(id, async (result) => {
            if (result) {
                // succeded
                message.reply("the blacklist from the user has been removed!");
                const channel = await client.channels.fetch(config.channels.logs);
                const embed = new MessageEmbed()
                    .setTitle("A member's blacklist has been removed!")
                    .setColor("#dc3545")
                    .addField("Information",[
                        `**❯ User:** <@${id}>`,
                        `**❯ Admin:** <@${message.member.id}>`,
                        '\u200b'
                    ])
                    .setTimestamp();

                channel.send(embed);
                notifyRemoveBlacklist(member, id, message);
            } else {
                // failed
                message.reply("failed to remove blacklist from the user!");
            }
        });
    }
}

module.exports = {
    description: "This command blacklists a player",
    syntax: "[user]",
    role: "Security",
    command: "blacklist",
    minArgs: 1,
    callback: function (message, args, client) {
        message.guild.members.fetch(`${args[0]}`)
            .then((member) => {
                blacklistMember(message, member, args, client);
            })
            .catch(() => {
                const member = message.mentions.members.first();
                blacklistMember(message, member, args, client);
            });
    }
}