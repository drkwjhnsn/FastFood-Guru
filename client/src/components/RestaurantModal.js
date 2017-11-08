import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';
import StarRating from './StarRating.js';
import Hours from './Hours.js';

export default class RestaurantModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      details: {}
    }
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  }

  componentWillMount() {
    this.getDetails();
  }

  handleSubmitComment(text) {
    axios.post('/comment',
      { authorId: this.props.user.user_id, author: this.props.user.username, authorAvatar: this.props.user.imghash, restaurantId: this.props.id, text})
    .then((response) => {
      if (response.status === 200) this.getComments();
    })
  }

  getDetails() {
    axios.get(`/restaurant?restaurantId=${this.props.id}`)
    .then(({data}) => {
      this.setState({details: data})
      this.getComments();
    })
  }

  getComments() {
    axios.get(`/comment/restaurant?restaurant_id=${this.props.id}`)
    .then(({data}) => {
      this.setState({comments: data});
    })
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.hideRestaurant} >
        <Modal.Header closeButton>
          <div className="restaurant-header">
            <Modal.Title>{this.props.name}</Modal.Title>
            <div>{this.state.details.phone}</div>
            <div>{this.props.address}</div>
          </div>
          <div className="restaurant-items">
            <div className="restaurant-title">
              {this.state.details.hours ? <Hours hours={this.state.details.hours}/> : ''}
            </div>
            <StarRating className="star-rating"/>
          </div>
        </Modal.Header>
        <Modal.Body>
          {this.state.comments.map((comment, idx) => (<Comment {...comment} key={idx} />))}
          {this.props.user ?
            <CommentForm handleSubmit={this.handleSubmitComment}/> :
            <a href="#" onClick={this.props.signIn}>Sign in to submit a comment</a>
          }
        </Modal.Body>
      </Modal>
    );
  }
}
