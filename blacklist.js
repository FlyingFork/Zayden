const config = require("./config.json");
const mysql = require("./database.js");

var blacklist = [];

module.exports = {
    init: function() {
        mysql.query("SELECT * FROM blacklist ORDER BY id DESC;", (result) => {
            for (const row of result) {
                blacklist.push(row['discord']);
            }
        })
    },

    isBlacklisted: function(id) {
        return blacklist.includes(id);
    },

    add: function(id, callback) {
        if (config.users.includes(id)) {
            callback(false);
            return false;
        }

        mysql.query(`INSERT INTO blacklist (id, discord) VALUES (NULL, '${id}')`, (result) => {
            if (result) {
                blacklist.push(id);
                callback(true);
                return true;
            } else {
                callback(false);
                return false;
            }
        })
    },

    remove: function(id, callback) {
        if (config.users.includes(id)) {
            callback(false);
            return false;
        }

        mysql.query(`DELETE FROM blacklist WHERE discord = '${id}'`, (result) => {
            if (result) {
                blacklist.splice(blacklist.indexOf(id), 1);
                callback(true);
                return true;
            } else {
                callback(false);
                return false;
            }
        })
    }
}