const { MessageEmbed } = require('discord.js');
const utils = require("../../utils.js");
const moment = require('moment');

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydney: 'Sydney',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = {
    command: "server",
    callback: (message) => {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;

        const embed = new MessageEmbed()
            .setDescription(`**Guild information for ${message.guild.name}**`)
            .setColor('#dc3545')
            .setThumbnail(message.guild.iconURL())
            .addField('General', [
                `**❯ Name:** ${message.guild.name}`,
                `**❯ Owner:** <@${message.guild.owner.user.id}>`,
                `**❯ Region:** ${regions[message.guild.region]}`,
                `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} (${moment(message.guild.createdTimestamp).fromNow()})`,
                '\u200b'
            ])
            .addField('Statistics', [
                `**❯ Role Count:** ${roles.length}`,
                `**❯ Member Count:** ${message.guild.memberCount}`,
                `**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
                `**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
                `**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
                `**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
                '\u200b'
            ])
            .addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? utils.trimArray(roles) : 'None')
            .setTimestamp();
            
        message.channel.send(embed);
    }
}