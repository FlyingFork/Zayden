const ms = require('ms');

module.exports = {
    command: "uptime",
    callback: (message, args, client) => {
        message.channel.send(`My uptime is \`${ms(client.uptime, { long: true })}\``);
    }
}