var mysql = require('mysql');
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

function createUser(hash, salt, username, imghash) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO users (hash, salt, username, imghash) VALUES ('${hash}', '${salt}', '${username}', '${imghash}')`,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}



// var base64Data = req.body[req.query.part].path.split(',')[1];
// var fileName = generateFilename(base64Data);

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

function submitComment({ restaurantId, authorId, title, text }) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO comments (restaurant_id, author_id, title, body) VALUES ('${restaurantId}', '${authorId}', '${title}', '${text}')`,
      (err, results) => {
        if (err) return reject(err);
        resolve();
      }
    )
  })
}

function getRestaurantComments(restaurant_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM comments WHERE restaurant_id = '${restaurant_id}'`,
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    )
  })
}

module.exports = { getUserFromId, createUser, verifyUser, checkIfNameExists, submitComment, getRestaurantComments };
