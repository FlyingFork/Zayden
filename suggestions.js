const config = require("./config.json");
const mysql = require("./database.js");

module.exports = {
    init: function(client) {
        client.on("messageReactionAdd", (messageReaction, user) => {
            const message = messageReaction.message;
            if (message.channel.id === config.channels.suggestions && !user.bot) {
                if (messageReaction.emoji.name === "👍") {
                    mysql.query(`SELECT likes, id FROM suggestions WHERE message = '${message.id}' LIMIT 1;`, (result) => {
                        mysql.query(`UPDATE suggestions SET likes = '${result[0].likes+1}' WHERE message = '${message.id}'`, (result2) => {
                            console.log(`Zayden suggestions -> User ${user.id} liked suggestion with ID ${result[0].id}!`);
                        })
                    })
                } else if (messageReaction.emoji.name === "👎") {
                    mysql.query(`SELECT dislikes, id FROM suggestions WHERE message = '${message.id}' LIMIT 1;`, (result) => {
                        mysql.query(`UPDATE suggestions SET dislikes = '${result[0].dislikes+1}' WHERE message = '${message.id}'`, (result2) => {
                            console.log(`Zayden suggestions -> User ${user.id} disliked suggestion with ID ${result[0].id}!`);
                        })
                    })
                }
            }
        });

        client.on("messageReactionRemove", (messageReaction, user) => {
            const message = messageReaction.message;
            if (message.channel.id === config.channels.suggestions && !user.bot) {
                if (messageReaction.emoji.name === "👍") {
                    mysql.query(`SELECT likes, id FROM suggestions WHERE message = '${message.id}' LIMIT 1;`, (result) => {
                        mysql.query(`UPDATE suggestions SET likes = '${result[0].likes-1}' WHERE message = '${message.id}'`, (result2) => {
                            console.log(`Zayden suggestions -> User ${user.id} removed like from suggestion with ID ${result[0].id}!`);
                        })
                    })
                } else if (messageReaction.emoji.name === "👎") {
                    mysql.query(`SELECT dislikes, id FROM suggestions WHERE message = '${message.id}' LIMIT 1;`, (result) => {
                        mysql.query(`UPDATE suggestions SET dislikes = '${result[0].dislikes-1}' WHERE message = '${message.id}'`, (result2) => {
                            console.log(`Zayden suggestions -> User ${user.id} removed dislike from suggestion with ID ${result[0].id}!`);
                        })
                    })
                }
            }
        });
    }
}