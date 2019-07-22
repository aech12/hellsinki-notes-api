require('dotenv').config();
const { info: logInfo, error: logError } = require('./logger');

let DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3002;

if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.DB_URL_TEST;
}

module.exports = {
  DB_URL,
  PORT
};
