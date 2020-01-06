import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Introduction.scss";
import { LinkButton } from "./Buttons/LinkButton";
import { ProgressBars } from "./ProgressBar/ProgressBar";

export const Introduction = () => {
  return (
    <Fragment>
      <Form className="form">
        <Row noGutters={true} className="wrapper">
          <Col className="header">
            <h1 className="header-title">SignUp</h1>
          </Col>
          <ProgressBars progress={0} />
          <Col className="intro-btn">
            <Form.Group>
              <p>Do you want to create account?</p>
              <Link to="/auth">
                <LinkButton btnType="primary" titleBtn="Begin" />
              </Link>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
