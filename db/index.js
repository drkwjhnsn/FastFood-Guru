var mysql = require('mysql');
var fs = require('fs');
var crypto = require('crypto');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fastfoodguru'
})

connection.connect((err) => {
  if (err) return console.log('err: ' + err);
  console.log('Successfully connected to database');
});

function checkIfNameExists(username) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT username FROM users WHERE username = '${username}' LIMIT 1`,
      (err, [results]) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

function getUserFromId(user_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM users WHERE user_id = ${user_id} LIMIT 1`,
      (err, [results]) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

function createUser(hash, salt, username, zip, avatar) {
  return new Promise((resolve, reject) => {
    writeAvatar(avatar)
    .then((imghash) => {

      connection.query(
        `INSERT INTO users (hash, salt, username, zip, imghash) VALUES ('${hash}', '${salt}', '${username}', '${zip}', '${imghash}')`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );


    })

  });
}



// var base64Data = req.body[req.query.part].path.split(',')[1];
// var fileName = generateFilename(base64Data);


function writeAvatar(b64) {
  return new Promise((resolve, reject) => {
    var b64Avatar = b64.split(',')[1];
    var hash = generateHash(b64Avatar);
    fs.writeFile(`./db/avatars/${hash}.png`, b64Avatar, 'base64', (err) => {
      if (err) return reject(err);
      return resolve(hash);
    })
  })
}

var generateHash = (data) => {
  var hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

// fs.writeFile(`./server/images/${fileName}.png`, base64Data, 'base64', (err) => {
//   if (err) console.log(err);
  // req.body[req.query.part].path = `./images/${fileName}.png`;
  // let thePath = `images?path=${fileName}.png`;
  // db.saveImageToFinalImage(req.body, req.query.part, thePath, (data) => {
  //   res.end();
  // });
// });

function verifyUser(username) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT hash, salt, user_id FROM users WHERE username = '${username}' LIMIT 1`,
      (err, [results]) => {
        if (err) return reject(err);
        if (!results) return reject('Username not found');
        return resolve(results);
      }
    )
  })
}

module.exports = { getUserFromId, createUser, verifyUser, checkIfNameExists, writeAvatar };
