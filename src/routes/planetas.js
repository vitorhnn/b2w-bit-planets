const { Router } = require('express');
const { Error } = require('mongoose');
const ApiError = require('../ApiError');

const service = require('../services/planetas');

const router = new Router();

function commonErrorHandler(res, err) {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).send({
        error: err.message,
      });
    }

    console.error(err);
    return res.status(500).send({
      error: 'Internal server error',
    });
}

// Listar planetas
router.get('/', async (_req, res) => {
  try {
    const result = await service.getPlanetas();

    return res.status(200).send(result);
  } catch (err) {
    return commonErrorHandler(res, err);
  }
});

// Adicionar novo planeta
router.post('/', async (req, res) => {
  const params = {
    nome: req.body.nome,
    clima: req.body.clima,
    terreno: req.body.terreno,
  };

  try {
    const result = await service.insertPlaneta(params);

    return res.status(201).send(result);
  } catch (err) {
    return commonErrorHandler(res, err);
  }
});

// Buscar planeta por id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await service.getPlanetaById(id);

    return res.status(200).send(result);
  } catch (err) {
    if (err instanceof Error.CastError) {
      return res.status(400).send({
        error: 'ID inválido',
      });
    }

    return commonErrorHandler(res, err);
  }
});

// Remover planeta por id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await service.deletePlaneta(id);

    return res.status(200).send();
  } catch (err) {
    if (err instanceof Error.CastError) {
      return res.status(400).send({
        error: 'ID inválido',
      });
    }

    return commonErrorHandler(res, err);
  }
});

// Buscar planeta por nome
router.get('/by-nome/:nome', async (req, res) => {
  const { nome } = req.params;

  try {
    const result = await service.getPlanetaByNome(nome);

    return res.status(200).send(result);
  } catch (err) {
    return commonErrorHandler(res, err);
  }
});

module.exports = router;
