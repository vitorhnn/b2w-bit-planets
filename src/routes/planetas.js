const { Router } = require('express');
const ApiError = require('../ApiError');

const service = require('../services/planetas');

const router = new Router();

// Listar planetas
router.get('/', async (_req, res) => {
  try {
    const result = await service.getPlanetas();

    return res.status(200).send(result);
  } catch (err) {
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
});

// Buscar planeta por id
router.get('/:planetaId', async (req, res) => {
  const { planetaId } = req.params;

  try {
    const result = await service.getPlanetaById(planetaId);

    return res.status(200).send(result);
  } catch (err) {
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
});

// Remover planeta por id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await service.deletePlaneta(id);

    return res.status(200).send();
  } catch (err) {
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
});

// Buscar planeta por nome
router.get('/by-nome/:nome', async (req, res) => {
  const { nome } = req.params;

  try {
    const result = await service.getPlanetaByNome(nome);

    return res.status(200).send(result);
  } catch (err) {
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
});

module.exports = router;
