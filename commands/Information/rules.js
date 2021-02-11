const rules = require("../../rules.js");

module.exports = {
    command: "rules",
    callback: async (message, args, client, prefix) => {
        rules.showRules(message);
    }
}