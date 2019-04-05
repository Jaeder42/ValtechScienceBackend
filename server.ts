import express = require('express');
import { isVerified } from './handlers';
import { readFileSync } from 'fs';

// Create a new express application instance
const app: express.Application = express();

const getData = (url:string) => {
  let data = readFileSync('./data.json').toString();
  var urls = JSON.parse(data);
  return urls[url];
};

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/verified', isVerified);

// Is short/long the right naming scheme?
app.get('/short/', function(req, res) { 
  const url = req.query.url;
  const data = getData(url);
  if(data == undefined)
    res.sendStatus(404); // Perhaps wrong to return 404 here... 
  res.send({url:url, vote: data.vote});
});

// Is short/long the right naming scheme?
app.get('/long/', function(req, res) {
  const url = req.query.url;
  const data = getData(url);
  if(data == undefined)
    res.sendStatus(404); // Perhaps wrong to return 404 here... 
  res.send({url:url, vote: data.vote, links: data.links });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
