const Planeta = require('../db/planeta');
const service = require('./planetas');

describe('Planetas service', () => {
  it('should list all planets', async () => {
    const fakeData = [
      {
        nome: 'Alderaan',
        terreno: ['Pradaria', 'Montanhas'],
        clima: ['Árido'],
      },
    ];

    jest.spyOn(Planeta, 'find').mockImplementationOnce(async () => {
      return fakeData;
    });

    expect(await service.getPlanetas()).toEqual(fakeData);
  });
});
