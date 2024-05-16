module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "zay",
  //host: process.env.DB_HOSTNAME || "localhost",
  host: 'db',
  dialect: "mysql"
}
