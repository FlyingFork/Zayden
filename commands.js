const blacklist = require("./blacklist");
const config = require("./config.json");
const utils = require("./utils.js");
const path = require("path");
const fs = require("fs");

var commands = [];
var int = 0;

module.exports = {
    readFiles: function(dir) {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                this.readFiles(path.join(dir, file));
            } else {
                const option = require(path.join(__dirname, dir, file));
                commands[`${option.command}`] = option;

                if (option.aliases) {
                    for (const alias of option.aliases) {
                        commands[`${alias.toLowerCase()}`] = option;
                    }
                }
                
                int = int + 1
            }
        }
    },

    execute: function (command, args, message, client, prefix) {
        const cmd = commands[command.toLowerCase()]

        if (blacklist.isBlacklisted(message.member.id)) {
            return false;
        }

        if (cmd.role && message.member.roles.highest.comparePositionTo(message.guild.roles.cache.find(role => role.name === cmd.role)) < 0) {
            return false;
        }

        if (cmd.minArgs && args.length < cmd.minArgs) {
            const help = require("./help.js");
            return help.showCommand(command, message, prefix);
        }

        if (cmd.maxArgs && args.length > cmd.maxArgs) {
            const help = require("./help.js");
            return help.showCommand(command, message, prefix);
        }
        
        // callback
        console.log(`Command ${command} executed!`)
        return cmd.callback(message, args, client, prefix);
    },  

    init: function (client) {
        this.readFiles("./commands");

        var isArray = Array.isArray(config.prefix);
        const prefix = config.prefix;

        client.on("message", (message) => {
            const content = message.content;
            if (isArray) {
                for (const str of prefix) {
                    if (str.length > 1 && utils.getWords(content) > 1) {
                        if (utils.getWord(content) === str && commands[utils.getWord(content, 1).toLowerCase()]) {
                            this.execute(utils.getWord(content, 1), content.split(" ").slice(2), message, client, utils.getWord(content, 0));
                        }
                    } else {
                        if (utils.firstLetter(content) === str && commands[utils.getWord(content).substring(1).toLowerCase()]) {
                            this.execute(utils.getWord(content).substring(1), content.split(" ").slice(1), message, client, utils.firstLetter(content));
                        }
                    }
                }
            } else {
                if (prefix.length > 1 && utils.getWords(content) > 1) {
                    if (utils.getWord(content) === prefix && commands[utils.getWord(content, 1).toLowerCase()]) {
                        this.execute(utils.getWord(content, 1), content.split(" ").slice(2), message, client, utils.getWord(content, 0));
                    }
                } else {
                    if (utils.firstLetter(content) === prefix && commands[utils.getWord(content).substring(1).toLowerCase()]) {
                        this.execute(utils.getWord(content).substring(1), content.split(" ").slice(1), message, client, utils.firstLetter(content));
                    }
                }
            }
        })
    },

    getSize: function () {
        return int;
    },

    returnCmds: function () {
        return commands;
    }
}