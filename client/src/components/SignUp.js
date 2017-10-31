import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

export default class SignUp extends Component {

  render() {
    var { show, hide} = this.props;
    return (
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <h1>Sign Up</h1>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Username"/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Zip Code
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Zip"/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="password"/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Re-enter Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="password"/>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button>Sign Up</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

<FormGroup controlId="formHorizontalEmail">
  <Col componentClass={ControlLabel} sm={2}>
    Email
  </Col>
  <Col sm={10}>
    <FormControl type="email" placeholder="Email" />
  </Col>
</FormGroup>
