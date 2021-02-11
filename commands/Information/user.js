const { MessageEmbed } = require('discord.js');
const utils = require("../../utils.js");
const moment = require('moment');

function sendInfo(message, member) {
    const roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);
        
    const embed = new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor('#dc3545')
        .addField('User', [
            `**❯ Username:** ${member.user.username}#${member.user.discriminator}`,
            `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
            `**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')}, ${moment(member.user.createdTimestamp).fromNow()}`,
            `**❯ Status:** ${member.user.presence.status}`,
            `\u200b`
        ])
        .addField('Member', [
            `**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
            `**❯ Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
            `**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? utils.trimArray(roles) : 'None'}`,
            `\u200b`
        ])
        .setTimestamp();
        
    message.channel.send(embed);
}

module.exports = {
    syntax: "[user]",
    command: "user",
    maxArgs: 1,
    callback: function (message, args) {
        message.guild.members.fetch(`${args[0]}`)
            .then((member) => {
                sendInfo(message, member || message.member);
            })
            .catch(() => {
                const member = message.mentions.members.first();
                sendInfo(message, member || message.member);
            });
    }
}