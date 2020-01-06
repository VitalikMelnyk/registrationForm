import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { LinkButton } from "../../components/Buttons/LinkButton";
import { ProgressBars } from "../../components/ProgressBar/ProgressBar";
import "./Welcome.scss";

export const Welcome = props => {
  return (
    <Fragment>
      <Form className="form">
        <Row noGutters={true} className="wrapper">
          <Col className="header">
            <h1 className="header-title">Thank you</h1>
          </Col>
          <ProgressBars progress={100} />
          <Col className="figure">
            <div className="circle">
              <div className="rectangle"></div>
            </div>
          </Col>

          <Col className="welcome-btn">
            <Link to="/dashboard">
              <LinkButton
                btnType="outline-primary"
                titleBtn="Go to dashboard"
              />
            </Link>
            <Link to="/">
              <LinkButton btnType="outline-primary" titleBtn="Return" />
            </Link>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
