const { MessageEmbed, version: djsversion } = require("discord.js");
const commands = require("../../commands.js");
const utils = require("../../utils.js");
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

module.exports = {
    command: "bot",
    role: "Security",
    callback: (message, args, client) => {
        const core = os.cpus()[0];
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor("#dc3545")
            .addField('General', [
				`**❯ Commands:** ${commands.getSize()}`,
				`**❯ Users:** ${message.guild.memberCount}`,
				`**❯ Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**❯ Node.js:** ${process.version}`,
				`**❯ Version:** v2.0`,
				`**❯ Discord.js:** v${djsversion}`,
				'\u200b'
			])
			.addField('System', [
				`**❯ Platform:** ${process.platform}`,
				`**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**❯ CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
				`**❯ Memory:**`,
				`\u3000 Total: ${utils.formatBytes(process.memoryUsage().heapTotal)}`,
				`\u3000 Used: ${utils.formatBytes(process.memoryUsage().heapUsed)}`
			])
            .setTimestamp();

        message.channel.send(embed);
    }
}