const config = require("./config.json");
const mysql = require("mysql");

var connection;

module.exports = {
    loadStructure: function () {
        const sqlTable = [
            'CREATE TABLE IF NOT EXISTS `blacklist` (`id` int(11) AUTO_INCREMENT, `discord` bigint(18) NOT NULL, PRIMARY KEY (id));',
            'CREATE TABLE IF NOT EXISTS `warns` (`id` int(11) AUTO_INCREMENT,`discord` bigint(18) NOT NULL,`text` longtext NOT NULL,`time` timestamp NOT NULL DEFAULT current_timestamp(), PRIMARY KEY (id));',
            'CREATE TABLE IF NOT EXISTS `kicks` (`id` int(11) AUTO_INCREMENT, `discord` bigint(18) NOT NULL, `text` longtext NOT NULL, `time` timestamp NOT NULL DEFAULT current_timestamp(), PRIMARY KEY (id));',
            'CREATE TABLE IF NOT EXISTS `mutes` (`id` int(11) AUTO_INCREMENT, `discord` bigint(18) NOT NULL, `text` longtext NOT NULL, `time` timestamp NOT NULL DEFAULT current_timestamp(), PRIMARY KEY (id));',
            'CREATE TABLE IF NOT EXISTS `notes` (`id` int(11) AUTO_INCREMENT, `discord` bigint(18) NOT NULL, `text` longtext NOT NULL, `time` timestamp NOT NULL DEFAULT current_timestamp(), PRIMARY KEY (id));',
            'CREATE TABLE IF NOT EXISTS `suggestions` (`id` int(11) AUTO_INCREMENT, `suggestion` longtext NOT NULL, `likes` bigint(11) NOT NULL DEFAULT 0, `dislikes` bigint(11) NOT NULL DEFAULT 0, `owner` bigint(18) NOT NULL, `message` bigint(18) NOT NULL, PRIMARY KEY (id));'
        ]

        var count = 1
        for (const sql of sqlTable) {
            this.query(`${sql}`, (result) => {
                if (result) {
                    count = count + 1
                }
            })
        }

        if (count === sqlTable.length) {
            console.log("MySQL Structure loaded succesfully!");
        }
    },

    init: function () {
        connection = mysql.createConnection({
            host: `${config.database.hostname}`,
            user: `${config.database.username}`,
            password: `${config.database.password}`,
            database: `${config.database.database}`
        });

        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connection to the database was established!");
        });
    },

    query: function (sql, callback) {
        connection.query(String(sql), function (err, result) {
            if (err) throw err;
            callback(result);
        });
    }
}