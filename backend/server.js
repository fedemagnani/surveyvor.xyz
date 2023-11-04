const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Read .env file
require('dotenv').config();

const surveysRouter = require('./modules/surveys/surveys');
app.use('/api/surveys', surveysRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});