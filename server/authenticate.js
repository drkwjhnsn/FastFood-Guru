var authenticate = require('express').Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var db = require('../db/index.js');

authenticate.post('/signup', (req, res) => {
  var { username, password } = req.body;
  var { hash, salt } = generateHash(password);
  db.createUser(username, hash, salt)
  .then((results) => {
    res.status(200).send(createToken({userId: results.insertId}));
  })
  .catch((e) => res.status(500).send(e));
});

authenticate.post('/signin', (req, res) => {
  var { username, password } = req.body;
  db.verifyUser(username)
  .then((results) => {
    var { hash } = generateHash(password, results.salt);
    if (hash === results.hash) {
      res.status(200).send(createToken({userId: results.user_id}));
    } else {
      res.status(403).send("Incorrect password");
    }
  })
  .catch((e) => res.status(500).send(e));
});

function generateSalt(length) {
  return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length);
}

function generateHash(password, salt = generateSalt(16)) {
  var hmac = crypto.createHmac('sha512', salt);
  hmac.update(password);
  var hash = hmac.digest('hex');
  return { hash, salt };
}

function createToken(payload) {
  return jwt.sign(payload, process.env.SECRET, {expiresIn: '1 day'});
}

module.exports = authenticate;
