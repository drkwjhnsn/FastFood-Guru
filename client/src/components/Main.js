import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import debounce from './../utils/debounce.js';
import styles from './mapstyle.js';
import PlaceList from './PlaceList.js';
import RestaurantModal from './RestaurantModal.js';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      currentRestaurant: null,
    };
    this.markers = [];
    this.chains = [
      `SUBWAY®Restaurants`,
      `McDonald's`,
      `KFC`,
      `Burger King`,
      `Domino's Pizza`,
      `Pizza Hut`,
      `Taco Bell`,
      `Wendy's`,
      `Hardee's`,
      `Dairy Queen`,
      `Little Caesars`,
      `￼Sonic Drive-In`,
      `Arby's`,
      `Jack in the Box`,
      `Chick-fil-A`,
      `Popeyes Louisiana Kitchen`,
      `Panda Express`,
      `Church's Chicken`,
      `Carl's Jr.`,
    ];
    this.updateMap = debounce(this.updateMap.bind(this), 500, false);
    this.selectRestaurant = this.selectRestaurant.bind(this);
    this.hideRestaurant = this.hideRestaurant.bind(this);
  }

  componentWillMount() {
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD3aVRXSyFga516kCx1dhBpwOWr5WYNQ9Y`)
    .then(({ data }) => {
      var { lat, lng } = data.location;
      var zoom = (data.accuracy) ? parseInt(Math.log2(591657550.5 / (data.accuracy * 45))) + 1 : 14;
      this.map = new google.maps.Map(document.getElementById('map'),
        {center: { lat, lng }, zoom, styles });
      this.geolocate();
      google.maps.event.addListener(this.map, 'bounds_changed', this.updateMap);
      this.service = new google.maps.places.PlacesService(this.map);
    })
  }

  updateMap() {
    if (this.map.zoom < 12) return this.clearMap();

    var keyword =`SUBWAY OR McDonald's OR KFC OR "Burger King" OR "Domino's Pizza" OR "Pizza Hut"	OR "Taco Bell" OR Wendy's OR Hardee's OR "Dairy Queen" OR "Little Caesars" OR "Sonic Drive-In" OR Arby's OR "Jack in the Box" OR Chick-fil-A OR "Popeyes Louisiana Kitchen" OR "Panda Express" OR "Chester's International" OR "Church's Chicken" OR "Carl's Jr."`
    var options = {
      bounds: this.map.getBounds(),
      type: 'restaurant',
      keyword,
    }
    this.service.nearbySearch(options, (results) => {
      var places = {};
      results = results.filter((restaurant) => this.chains.indexOf(restaurant.name) !== -1);
      var restaurants = results.map((restaurant) => {
        return {
          name: restaurant.name,
          id: restaurant.place_id,
          address: restaurant.vicinity,
        };
      });
      this.setState({ restaurants });
      results.forEach((place) => places[place.id] = place);
      for (var id in this.markers) {
        if (!places[id]) {
          this.removeRestaurant(id)
        }
      }
      for (var id in places) {
        if (!this.markers[id]) {
          this.addRestaurant(places[id]);
        }
      }
    });
  }

  removeRestaurant(id) {
    this.markers[id].setMap(null);
    delete this.markers[id];
  }

  addRestaurant(restaurant) {
    var icon = 'logos/' + restaurant.name.slice(0,3).toLowerCase() + '.png';
    this.markers[restaurant.id] = new google.maps.Marker({
      position: restaurant.geometry.location,
      map: this.map,
      animation: google.maps.Animation.DROP,
      // label: restaurant.name,
      place: {location : restaurant.geometry.location, placeId: restaurant.id},
      icon,
    });
  }

  clearMap() {
    for (var id in this.markers) {
      this.removeRestaurant(id);
    }
  }

  geolocate() {
    window.navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      this.map.panTo({ lat, lng });
      this.map.setZoom(15);
    })
  }

  selectRestaurant(restaurant) {
    this.setState({currentRestaurant: restaurant});
  }

  hideRestaurant() {
    this.setState({currentRestaurant: null});
  }

  render() {
    return (
      <div id="main">
        <div id="map"></div>
        <PlaceList restaurants={this.state.restaurants} selectRestaurant={this.selectRestaurant} />
        {(!!this.state.currentRestaurant) ? <RestaurantModal show={!!this.state.currentRestaurant} hideRestaurant={this.hideRestaurant} signIn={this.props.signIn} user={this.props.user} { ...this.state.currentRestaurant } /> : ''}
      </div>
    );
  }
}
