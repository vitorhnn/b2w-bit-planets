const { connect, connection } = require('mongoose');

const { DB_STRING } = process.env;

connect(DB_STRING, {
  useNewUrlParser: true,
});

connection.on('error', () => console.error('mongoose connection error'));
connection.once('open', () => console.log('mongoose connection open'));
