import express = require('express');
import { readFileSync } from 'fs';
import bodyParser from 'body-parser';
import { isVerified, getShortData, getLongData, postFact } from './handlers';

// Create a new express application instance
const app: express.Application = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/verified', isVerified);

// Is short/long the right naming scheme?
app.get('/short/', getShortData);
app.get('/long/', getLongData);

app.post('/fact', postFact);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
