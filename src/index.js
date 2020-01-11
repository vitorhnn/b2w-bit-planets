require('dotenv').config();
const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.get('/', (_req, res) => res.send('Hello world!'));

app.listen(port, () => console.log(`Hello world listening on ${port}`));
