import React, { Component } from 'react';
import { Modal, Button, Nav, NavItem, Form, FormGroup, FormControl, ControlLabel, Col, Image } from 'react-bootstrap';
import AvatarCanvas from './AvatarCanvas.js';

export default class SignModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1,
      usernameLogin: '',
      passwordLogin: '',
      username: '',
      password: '',
      confirm: '',
      avatar: null,
      nameValid: null,
      confirmValid: null
    }
    this.handleUsernameLogin = this.handleUsernameLogin.bind(this);
    this.handlePasswordLogin = this.handlePasswordLogin.bind(this);
    this.handleAvatar = this.handleAvatar.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayTab = this.displayTab.bind(this);
  }

  handleUsernameLogin(e) {
    this.setState({ usernameLogin: e.target.value });
  }

  handlePasswordLogin(e) {
    this.setState({ passwordLogin: e.target.value });
  }

  handleAvatar(png) {
    this.setState({ avatar: png });
  }

  handleUsername(e) {
    var username = e.target.value;
    this.props.checkName(username)
    .then((results) => {
      var nameValid = (!results && username.length >= 5) ? 'success' : 'error';
      this.setState({ username, nameValid });
    });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirm(e) {
    var confirm = e.target.value;
    var confirmValid = (confirm === this.state.password) ? 'success' : 'error';
    this.setState({ confirm, confirmValid });
  }

  validateSignup() {
    var { nameValid, confirmValid } = this.state;
    return ( nameValid === 'success' && confirmValid === 'success' );
  }

  handleSubmit(e) {
    e.preventDefault();
    var { username, password, avatar, confirm, activeKey, usernameLogin, passwordLogin } = this.state;
    if (activeKey === 1) this.props.signIn({ usernameLogin, passwordLogin });
    if (activeKey === 2 && this.validateSignup()) this.props.signUp({ username, password, avatar });
  }

  displayTab(key, e) {
    this.setState({ activeKey: key});
  }

  render() {
    var { show, hide } = this.props;
    var { username, password, confirm, avatar, nameValid, confirmValid, activeKey } = this.state;

    if (activeKey === 1) {
      var content = (
        <Form onSubmit={this.handleSubmit} horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={10}>
              <FormControl value={this.usernameLogin} type="text" placeholder="Username" onChange={this.handleUsernameLogin}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl value={this.passwordLogin} type="password" placeholder="password" onChange={this.handlePasswordLogin}/>
            </Col>
          </FormGroup>
        </Form>
      );
    } else if (activeKey === 2) {
      var content = (
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Profile Picture
            </Col>
            <Col sm={6}>
              <AvatarCanvas postImage={this.handleAvatar}/>
            </Col>
          </FormGroup>
          <FormGroup validationState={nameValid}>
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={10}>
              <FormControl value={username} type="text" placeholder="Username" onChange={this.handleUsername}/>
            </Col>
          </FormGroup>
          <FormGroup validationState={confirmValid}>
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl value={password} type="password" placeholder="password" onChange={this.handlePassword}/>
            </Col>
          </FormGroup>
          <FormGroup validationState={confirmValid}>
            <Col componentClass={ControlLabel} sm={2}>
              Re-enter Password
            </Col>
            <Col sm={10}>
              <FormControl value={confirm} type="password" placeholder="password" onChange={this.handleConfirm}/>
            </Col>
          </FormGroup>
        </Form>
      );
    }

    return (
      <Modal show={show} onHide={hide}>
          <Nav bsStyle="tabs" justified activeKey={activeKey}>
            <NavItem eventKey={1} onSelect={this.displayTab}>Sign In</NavItem>
            <NavItem eventKey={2} onSelect={this.displayTab}>Sign Up</NavItem>
          </Nav>
        <Modal.Body>
        {content}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hide}>Close</Button>
          <Button bsStyle="primary" onClick={this.handleSubmit}>Sign { activeKey === 1 ? 'In' : 'Up'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
