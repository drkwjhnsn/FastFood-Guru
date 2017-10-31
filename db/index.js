var mysql = require('mysql');

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

function getUserFromId(user_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM users WHERE user_id = ${user_id}`,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

function createUser(username, hash, salt) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO users (username, hash, salt) VALUES ('${username}', '${hash}', '${salt}')`,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

function verifyUser(username) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT hash, salt, user_id FROM users WHERE username = '${username}'`,
      (err, [results]) => {
        if (err) return reject(err);
        if (!results) return reject('Username not found');
        return resolve(results);
      }
    )
  })
}

module.exports = { getUserFromId, createUser, verifyUser };
