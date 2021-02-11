const path = require("path");
const fs = require("fs");

var events = [];

module.exports = {
    readFiles: function(dir) {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                this.readFiles(path.join(dir, file));
            } else {
                const option = require(path.join(__dirname, dir, file));
                events.push(option);
            }
        }
    },

    init: function(client) {
        this.readFiles("./events");

        for (const [key, event] of Object.entries(events)) {
            event.callback(client);
        }
    }
}