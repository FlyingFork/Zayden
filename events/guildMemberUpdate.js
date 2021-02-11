const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

function logPatreon(client, member, role) {
    const embed = new MessageEmbed()
        .setTitle("New Patreon")
        .setColor(`${member.guild.roles.cache.get(`${role}`).hexColor}`)
        .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
        .setThumbnail("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8f5967b9-fc84-45f6-a9c3-3938bfba7232/dbujg26-4865d57d-8dcc-435c-ac6e-0d0590f9de37.png/v1/fill/w_1683,h_475,q_70,strp/patreon_logo_by_laprasking_dbujg26-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD01NzYiLCJwYXRoIjoiXC9mXC84ZjU5NjdiOS1mYzg0LTQ1ZjYtYTljMy0zOTM4YmZiYTcyMzJcL2RidWpnMjYtNDg2NWQ1N2QtOGRjYy00MzVjLWFjNmUtMGQwNTkwZjlkZTM3LnBuZyIsIndpZHRoIjoiPD0yMDQxIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.95jfkKc4e-WyhcxKoiDGebItWvxmMPadhqYsh7gIsnQ")
        .addField("Information", [
            `**❯ User:** <@${member.id}>`,
            `**❯ Amount:** $${config.patreon[role]}`,
            '\u200b'
        ])
        .setTimestamp();

    client.channels.cache.get(config.channels.patreon).send(embed);
}

function logRoleUpdate(client, newMember, oldMember, type) {
    if (type === 1) {
        const embed = new MessageEmbed()
            .setTitle("Member's roles have been updated!")
            .setThumbnail('https://images-ext-2.discordapp.net/external/QOCCliX2PNqo717REOwxtbvIrxVV2DZ1CRc8Svz3vUs/https/collegekingsgame.com/wp-content/uploads/2020/08/college-kings-wide-white.png?width=1440&height=566')
            .setFooter(newMember.guild.name, newMember.guild.iconURL({ dynamic: true }))
            .addField("User", `<@${newMember.id}>`, true)
            .setTimestamp();

        for (const role of newMember.roles.cache.map(x => x.id)) {
            if (!oldMember.roles.cache.has(role)) {
                if (config.patreon[role]) {
                    logPatreon(client, newMember, role); // log Patreon
                }

                embed.setColor(`${newMember.guild.roles.cache.get(`${role}`).hexColor}`);
                embed.addField(`Information:`, `**❯ Role: ** ✅ ${newMember.guild.roles.cache.get(role).name}`);
            }
        }

        client.channels.cache.get(config.channels.logs).send(embed);
    } else if (type === 2) {
        const embed = new MessageEmbed()
                .setTitle(`Member's roles have been updated!`)
                .setThumbnail("https://images-ext-2.discordapp.net/external/QOCCliX2PNqo717REOwxtbvIrxVV2DZ1CRc8Svz3vUs/https/collegekingsgame.com/wp-content/uploads/2020/08/college-kings-wide-white.png?width=1440&height=566")
                .setFooter(newMember.guild.name, newMember.guild.iconURL({ dynamic: true }))
                .addField("User", `<@${newMember.id}>`, false)
                .setTimestamp();

        for (const role of oldMember.roles.cache.map(x => x.id)) {
            if (!newMember.roles.cache.has(role)) {
                embed.setColor(`${newMember.guild.roles.cache.get(`${role}`).hexColor}`);
                embed.addField(`Information:`, `**❯ Role: ** ⛔ ${newMember.guild.roles.cache.get(role).name}`);
            }
        }

        client.channels.cache.get(config.channels.logs).send(embed);
    }
}

function logNickname(client, oldMember, newMember) {
    const embed = new MessageEmbed()
        .setTitle(`Member's nickname has been updated!`)
        .setColor("#dc3545")
        .setThumbnail("https://images-ext-2.discordapp.net/external/QOCCliX2PNqo717REOwxtbvIrxVV2DZ1CRc8Svz3vUs/https/collegekingsgame.com/wp-content/uploads/2020/08/college-kings-wide-white.png?width=1440&height=566")
        .setFooter(newMember.guild.name, newMember.guild.iconURL({ dynamic: true }))
        .addField("Old", `${oldMember.nickname || oldMember.displayName}`, true)
        .addField("New", `${newMember.nickname || newMember.displayName}`, true)
        .setTimestamp();

    client.channels.cache.get(config.channels.logs).send(embed);
}

module.exports = {
    callback: function (client) {
        client.on("guildMemberUpdate", (oldMember, newMember) => {
            // Role logging
            if (oldMember.roles.cache.size < newMember.roles.cache.size) {
                logRoleUpdate(client, newMember, oldMember, 1);
            } else if (oldMember.roles.cache.size > newMember.roles.cache.size) {
                logRoleUpdate(client, newMember, oldMember, 2);
            }

            // Nickname logging
            if (oldMember.nickname != newMember.nickname) {
                logNickname(client, oldMember, newMember);
            }
        })
    }
}