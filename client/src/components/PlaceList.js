import React from 'react';
import RestaurantListing from './RestaurantListing.js';

export default (props) => (
  <div className="place-list">
    {props.restaurants.map((restaurant) => (<RestaurantListing key={restaurant.id} {...restaurant} selectRestaurant={props.selectRestaurant}/>))}
  </div>
)
