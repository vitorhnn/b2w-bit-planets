const { connect, connection, model, Schema } = require('mongoose');

const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_PORT } = process.env;

connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}`, {
  useNewUrlParser: true,
});

connection.on('error', () => console.error('mongoose connection error'));
connection.once('open', () => console.log('mongoose connection open'));

const planetSchema = new Schema({
  nome: String,
  clima: String,
  terreno: String,
});

const Planet = model('Planet', planetSchema);

module.exports = { Planet };
