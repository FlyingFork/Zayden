module.exports = {
    command: "nsfw",
    callback: function (message, args) {
        message.channel.send("Please keep conversations and other non-nsfw content out of <#747428952577933424>, use <#787774961850646559> to converse about content a member posted here.");
    }
}