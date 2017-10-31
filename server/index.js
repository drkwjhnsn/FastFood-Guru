require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('../db/index.js');
var authenticate = require('./authenticate.js');
var authorize = require('./authorize.js');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/public'));

app.listen(3000, () => console.log('listening on port 3000'));

app.get('/protected', authorize, (req, res) => {
  res.status(200).send("you gots access");
});

app.use('/authenticate', authenticate);
