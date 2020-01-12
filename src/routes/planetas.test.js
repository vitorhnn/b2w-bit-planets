const request = require('supertest');
const app = require('../server');
const service = require('../services/planetas');
const ApiError = require('../ApiError');

jest.mock('../services/planetas', () => ({
  getPlanetas: jest.fn(),
  insertPlaneta: jest.fn(),
  getPlanetaById: jest.fn(),
  deletePlaneta: jest.fn(),
  getPlanetaByNome: jest.fn(),
}));

describe('planetas router', () => {
  const alderaan = {
    nome: 'Alderaan',
    terreno: ['Pradaria', 'Montanhas'],
    clima: ['Temperado'],
    quantidadeFilmes: 2,
  };

  describe('GET /planetas', () => {
    it('should return 200 and a list of planets', async () => {
      const fakeData = [alderaan];

      service.getPlanetas.mockResolvedValueOnce(fakeData);

      const response = await request(app).get('/planetas');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toMatchObject(fakeData);
    });

    it('should passthrough api errors', async () => {
      service.getPlanetas.mockImplementationOnce(async () => {
        throw new ApiError(418, "I'm a teapot");
      });

      const response = await request(app).get('/planetas');

      expect(response.statusCode).toEqual(418);
      expect(response.body).toMatchObject({ error: "I'm a teapot" });
    });

    it('should return 500 for unexpected errors', async () => {
      service.getPlanetas.mockImplementationOnce(async () => {
        throw new Error('boom');
      });

      const response = await request(app).get('/planetas');

      expect(response.statusCode).toEqual(500);
      expect(response.body).toMatchObject({ error: 'Internal server error' });
    });
  });

  describe('POST /planetas', () => {
    it('should return 201 and the return value of insertPlaneta', async () => {
      const fakeData = { nome: 'O vazio do espaço', clima: ['Frio'], terreno: ['Vazio'] };
      service.insertPlaneta.mockResolvedValueOnce(fakeData);

      const response = await request(app)
        .post('/planetas')
        .send(alderaan);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toMatchObject(fakeData);
    });
  });

  describe('GET /planeta/:id', () => {
    it('should return 200 and planet data', async () => {
      service.getPlanetaById.mockResolvedValueOnce(alderaan);

      const response = await request(app).get('/planetas/idalderaan');

      expect(service.getPlanetaById).toBeCalledWith('idalderaan');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toMatchObject(alderaan);
    });
  });

  describe('DELETE /planeta/:id', async () => {
    it('should return 200 and nothing else', async () => {
      service.deletePlaneta.mockImplementationOnce(async () => {});

      const response = await request(app).delete('/planetas/qualquer coisa');

      expect(service.deletePlaneta).toBeCalledWith('qualquer coisa');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toMatchObject({});
    });
  });

  describe('GET /planeta/by-nome/:nome', async () => {
    it('should return 200 and planet data', async () => {
      service.getPlanetaByNome.mockResolvedValueOnce(alderaan);

      const response = await request(app).get('/planetas/by-nome/Alderaan');

      expect(service.getPlanetaByNome).toBeCalledWith('Alderaan');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toMatchObject(alderaan);
    });
  });
});
