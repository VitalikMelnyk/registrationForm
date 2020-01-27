import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { LinkButton } from "../../components/Buttons/LinkButton";
import "./Welcome.scss";

export const Welcome = props => {
  return (
    <>
      <Col className="figure">
        <div className="circle">
          <div className="rectangle"></div>
        </div>
      </Col>

      <Col className="welcome-btn">
        <Link to="/dashboard">
          <LinkButton btnType="outline-primary" titleBtn="Go to dashboard" />
        </Link>
      </Col>
    </>
  );
};
