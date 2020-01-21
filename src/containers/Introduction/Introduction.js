import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { LinkButton } from "../../components/Buttons/LinkButton";
import { ProgressBars } from "../../components/ProgressBar/ProgressBar";
import "./Introduction.scss";

export const Introduction = props => {
  return (
    <>
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
    </>
  );
};
