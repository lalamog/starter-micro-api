const sql = require("mysql2");
const dotenv = require("dotenv").config();
const db1 = sql.createConnection({
    host: process.env.DATABASE_HOST1,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE1
})
 
module.exports = db1;