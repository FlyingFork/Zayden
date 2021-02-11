const { MessageEmbed } = require('discord.js');
const config = require("../config.json");
const mysql = require("../database.js");

module.exports = {
    description: `This command adds a description to <#${config.channels.suggestions}>`,
    syntax: "[suggestion]",
    command: "suggest",
    minArgs: 1,
    callback: async function (message, args, client) {
        const channel = await client.channels.fetch(config.channels.suggestions);
        const msg = await channel.send("Loading suggestion...");
        msg.react('👍')
            .then(() => {
                msg.react('👎')
                    .then(() => {   
                        const owner = message.member.id;
                        const suggestion = args.join(" ");

                        mysql.query(`INSERT INTO suggestions (suggestion, owner, message) VALUES ('${suggestion}', '${owner}', '${msg.id}');`, (result) => {
                            const embed = new MessageEmbed()
                                .setTitle(`Suggestion`)
                                .setColor(`#dc3545`)
                                .addField(`Information`, [
                                    `**❯ User:** <@${owner}>`,
                                    `**❯ Suggestion:** ${suggestion}`,
                                    '\u200b'
                                ])
                                .setFooter(`Sugeestion ID: ${result.insertId}`)
                                .setTimestamp();
                            msg.edit("", embed);
                            message.channel.send(`Your suggestion has been added to <#${config.channels.suggestions}>!`);
                        })
                    })
                    .catch(() => {
                        msg.edit("An error occured while loading the suggestion, please contact FlyingFork (ERROR #0002)");
                    });
            })
            .catch(() => {
                msg.edit("An error occured while loading the suggestion, please contact FlyingFork (ERROR #0001)");
            });
    }
}