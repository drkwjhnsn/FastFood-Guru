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
        text: comment.body,
        author: comment.author,
        authorId: comment.author_id,
        authorAvatar: comment.author_avatar,
        restaurantId: comment.restaurant_id
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
