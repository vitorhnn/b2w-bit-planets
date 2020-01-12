require('dotenv').config();
require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const { readFileSync } = require('fs');
const { join } = require('path');
const { safeLoad } = require('js-yaml');
const swaggerUi = require('swagger-ui-express');

const openApiSpec = safeLoad(readFileSync(join(__dirname, 'b2w-starwars.yaml')));

const planetasRouter = require('./routes/planetas');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Routes
app.use('/planetas', planetasRouter);

// Catch 404
app.use((_req, res) => {
  res.status(404).send({ error: 'Not found' });
});

app.listen(port, () => console.log(`Planets API listening on ${port}. 👍`));
