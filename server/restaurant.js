var restaurant = require('express').Router();
var db = require('../db/index.js');
var axios = require('axios');

restaurant.get('/', (req, res) => {
  var restaurant_id = req.query.restaurantId;
  db.getRestaurantDetails(restaurant_id)
  .catch((err) => {
    if (err) throw err;
    return axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${restaurant_id}&key=${process.env.GOOGLEAPIKEY}`)
    .then(({data}) => {
      var result = data.result;
      var comments = result.reviews.map((comment) => (
        db.submitComment({ restaurantId: restaurant_id, text: comment.text, author: comment.author_name, authorAvatar: comment.profile_photo_url })
      ));
      var hours;
      if (result.opening_hours) hours = JSON.stringify(result.opening_hours.weekday_text);
      var phone = result.formatted_phone_number;
      return db.newRestaurant(restaurant_id, hours, phone)
      .then(() => Promise.all(comments))
      .then(() => [{
        restaurant_id,
        name: null,
        address: null,
        phone,
        hours,
      }])
    })
  })
  .then(([results]) => {
    res.status(200).send(results);
  })
});

module.exports = restaurant;
