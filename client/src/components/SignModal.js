import React, { Component } from 'react';
import { Modal, Button, Nav, NavItem, Form, FormGroup, FormControl, ControlLabel, Col, Image } from 'react-bootstrap';

export default class SignModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 1,
      usernameLogin: '',
      passwordLogin: '',
      username: '',
      zip: '',
      password: '',
      confirm: '',
      avatar: '',
      nameValid: null,
      zipValid: null,
      confirmValid: null
    }
    this.handleUsernameLogin = this.handleUsernameLogin.bind(this);
    this.handlePasswordLogin = this.handlePasswordLogin.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleAvatar = this.handleAvatar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayTab = this.displayTab.bind(this);
  }

  handleUsernameLogin(e) {
    this.setState({ usernameLogin: e.target.value });
  }

  handlePasswordLogin(e) {
    this.setState({ passwordLogin: e.target.value });
  }

  handleUsername(e) {
    var username = e.target.value;
    this.props.checkName(username)
    .then((results) => {
      var nameValid = (!results && username.length >= 5) ? 'success' : 'error';
      this.setState({ username, nameValid });
    });
  }

  handleZip(e) {
    var zip = e.target.value;
    var zipValid = (zip.length === 5 && Number.isInteger(parseInt(zip, 10))) ? 'success' : 'error';
    this.setState({ zip, zipValid });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirm(e) {
    var confirm = e.target.value;
    var confirmValid = (confirm === this.state.password) ? 'success' : 'error';
    this.setState({ confirm, confirmValid });
  }

  handleAvatar(e) {
    var objectUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ avatar: objectUrl });
  }

  validateSignup() {
    var { nameValid, zipValid, confirmValid } = this.state;
    return ( nameValid === 'success' && zipValid === 'success' && confirmValid === 'success' );
  }

  handleSubmit(e) {
    e.preventDefault();
    var { username, zip, password, confirm, activeKey } = this.state;
    if (activeKey === 1) this.props.signIn({ username, password });
    if (activeKey === 2 && this.validateSignup()) this.props.signUp({ username, zip, password });
  }

  displayTab(key, e) {
    this.setState({ activeKey: key, username: '', password: '' });
  }

  render() {
    var { show, hide } = this.props;
    var { username, zip, password, confirm, avatar, nameValid, zipValid, confirmValid, activeKey } = this.state;

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
              <Image className="center-cropped" alt="avatar" src={this.state.avatar || 'defaultAvatar.png'} rounded></Image>
              <FormControl  id="avatar-input" type="file" onChange={this.handleAvatar}/>
              <label htmlFor="avatar-input">Choose Profile Picture</label>
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
          <FormGroup validationState={zipValid} >
            <Col componentClass={ControlLabel} sm={2}>
              Zip Code
            </Col>
            <Col sm={10}>
              <FormControl value={zip} type="text" placeholder="Zip" onChange={this.handleZip}/>
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
