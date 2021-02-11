const { MessageEmbed } = require("discord.js");
const config = require("./config.json");

module.exports = {
    showRule: function(message, rule) {

    },

    showRules: function(message) {
        var rules = "";
        for (const [id, rule] of Object.entries(config.rules)) {
            if (!rule[1]) {
                rules = `${rules}**${id}.**${rule[0]}\n\n`;
            }
        }

        const embed = new MessageEmbed();
        embed.setImage("https://media.discordapp.net/attachments/769943204673486858/787791290514538516/CollegeKingsTopBanner.jpg?width=1440&height=360");
        embed.setThumbnail("https://images-ext-2.discordapp.net/external/QOCCliX2PNqo717REOwxtbvIrxVV2DZ1CRc8Svz3vUs/https/collegekingsgame.com/wp-content/uploads/2020/08/college-kings-wide-white.png?width=1440&height=566");
        embed.setTitle("𝒞𝑜𝓁𝓁𝑒𝑔𝑒 𝒦𝒾𝓃𝑔𝓈 𝒪𝒻𝒻𝒾𝒸𝒾𝒶𝓁 𝒮𝑒𝓇𝓋𝑒𝓇\n\n__**ꜱᴇʀᴠᴇʀ ʀᴜʟᴇꜱ**__");
        embed.setDescription(rules);
        embed.setColor("#dc3545");
        embed.setTimestamp();

        message.channel.send(embed);
    },

    updateRules: async function(client) {
        const channel = await client.channels.fetch(config.channels.rules);

        var rules = "";
        for (const [id, rule] of Object.entries(config.rules)) {
            if (!rule[1]) {
                rules = `${rules}**${id}.**${rule[0]}\n\n`;
            }
        }

        const embed = new MessageEmbed();
        embed.setImage("https://media.discordapp.net/attachments/769943204673486858/787791290514538516/CollegeKingsTopBanner.jpg?width=1440&height=360");
        embed.setThumbnail("https://images-ext-2.discordapp.net/external/QOCCliX2PNqo717REOwxtbvIrxVV2DZ1CRc8Svz3vUs/https/collegekingsgame.com/wp-content/uploads/2020/08/college-kings-wide-white.png?width=1440&height=566");
        embed.setTitle("𝒞𝑜𝓁𝓁𝑒𝑔𝑒 𝒦𝒾𝓃𝑔𝓈 𝒪𝒻𝒻𝒾𝒸𝒾𝒶𝓁 𝒮𝑒𝓇𝓋𝑒𝓇\n\n__**ꜱᴇʀᴠᴇʀ ʀᴜʟᴇꜱ**__");
        embed.setDescription(rules);
        embed.setColor("#dc3545");
        embed.setTimestamp();

        console.log("Rules channel has been updated!");
        channel.messages.fetch(config.messages.rules).then((message) => { message.edit("", {embed: embed})})
    }
}