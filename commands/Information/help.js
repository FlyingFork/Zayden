const help = require("../../help.js");

module.exports = {
    syntax: "[command]",
    command: "help",
    maxArgs: 1,
    callback: async (message, args, client, prefix) => {
        if (args[0]) {
            help.showCommand(args[0], message, prefix);
        } else {
            help.full(message, prefix);
        }
    }
}