const mysql = require("mysql2/promise");
const { config } = require("./config");

let connection = null;

const connect = async () => {
  connection = await mysql.createConnection(config);
};

const disconnect = () => connection.end();

module.exports = {
  connect,
  disconnect,
  connection: () => connection
};
