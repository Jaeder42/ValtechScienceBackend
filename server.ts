import express = require('express');

// Create a new express application instance
const app: express.Application = express();

const getShortData = (url:string) =>  ({ url: url, pro: 21, con: 4 });

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/short/', function(req, res) {
  const url = req.query.url;
  const shortData = getShortData(url);
  res.send(shortData);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
