import React, { Component } from 'react';

export default class CommentForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: ''
    }
    this.titleChange = this.titleChange.bind(this);
    this.textChange = this.textChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  titleChange(e) {
    this.setState({title: e.target.value});
  }

  textChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.title, this.state.text);
    this.setState({title: '', text: ''})
  }

  render() {
    return (
      <form className="comment-form"  onSubmit={this.handleSubmit}>
        <div>What did you think of the restaurant?</div>
        <input className="comment-title" type="text" placeholder="Title" value={this.props.title} onChange={this.titleChange}/>
        <textarea className="comment-text" rows={5} placeholder="Describe your experience..." value={this.props.text} onChange={this.textChange}/>
        <button className="comment-submit-butt" type="submit">submit comment</button>
      </form>
    )
  }

}
