import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header.js';
import Main from './components/Main.js';
import SignModal from './components/SignModal.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      signInModal: false
    };

    this.showSignIn = this.showSignIn.bind(this);
    this.hideSignIn = this.hideSignIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    var token = window.localStorage.getItem('authorization');
    if (token) {
      this.setToken(token);
      this.getUserInfo(token);
    }
  }

  setToken(token) {
    window.localStorage.setItem('authorization', token);
    axios.defaults.headers.common['authorization'] = token;
  }

  showSignIn() {
    this.setState({ signInModal: true });
  }

  hideSignIn() {
    this.setState({ signInModal: false });
  }

  signIn({ usernameLogin, passwordLogin }) {
    var username = usernameLogin;
    var password = passwordLogin;
    axios.post('/authenticate/signin', { username, password })
    .then(({ data }) => {
      this.setToken(data);
      this.getUserInfo();
      this.hideSignIn();
    });
  }

  signUp({ username, password, zip, avatar }) {
    axios.post('/authenticate/signup', { username, password, zip, avatar })
    .then(({ data }) => {
      this.setToken(data);
      this.getUserInfo();
      this.hideSignIn();
    });
  }

  getUserInfo(token) {
    axios.get('/user')
    .then(({ data }) => {
      this.setState({ user: data });
    })
    .catch((err) => {
      console.log(err);
      window.localStorage.removeItem('authorization');
    })
  }

  signOut() {
    this.setState({ user: null });
    window.localStorage.removeItem('authorization');
  }

  checkName(username) {
    return new Promise((resolve, reject) => {
      axios.post('/user/validate', {username})
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
    });
  }

  render() {
    var { user, signInModal } = this.state;
    return (
      <div>
        <Header user={user} signIn={this.showSignIn} signOut={this.signOut} />
        <Main user={user} signIn={this.showSignIn}/>
        {this.state.signInModal ? <SignModal show={signInModal} hide={this.hideSignIn} signIn={this.signIn} signUp={this.signUp} checkName={this.checkName} /> : ''}
      </div>
    );
  }
}

function unwrap(token) {
  return JSON.parse(window.atob(token.split('.')[1]));
}
