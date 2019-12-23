import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
// import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import './Introduction.scss';

export const Introduction = () => {
    return (
        <Fragment>
      <Form className="form">
        <Row noGutters={true} className="wrapper">
          <Col className="header">
            <h1 className="header-title">SignUp</h1>
            {/* <h1 className="form-title">Signup</h1> */}
          </Col>
          <Col className="progressBar">
            <ProgressBar animated now={0} className="wrapper-progress" />
          </Col>
          
          <Col className="intro-btn">
            <Form.Group>
              {/* <Button variant="primary" type="submit" >
                Begin
              </Button> */}
              <p>Do you want to create account?</p>
              
              <Link to='/auth' className="btn btn-primary">Begin</Link>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Fragment>
    )
}
