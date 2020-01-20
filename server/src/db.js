const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database(
    process.env.DB_NAME,
    sqlite3.OPEN_READWRITE,
    (err) => console.log(err ? err.message : `Connected to [${process.env.DB_NAME}] SQlite database.`)
);

module.exports.database = database;
