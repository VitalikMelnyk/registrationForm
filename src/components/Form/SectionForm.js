import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./SectionForm.scss";

export const SectionForm = () => {
  return (
    <Fragment>
      <Form className="form">
        <Row noGutters={true} className="wrapper">
          <Col className="header">
            <h1 className="header-title">SignUp</h1>
            {/* <h1 className="form-title">Signup</h1> */}
          </Col>
          <Col className="progressBar">
            <ProgressBar animated now={50} className="wrapper-progress" />
          </Col>
          <Col className="inputFiels">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email"  className="form-inputs" />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"  className="form-inputs" />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password"  className="form-inputs"/>
            </Form.Group>
          </Col>
          
          <Col className="formButton">
            <Form.Group>
              <Button variant="primary" type="submit" disabled>
                Submit
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
