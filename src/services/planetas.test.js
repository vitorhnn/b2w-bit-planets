const mockingoose = require('mockingoose').default;
const Planeta = require('../db/planeta');
const service = require('./planetas');
const ApiError = require('../ApiError');

jest.mock('./swapi', () => ({
  getPlanetaFilmCount: jest.fn(),
}));

const swapi = require('./swapi');

describe('Planetas service', () => {
  const alderaan = {
    nome: 'Alderaan',
    terreno: ['Pradaria', 'Montanhas'],
    clima: ['Temperado'],
  };

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should list all planets', async () => {
    const fakeData = [alderaan];

    swapi.getPlanetaFilmCount.mockResolvedValueOnce(2);

    mockingoose(Planeta).toReturn(fakeData, 'find');

    expect(await service.getPlanetas()).toMatchObject([{ ...alderaan, quantidadeFilmes: 2 }]);
  });

  it('should insert a planet', async () => {
    jest.spyOn(Planeta, 'create').mockImplementationOnce(async inputData => {
      expect(inputData).toMatchObject(alderaan);

      return inputData;
    });

    expect(await service.insertPlaneta(alderaan)).toMatchObject(alderaan);
  });

  it('should find planets by id', async () => {
    mockingoose(Planeta).toReturn(alderaan, 'findOne');
    swapi.getPlanetaFilmCount.mockResolvedValueOnce(2);

    const spy = jest.spyOn(Planeta, 'findById');

    expect(await service.getPlanetaById('Alderaan')).toMatchObject({
      ...alderaan,
      quantidadeFilmes: 2,
    });
    expect(spy).toHaveBeenCalledWith('Alderaan', 'nome clima terreno');
  });

  it('should throw errors when trying to find an unregistered planet by id', () => {
    jest.spyOn(Planeta, 'findById').mockResolvedValueOnce(undefined);

    expect(service.getPlanetaById('Marte')).rejects.toEqual(new ApiError(404, 'Not found'));
  });

  it('should delete a planet', async () => {
    const spy = jest.spyOn(Planeta, 'findByIdAndDelete').mockImplementationOnce(() => alderaan); // intentional noop

    await service.deletePlaneta('Alderaan'); // https://www.youtube.com/watch?v=EKu7TYWNxqA
    expect(spy).toHaveBeenCalledWith('Alderaan');
  });

  it('should throw errors when trying to delete an unregistered planet', () => {
    jest.spyOn(Planeta, 'findByIdAndDelete').mockResolvedValueOnce(undefined);

    expect(service.deletePlaneta('Marte')).rejects.toEqual(new ApiError(404, 'Not found'));
  });

  it('should find a planet by name', async () => {
    mockingoose(Planeta).toReturn(alderaan, 'findOne');
    swapi.getPlanetaFilmCount.mockResolvedValueOnce(2);

    const spy = jest.spyOn(Planeta, 'findOne');

    expect(await service.getPlanetaByNome('Alderaan')).toMatchObject({
      ...alderaan,
      quantidadeFilmes: 2,
    });
    expect(spy).toHaveBeenCalledWith({ nome: 'Alderaan' }, 'nome clima terreno');
  });

  it('should throw errors when trying to find an unregistered planet by name', () => {
    jest.spyOn(Planeta, 'findOne').mockResolvedValueOnce(undefined);

    expect(service.getPlanetaByNome('Marte')).rejects.toEqual(new ApiError(404, 'Not found'));
  });
});
