
module.exports = {
    command: "ping",
    aliases: ["p"],
    callback: async (message, args, client, prefix) => {
        const msg = await message.channel.send("Pinging...");

		msg.edit(`API Latency: \`${Math.round(client.ws.ping)}ms\``);
    }
}