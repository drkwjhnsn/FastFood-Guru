import React, { Component } from 'react';

export default class CommentForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.textChange = this.textChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  textChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.text);
    this.setState({text: ''})
  }

  keyPress(e) {
    if (e.which === 13) this.handleSubmit(e);
  }

  render() {
    return (
      <form className="comment-form"  onSubmit={this.handleSubmit}>
        <div>What did you think of the restaurant?</div>
        <textarea className="comment-text" rows={5} placeholder="Describe your experience..." value={this.state.text} onChange={this.textChange} onKeyPress={this.keyPress}/>
        <button className="comment-submit-butt" type="submit">submit comment</button>
      </form>
    )
  }

}
