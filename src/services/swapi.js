const fetch = require('node-fetch');
const qs = require('querystring');

const { SWAPI_URL } = process.env;

async function getPlanetaFilmCount(planetaName) {
  const queryString = qs.stringify({ search: planetaName });

  const request = await fetch(`${SWAPI_URL}/planets?${queryString}`);

  const response = await request.json();

  // TODO: clean this hack
  if (!response.results[0]) {
    return undefined;
  }

  return response.results[0].films.length;
}

module.exports = { getPlanetaFilmCount };
