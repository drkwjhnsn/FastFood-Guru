var comment = require('express').Router();
var db = require('../db/index.js');

comment.post('/', (req, res) => {
  db.submitComment(req.body)
  .then(() => res.status(200).send())
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
});

comment.get('/restaurant', (req, res) => {
  db.getRestaurantComments(req.query.restaurant_id)
  .then((comments) => {
    comments = comments.map((comment) => {
      return {
        title: comment.title,
        text: comment.body,
        author: comment.author_id,
      }
    })
    res.status(200).send(comments)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
})

module.exports = comment;
