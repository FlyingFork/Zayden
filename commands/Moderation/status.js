
module.exports = {
    syntax: "[status]",
    command: "status",
    role: "Security",
    callback: async (message, args, client, prefix) => {
        if (args[0]) {
            client.user.setActivity(args.join(" "), {type: "PLAYING"});
            message.channel.send(`Bot status changed to ${args.join(" ")}`);
        } else {
            client.user.setActivity("", {type: "PLAYING"});
            message.channel.send(`Bot status cleared!`);
        }
    }
}