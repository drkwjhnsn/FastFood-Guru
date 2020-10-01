require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('../db/index.js');
var authenticate = require('./authenticate.js');
var authorize = require('./authorize.js');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/public'));

app.get('/user', authorize, (req, res) => {
  db.getUserFromId(req.decoded.userId)
  .then((results) => {
    results.hash = undefined;
    results.salt = undefined;
    res.status(200).send(JSON.stringify(results));
  })
});

app.post('/user/validate', (req, res) => {
  db.checkIfNameExists(req.body.username)
  .then((results) => res.status(200).send(results))
  .catch((err) => res.status(500).send(err));
})

app.use('/authenticate', authenticate);

app.listen(3000, () => console.log('listening on port 3000'));
