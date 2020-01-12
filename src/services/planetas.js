const { Planeta } = require('../db');
const ApiError = require('../ApiError');

function getPlanetas() {
  return Planeta.find({}, 'nome clima terreno');
}

async function insertPlaneta(planetaData) {
  const newPlaneta = await Planeta.create(planetaData);

  return newPlaneta.save();
}

async function getPlanetaById(id) {
  const planeta = await Planeta.findById(id, 'nome clima terreno');

  if (!planeta) {
    throw new ApiError(404, 'Not found');
  }

  return planeta;
}

async function deletePlaneta(id) {
  const planeta = await Planeta.findByIdAndDelete(id);

  if (!planeta) {
    throw new ApiError(404, 'Not found');
  }

  return planeta;
}

async function getPlanetaByNome(nome) {
  const planeta = await Planeta.findOne({ nome });

  if (!planeta) {
    throw new ApiError(404, 'Not found');
  }

  return planeta;
}

module.exports = { getPlanetas, insertPlaneta, getPlanetaById, deletePlaneta, getPlanetaByNome };
