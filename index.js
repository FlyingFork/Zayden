const config = require("./config.json");
const Discord = require("discord.js");

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

// Modules
const suggestions = require("./suggestions.js");
const blacklist = require("./blacklist.js");
const database = require("./database.js");
const commands = require("./commands.js");
const events = require("./events.js");
const rules = require("./rules.js");

client.on("ready", async () => {
    console.log("Bot starting up");

    database.init();
    database.loadStructure();

    blacklist.init();
    events.init(client);
    commands.init(client);
    suggestions.init(client);
    rules.updateRules(client);
})

client.login(config.token);