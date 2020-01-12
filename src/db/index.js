const { connect, connection, model, Schema } = require('mongoose');

const { DB_STRING } = process.env;

connect(DB_STRING, {
  useNewUrlParser: true,
});

connection.on('error', () => console.error('mongoose connection error'));
connection.once('open', () => console.log('mongoose connection open'));

const planetaSchema = new Schema({
  nome: { type: String, index: true },
  clima: [String],
  terreno: [String],
});

const Planeta = model('Planeta', planetaSchema);

module.exports = { Planeta };
