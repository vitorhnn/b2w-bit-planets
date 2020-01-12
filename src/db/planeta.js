const { Schema, model } = require('mongoose');

const planetaSchema = new Schema({
  nome: { type: String, index: true },
  clima: [String],
  terreno: [String],
});

const Planeta = model('Planeta', planetaSchema);

module.exports = Planeta;
