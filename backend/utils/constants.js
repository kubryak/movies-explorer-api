const regexImageLink = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/;

const DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  regexImageLink,
  DB_URL,
};
