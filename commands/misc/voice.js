
module.exports = {
    description: "This command connects the bot to a voice channel",
    role: "Security",
    command: "join",
    callback: function (message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply("you have to be in a voice channel!");
        } else {
            voiceChannel.join().then((connection) => {
                message.reply("i joined the channel!");
            }).catch(e => {
                console.log(e);
                message.reply("an error occured!");
            });
        }
    }
}