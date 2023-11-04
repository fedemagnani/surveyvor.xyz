const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Read .env file
require('dotenv').config();

const app = express();
const port = 3000;
// Expose ./public folder content as static files in /cdn
app.use('/cdn', express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(cors());

// Survey API
const surveysRouter = require('./modules/surveys/surveys');
app.use('/api/surveys', surveysRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});