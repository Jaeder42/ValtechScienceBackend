import express = require('express');
import { isVerified, postFact } from './handlers';
import { readFileSync } from 'fs';
import bodyParser from 'body-parser';

// Create a new express application instance
const app: express.Application = express();

const getShortData = (url: string) => {
  let data = readFileSync('./data.json').toString();
  var urls = JSON.parse(data);
  return urls[url];
};

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/verified', isVerified);

app.get('/short/', function(req, res) {
  const url = req.query.url;
  const shortData = getShortData(url);
  if (shortData == undefined) res.sendStatus(404); // Perhaps wrong to return 404 here...
  res.send({ url: url, vote: shortData });
});

app.post('/fact', postFact);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
