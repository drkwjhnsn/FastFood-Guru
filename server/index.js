require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('../db/index.js');
var authenticate = require('./authenticate.js');
var authorize = require('./authorize.js');
var comment = require('./comment.js');
var restaurant = require('./restaurant.js');

app.use(bodyParser.json({limit: '5mb'}));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/public'));

app.get('/user', authorize, (req, res) => {
  db.getUserFromId(req.decoded.userId)
  .then((results) => {
    results.hash = undefined;
    results.salt = undefined;
    res.status(200).send(results);
  })
});

app.post('/user/validate', (req, res) => {
  db.checkIfNameExists(req.body.username)
  .then((results) => res.status(200).send(results))
  .catch((err) => res.status(500).send(err));
})

app.use('/authenticate', authenticate);

app.use('/comment', comment);

app.use('/restaurant', restaurant);

app.listen(3000, () => console.log('listening on port 3000'));
