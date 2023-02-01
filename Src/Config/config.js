// configuration file
const dotenv = require('dotenv');

dotenv.config();

//Defining the Configurations using .env file and defining some options if incase the .env file is not defined or throws an error

const config = {
    dbUrl: process.env.DB_CONNECTION || "mongodb+srv://admin:thenura1@brainstorm-cluster.8pyaz7x.mongodb.net/test?retryWrites=true&w=majority",
    port: process.env.PORT || 5000,
    env: process.env.APP_ENV || "development",
    name: process.env.APP_NAME || "DLE Backend Server",
    url: process.env.APP_URL || "http://localhost:5500",
    logDir: process.env.LOG_DIR || "Logs",
    Access_Token_Secret: process.env.ACCESS_TOKEN_SECRET,
    Refresh_Token_Secret: process.env.REFRESH_TOKEN_SECRET
  };
  
  module.exports = config;