import express = require('express');
import { isVerified } from './handlers';
// Create a new express application instance
const app: express.Application = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/verified', isVerified);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
