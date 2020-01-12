const fetch = require('node-fetch');
const swapi = require('./swapi');

jest.mock('node-fetch', () => jest.fn());

describe('Star Wars API wrapper', () => {
  it('should return the amount of film appearances of a planet if it exists', async () => {
    fetch.mockImplementationOnce(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        results: [
          {
            films: ['https://swapi.co/api/films/6/', 'https://swapi.co/api/films/1/'],
          },
        ],
      }),
    }));

    expect(await swapi.getPlanetaFilmCount('Alderaan')).toEqual(2);
  });

  it('should return undefined if the planet does not exist', async () => {
    fetch.mockImplementationOnce(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        results: [],
      }),
    }));

    expect(await swapi.getPlanetaFilmCount('Alderaan')).toBeUndefined();
  });
});
