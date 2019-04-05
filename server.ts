import express = require('express');
import { readFileSync, writeFileSync } from 'fs';
import bodyParser from 'body-parser';
import {
  isVerified,
  getShortData,
  getLongData,
  postFact,
  postOp
} from './handlers';
import cors from 'cors';
const PORT = process.env.PORT || 3000;
const app: express.Application = express();
writeFileSync('./utils/session-data.json', readFileSync('./utils/data.json'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/verified', isVerified);

// Is short/long the right naming scheme?
app.get('/short/', getShortData);
app.get('/long/', getLongData);

app.post('/fact', postFact);
app.post('/opinion', postOp);

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
