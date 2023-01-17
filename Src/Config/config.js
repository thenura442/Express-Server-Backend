// configuration file
const dotenv = require('dotenv');
dotenv.config();

const config = {
    dbUrl: process.env.DB_CONNECTION || "mongodb+srv://admin:thenura1@brainstorm-cluster.8pyaz7x.mongodb.net/test?retryWrites=true&w=majority",
    port: process.env.PORT || 5000,
    env: process.env.APP_ENV || "development",
    name: process.env.APP_NAME || "DLE Backend Server",
    url: process.env.APP_URL || "http://localhost:",
    logDir: process.env.LOGDIR || "Logs",
    viewEngine: process.env.VIEW_ENGINE || "html"
  };
  
  module.exports = config;