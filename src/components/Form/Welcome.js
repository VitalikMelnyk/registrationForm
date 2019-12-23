import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import './Welcome.scss';

export const Welcome = () => {
  return (
    <Fragment>
      <Form className="form">
        <Row noGutters={true} className="wrapper">
          <Col className="header">
            <h1 className="header-title">Thank you</h1>
            {/* <h1 className="form-title">Signup</h1> */}
          </Col>
          <Col className="progressBar">
            <ProgressBar animated now={100} className="wrapper-progress" />
          </Col>
          <Col className="figure">
            <div className="circle">
                <div className="rectangle">

                </div>
            </div>
          </Col>

          <Col className="welcome-btn">
           
        
              <Link to="/dashboard" className="btn btn-outline-primary">
                Go to dashboard
              </Link>
              <Link to="/" className="btn btn-outline-primary">
                return
              </Link>
        
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
