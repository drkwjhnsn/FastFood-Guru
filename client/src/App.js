import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header.js';
import Main from './components/Main.js';
import SignModal from './components/SignModal.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
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
      axios.defaults.headers.common['authorization'] = token;
      this.getUserInfo(token);
    }
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
      var { userId } = unwrap(data);
      this.setState({ userId });
      window.localStorage.setItem('authorization', data);
      this.hideSignIn();
    });
  }

  signUp({ username, password, zip, avatar }) {
    axios.post('/authenticate/signup', { username, password, zip, avatar })
    .then(({ data }) => {
      var { userId } = unwrap(data);
      this.setState({ userId });
      window.localStorage.setItem('authorization', data);
      this.hideSignIn();
    });
  }

  getUserInfo(token) {
    axios.get('/user')
    .then(({ data }) => {
      this.setState({ userId: data.user_id });
    })
    .catch((err) => {
      console.log(err);
      window.localStorage.removeItem('authorization');
    })
  }

  signOut() {
    this.setState({ userId: null });
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
    var { userId, signInModal } = this.state;
    return (
      <div>
        <Header userId={userId} signIn={this.showSignIn} signOut={this.signOut} />
        <Main userId={userId} signIn={this.showSignIn}/>
        {this.state.signInModal ? <SignModal show={signInModal} hide={this.hideSignIn} signIn={this.signIn} signUp={this.signUp} checkName={this.checkName} /> : ''}
      </div>
    );
  }
}

function unwrap(token) {
  return JSON.parse(window.atob(token.split('.')[1]));
}
