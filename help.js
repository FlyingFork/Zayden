const { MessageEmbed } = require("discord.js");
const cmds = require("./commands.js");

var list = cmds.returnCmds();

module.exports = {
    showCommand: function (command, message, prefix) {
        if (list[command]) {
            var args = "";
            if (list[command].syntax) {
                args = list[command].syntax;
            }

            var pre = "";
            if (prefix.length > 1) {
                pre = `${prefix} `;
            } else {
                pre = prefix;
            }

            const embed = new MessageEmbed()
                .setTitle("Syntax")
                .setColor("#dc3545")
                .setTimestamp();

            if (!list[command].description) {
                embed.addField("Information",[
                    `**❯ Command:** ${pre}${command} ${args}`,
                    '\u200b'
                ]);
            } else {
                embed.addField("Information",[
                    `**❯ Command:** ${pre}${command} ${args}`,
                    `**❯ Description:** ${list[command].description}`,
                    '\u200b'
                ]);
            }

            message.channel.send(embed);
        } else {
            message.channel.send("Syntax of command wasn't found!");
        } 
    },

    full: function (message, prefix) {
        var pre = "";
        if (prefix.length > 1) {
            pre = `${prefix} `;
        } else {
            pre = prefix;
        }

        var cmds = "";

        for (let [key, cmd] of Object.entries(list)) {
            var args = "";
            if (cmd.syntax) {
                args = cmd.syntax;
            }

            cmds = `${cmds}**${pre}${cmd.command}** ${args}\n`;
        }

        const embed = new MessageEmbed()
            .setTitle("Zayden commands")
            .setColor("#dc3545")
            .addField("❯ Commands", cmds, false)
            .setTimestamp();

        message.author.send(embed)
            .then(() => {
                message.reply("You have received the list of commands in DMs!");
            });
    }
}