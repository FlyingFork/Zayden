
function historyMember(message, member, args, client) {
    if (!member) {
        return message.reply("member wasn't found!");
    }

    message.author.send(`History for <@${member.id}>\nhttps://flyingfork.tk/projects/Zayden/account/?id=${member.id}`)
        .then(() => {
            message.reply("link to member's history sent in DMs!");
        });
}

module.exports = {
    syntax: "[user]",
    command: "history",
    minArgs: 1,
    callback: async (message, args, client, prefix) => {
        message.guild.members.fetch(`${args[0]}`)
            .then((member) => {
                historyMember(message, member, args, client);
            })
            .catch(() => {
                const member = message.mentions.members.first();
                historyMember(message, member, args, client);
            });
    }
}