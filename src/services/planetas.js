const Planeta = require('../db/planeta');
const ApiError = require('../ApiError');
const { getPlanetaFilmCount } = require('./swapi');

async function appendFilmCount(planeta) {
  return {
    ...planeta.toObject(),
    quantidadeFilmes: await getPlanetaFilmCount(planeta.nome),
  };
}

async function getPlanetas() {
  const planetas = await Planeta.find({}, 'nome clima terreno');

  return Promise.all(planetas.map(appendFilmCount));
}

function insertPlaneta(planetaData) {
  return Planeta.create(planetaData);
}

async function getPlanetaById(id) {
  const planeta = await Planeta.findById(id, 'nome clima terreno');

  if (!planeta) {
    throw new ApiError(404, 'Not found');
  }

  return appendFilmCount(planeta);
}

async function deletePlaneta(id) {
  const planeta = await Planeta.findByIdAndDelete(id);

  if (!planeta) {
    throw new ApiError(404, 'Not found');
  }
}

async function getPlanetaByNome(nome) {
  const planeta = await Planeta.findOne({ nome }, 'nome clima terreno');

  if (!planeta) {
    throw new ApiError(404, 'Not found');
  }

  return appendFilmCount(planeta);
}

module.exports = { getPlanetas, insertPlaneta, getPlanetaById, deletePlaneta, getPlanetaByNome };
