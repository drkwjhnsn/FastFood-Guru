import React, { Component } from 'react';
import Stars from 'react-stars';

export default class StarRating extends Component {

  render() {
    return (
      <table className="star-rating" >
        <tbody>
          <tr>
            <td>Staff:</td>
            <td><Stars /></td>
          </tr>
          <tr>
            <td>Cleanliness:</td>
            <td><Stars /></td>
          </tr>
          <tr>
            <td>Speed:</td>
            <td><Stars /></td>
          </tr>
          <tr>
            <td>Bathrooms:</td>
            <td><Stars /></td>
          </tr>
          <tr>
            <td>Sass Level:</td>
            <td><Stars /></td>
          </tr>
        </tbody>
      </table>
    );
  }
}
