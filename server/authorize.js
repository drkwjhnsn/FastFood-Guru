var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  var token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.send("Failed to authenticate token");
      req.decoded = decoded;
      next();
    })
  } else {
    res.status(403).send("No token provided");
  }
};
