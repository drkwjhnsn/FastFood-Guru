import React, { Component } from 'react';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      if (!window.navigator.geolocation) return resolve();
      window.navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        resolve({location: { lat, lng }});
      })

        // this is hacky, but the best way to fail gracefully on the event a user denies geolocation access
      navigator.permissions.query({name:'geolocation'})
      .then((permission) => {
        if (permission.state === 'denied') return reject();
        if (permission.state === 'prompt') {

          permission.onchange = () => {
            console.log('permission change')
            if (permission.state === 'denied') reject(permission);
          };
        }
      });
    })
    .catch((permission) => {
      if (permission) permission.onchange = undefined;
      return fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD3aVRXSyFga516kCx1dhBpwOWr5WYNQ9Y`, { method: 'POST'})
      .then((results) => results.json())
    })
    .then((geo) => {
      var { lat, lng } = geo.location;
      var zoom = (geo.accuracy) ? parseInt(Math.log2(591657550.5 / (geo.accuracy * 45))) + 1 : 14;
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom
      });
    })
  }

  render() {
    return (<div id="map"></div>);
  }
}
