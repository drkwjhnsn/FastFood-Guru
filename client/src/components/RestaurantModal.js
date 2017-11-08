import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';

export default class RestaurantModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    }
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  }

  componentWillMount() {
    this.getComments();
  }

  handleSubmitComment(title, text) {
    axios.post('/comment',
      { authorId: this.props.userId, restaurantId: this.props.id, text, title})
    .then((response) => {
      if (response.status === 200) this.getComments();
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
          <Modal.Title>{this.props.name}</Modal.Title>
          {this.props.address}
        </Modal.Header>
        <Modal.Body>
          {this.state.comments.map((comment, idx) => (<Comment {...comment} key={idx} />))}
          {this.props.userId ?
            <CommentForm handleSubmit={this.handleSubmitComment}/> :
            <a href="#" onClick={this.props.signIn}>Sign in to submit a comment</a>
          }
        </Modal.Body>
      </Modal>
    );
  }
}
