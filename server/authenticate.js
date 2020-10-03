var authenticate = require('express').Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var db = require('../db/index.js');
var fs = require('fs');

authenticate.post('/signup', (req, res) => {
  var { username, password, avatar } = req.body;
  var { hash, salt } = generateHash(password);

  writeAvatar(avatar)
  .then((imghash) => {
    return db.createUser(hash, salt, username, imghash);
  })
  .then((results) => {
    res.status(200).send(createToken({userId: results.insertId}));
  })
  .catch((e) => {
    console.log(e);
    res.status(500).send(e)});
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
  .catch((e) => {
    console.log(e);
    res.status(500).send(e)
  });
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

function writeAvatar(b64) {
  return new Promise((resolve, reject) => {
    if (!b64) return resolve('default');
    var b64Avatar = b64.split(',')[1];
    var hash = generateFilename(b64Avatar);
    fs.writeFile(`./client/public/images/avatars/${hash}.png`, b64Avatar, 'base64', (err) => {
      if (err) return reject(err);
      return resolve(hash);
    })
  })
}

var generateFilename = (data) => {
  var hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

module.exports = authenticate;
