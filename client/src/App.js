import React, { Component } from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import SignUp from './components/SignUp.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      signInModal: false
    };
    this.showSignIn = this.showSignIn.bind(this);
    this.hideSignIn = this.hideSignIn.bind(this);
  }

  showSignIn() {
    this.setState({ signInModal: true });
  }

  hideSignIn() {
    this.setState({ signInModal: false });
  }

  render() {
    var { userId, signInModal } = this.state;
    return (
      <div className="container-fluid" >
        <Header userId={userId} signIn={this.showSignIn}/>
        <Main userId={userId}/>
        <SignUp show={signInModal} hide={this.hideSignIn}/>
      </div>
    );
  }
}
