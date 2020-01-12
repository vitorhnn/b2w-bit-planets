// initialize our mongoose connection and load .env files
require('dotenv').config();
require('./db');

// load the express server
const app = require('./server');

const port = process.env.API_PORT;

// run the thing
app.listen(port, () => console.log(`Planets API listening on ${port}. 👍`));
