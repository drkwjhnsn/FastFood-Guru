import React, { Component } from 'react';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  render() {
    return (<div id="map"></div>);
  }
}
