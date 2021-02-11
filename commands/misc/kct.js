const { MessageEmbed } = require("discord.js");

module.exports = {
    command: "kct",
    aliases: "plc",
    callback: function (message, args) {
        const embed = new MessageEmbed()
        .addFields(
            { name: "Popular", value: `✅ Bro\n✅ Trouble Maker\n❌ Boyfriend`, inline: true },
            { name: "Loyal", value: `✅ Bro\n✅ Boyfriend\n❌ Trouble Maker`, inline: true },
            { name: "Confident", value: `✅ Boyfriend\n✅ Trouble Maker\n❌ Bro`, inline: true },
        )
        .setColor("#dc3545")
        .setThumbnail("https://images-ext-2.discordapp.net/external/QOCCliX2PNqo717REOwxtbvIrxVV2DZ1CRc8Svz3vUs/https/collegekingsgame.com/wp-content/uploads/2020/08/college-kings-wide-white.png?width=1440&height=566")

        message.channel.send(embed);
    }
}