const versedb = require("verse.db");
const { BlogDB } = require("./connection.json");

const db = new versedb.connect(BlogDB);

module.exports.db = db;